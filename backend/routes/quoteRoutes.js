import express from 'express';
import QuoteService from '../services/quoteService.js';
import EmailService from '../services/emailService.js';
import { validateQuoteRequest, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// POST /api/quotes - Submit a new quote request
router.post('/', validateQuoteRequest, handleValidationErrors, async (req, res) => {
  try {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
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

export default router;
