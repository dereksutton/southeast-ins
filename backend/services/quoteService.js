import QuoteRequest from '../models/QuoteRequest.js';

class QuoteService {
  static async create(quoteData) {
    try {
      const quote = new QuoteRequest({
        full_name: quoteData.fullName,
        email: quoteData.email,
        phone: quoteData.phone,
        address: quoteData.address,
        insurance_type: quoteData.insuranceType,
        coverage_details: quoteData.coverageDetails || null,
        contact_preference: quoteData.contactPreference || false,
        ip_address: quoteData.ipAddress || null,
        user_agent: quoteData.userAgent || null,
        source: quoteData.source || 'website'
      });

      const savedQuote = await quote.save();
      return savedQuote.toJSON();
    } catch (error) {
      console.error('Error creating quote request:', error);
      if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(err => err.message).join(', ');
        throw new Error(message);
      }
      throw error;
    }
  }

  static async findById(id) {
    try {
      const quote = await QuoteRequest.findById(id);
      if (!quote) return null;
      return quote.toJSON();
    } catch (error) {
      console.error('Error finding quote by ID:', error);
      if (error.name === 'CastError') return null;
      throw error;
    }
  }

  static async findRecent(days = 7) {
    try {
      const date = new Date();
      date.setDate(date.getDate() - days);
      const quotes = await QuoteRequest.find({ created_at: { $gte: date } })
        .sort({ created_at: -1 });
      return quotes.map(quote => quote.toJSON());
    } catch (error) {
      console.error('Error finding recent quotes:', error);
      throw error;
    }
  }

  static async updateStatus(id, status) {
    try {
      const quote = await QuoteRequest.findByIdAndUpdate(
        id,
        { status, updated_at: new Date() },
        { new: true, runValidators: true }
      );
      if (!quote) return null;
      return quote.toJSON();
    } catch (error) {
      console.error('Error updating quote status:', error);
      if (error.name === 'CastError') return null;
      if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(err => err.message).join(', ');
        throw new Error(message);
      }
      throw error;
    }
  }

  static async updateEmailStatus(id, emailSent, emailError = null) {
    try {
      const updateData = {
        email_sent: emailSent,
        email_sent_at: emailSent ? new Date() : null,
        updated_at: new Date()
      };
      if (emailError) updateData.email_error = emailError;

      const quote = await QuoteRequest.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!quote) return null;
      return quote.toJSON();
    } catch (error) {
      console.error('Error updating email status:', error);
      if (error.name === 'CastError') return null;
      throw error;
    }
  }

  static async markAsContacted(id) {
    return this.updateStatus(id, 'contacted');
  }
}

export default QuoteService;
