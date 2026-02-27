import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  static async sendQuoteNotification(quoteData) {
    try {
      const contactPreferenceBadge = quoteData.contactPreference
        ? `<div style="background: #ff6b35; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; font-size: 13px; margin-bottom: 15px;">PREFERS PHONE CALL</div>`
        : '';

      const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Quote Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #00A99B 0%, #008f82 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">New Quote Request</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none;">
            ${contactPreferenceBadge}
            <h2 style="color: #00A99B; border-bottom: 2px solid #00A99B; padding-bottom: 10px;">Contact Information</h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td style="padding: 8px 0;">${quoteData.fullName}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${quoteData.email}" style="color: #00A99B;">${quoteData.email}</a></td></tr>
              <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td style="padding: 8px 0;"><a href="tel:${quoteData.phone}" style="color: #00A99B;">${quoteData.formattedPhone || quoteData.phone}</a></td></tr>
              <tr><td style="padding: 8px 0;"><strong>Address:</strong></td><td style="padding: 8px 0;">${quoteData.address}</td></tr>
            </table>

            <h2 style="color: #00A99B; border-bottom: 2px solid #00A99B; padding-bottom: 10px;">Insurance Details</h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0;"><strong>Insurance Type:</strong></td><td style="padding: 8px 0;">${quoteData.insuranceTypeLabel || quoteData.insuranceType}</td></tr>
            </table>

            ${quoteData.coverageDetails ? `
            <h3 style="color: #00A99B;">Coverage Details:</h3>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #00A99B; margin-bottom: 20px;">
              ${quoteData.coverageDetails.replace(/\n/g, '<br>')}
            </div>
            ` : ''}

            <div style="margin-top: 30px; padding: 20px; background: #e6f7f5; border-radius: 5px; text-align: center;">
              <p style="margin: 0 0 15px 0;"><strong>Submitted:</strong> ${new Date(quoteData.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })}</p>
              <a href="tel:${quoteData.phone}" style="display: inline-block; padding: 12px 30px; background: #00A99B; color: white; text-decoration: none; border-radius: 5px; margin: 5px;">Call Customer</a>
              <a href="mailto:${quoteData.email}" style="display: inline-block; padding: 12px 30px; background: #008f82; color: white; text-decoration: none; border-radius: 5px; margin: 5px;">Email Customer</a>
            </div>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>This is an automated notification from your website's quote request form.</p>
          </div>
        </body>
        </html>
      `;

      const emailText = `
New Quote Request
${quoteData.contactPreference ? '\n*** PREFERS PHONE CALL ***\n' : ''}
CONTACT INFORMATION
Name: ${quoteData.fullName}
Email: ${quoteData.email}
Phone: ${quoteData.formattedPhone || quoteData.phone}
Address: ${quoteData.address}

INSURANCE DETAILS
Insurance Type: ${quoteData.insuranceTypeLabel || quoteData.insuranceType}
${quoteData.coverageDetails ? `\nCoverage Details:\n${quoteData.coverageDetails}` : ''}

Submitted: ${new Date(quoteData.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })}
      `;

      const result = await resend.emails.send({
        from: process.env.NOTIFICATION_EMAIL_FROM || 'Southeast Insurance <quotes@southeastins.com>',
        to: process.env.NOTIFICATION_EMAIL_TO || 'info@southeastins.com',
        subject: `New Quote Request from ${quoteData.fullName}`,
        html: emailHtml,
        text: emailText,
        replyTo: quoteData.email
      });

      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending quote notification email:', error);
      return { success: false, error: error.message };
    }
  }

  static async sendCustomerConfirmation(quoteData) {
    try {
      const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Quote Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #00A99B 0%, #008f82 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You for Your Interest!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none;">
            <p style="font-size: 16px;">Hi ${quoteData.fullName},</p>
            <p>Thank you for requesting a quote from Southeast Insurance. We've received your information and are excited about the opportunity to help protect what matters most to you!</p>

            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #00A99B;">
              <h3 style="color: #00A99B; margin-top: 0;">What Happens Next?</h3>
              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 10px;"><strong>Review:</strong> Our team will review your coverage needs within 24 hours.</li>
                <li style="margin-bottom: 10px;"><strong>Contact:</strong> A dedicated agent will reach out to discuss your options.</li>
                <li style="margin-bottom: 10px;"><strong>Compare Carriers:</strong> We'll shop 20+ top-rated insurance companies on your behalf.</li>
                <li style="margin-bottom: 10px;"><strong>Personalized Quote:</strong> You'll receive a customized quote with the best coverage and price.</li>
              </ol>
            </div>

            <h3 style="color: #00A99B;">Your Submitted Information:</h3>
            <div style="background: #e6f7f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>Insurance Type:</strong> ${quoteData.insuranceTypeLabel || quoteData.insuranceType}</p>
              <p style="margin: 5px 0;"><strong>Location:</strong> ${quoteData.address}</p>
            </div>

            <p>If you have any immediate questions, feel free to:</p>
            <ul>
              <li>Call us at <a href="tel:13862589998" style="color: #00A99B;">(386) 258-9998</a></li>
              <li>Email us at <a href="mailto:info@southeastins.com" style="color: #00A99B;">info@southeastins.com</a></li>
            </ul>

            <div style="margin-top: 30px; padding: 20px; background: #008f82; border-radius: 5px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 18px;">We look forward to helping you find the perfect coverage!</p>
            </div>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>Southeast Insurance<br>Florida<br>
            <a href="tel:13862589998" style="color: #00A99B;">(386) 258-9998</a></p>
          </div>
        </body>
        </html>
      `;

      const result = await resend.emails.send({
        from: process.env.NOTIFICATION_EMAIL_FROM || 'Southeast Insurance <quotes@southeastins.com>',
        to: quoteData.email,
        subject: 'Thank You for Your Quote Request - Southeast Insurance',
        html: emailHtml,
        replyTo: process.env.NOTIFICATION_EMAIL_TO || 'info@southeastins.com'
      });

      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending customer confirmation email:', error);
      return { success: false, error: error.message };
    }
  }
}

export default EmailService;
