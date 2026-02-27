import express from 'express';
import QuoteService from '../services/quoteService.js';
import EmailService from '../services/emailService.js';
import { validateQuoteRequest, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// POST /api/quotes - Submit a new quote request
router.post('/', validateQuoteRequest, handleValidationErrors, async (req, res) => {
  try {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const quoteData = { ...req.body, ipAddress, userAgent };
    const savedQuote = await QuoteService.create(quoteData);

    // Send emails (don't block response on failure)
    const notificationResult = await EmailService.sendQuoteNotification(savedQuote);
    const confirmationResult = await EmailService.sendCustomerConfirmation(savedQuote);

    // Update email status in DB
    if (notificationResult.success) {
      await QuoteService.updateEmailStatus(savedQuote.id, true);
    } else {
      await QuoteService.updateEmailStatus(savedQuote.id, false, notificationResult.error);
    }

    res.status(201).json({
      success: true,
      message: 'Your quote request has been submitted successfully!',
      data: {
        id: savedQuote.id,
        fullName: savedQuote.fullName,
        email: savedQuote.email,
        insuranceType: savedQuote.insuranceType
      },
      emailStatus: {
        notification: notificationResult.success,
        confirmation: confirmationResult.success
      }
    });
  } catch (error) {
    console.error('Error processing quote request:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/quotes/recent
router.get('/recent', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const quotes = await QuoteService.findRecent(days);
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    console.error('Error fetching recent quotes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quote requests',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/quotes/:id
router.get('/:id', async (req, res) => {
  try {
    const quote = await QuoteService.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }
    res.json({ success: true, data: quote });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching quote request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PATCH /api/quotes/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'contacted', 'quoted', 'won', 'lost', 'archived'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const quote = await QuoteService.updateStatus(req.params.id, status);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }

    res.json({ success: true, message: 'Status updated successfully', data: quote });
  } catch (error) {
    console.error('Error updating quote status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating quote status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
