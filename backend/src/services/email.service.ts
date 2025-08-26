import nodemailer from 'nodemailer';
import { logger } from '@/config/logger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { render } from 'ejs';

export interface EmailConfig {
  enabled: boolean;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  replyTo?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export interface EmailOptions {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content?: Buffer | string;
    path?: string;
    contentType?: string;
  }>;
  priority?: 'high' | 'normal' | 'low';
}

export interface WelcomeEmailData {
  firstName: string;
  lastName: string;
  email: string;
  loginUrl: string;
  role: string;
}

export interface PasswordResetEmailData {
  firstName: string;
  resetUrl: string;
  expiryTime: string;
}

export interface AdminNotificationData {
  adminName: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export class EmailService {
  private transporter!: nodemailer.Transporter;
  private config: EmailConfig;
  private templatesPath: string;

  constructor() {
    this.config = {
      enabled: process.env.SMTP_ENABLED === 'true',
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      from: process.env.SMTP_FROM || 'noreply@nysc.lk',
      replyTo: process.env.SMTP_REPLY_TO || 'info@nysc.lk',
    };

    this.templatesPath = join(__dirname, '../../templates/email');
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      if (!this.config.enabled) {
        logger.info('SMTP service disabled, skipping email service initialization', {
          enabled: false,
          from: this.config.from,
        });
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: this.config.host,
        port: this.config.port,
        secure: this.config.secure,
        auth: this.config.auth,
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 60000,
        greetingTimeout: 30000,
        socketTimeout: 60000,
      });

      // Verify connection on initialization
      if (process.env.NODE_ENV !== 'test') {
        await this.verifyConnection();
      }

      logger.info('Email service initialized', {
        enabled: true,
        host: this.config.host,
        port: this.config.port,
        secure: this.config.secure,
        from: this.config.from,
      });
    } catch (error) {
      logger.error('Failed to initialize email service', { error });
      throw error;
    }
  }

  /**
   * Verify SMTP connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info('SMTP connection verified successfully');
      return true;
    } catch (error) {
      logger.error('SMTP connection verification failed', { error });
      return false;
    }
  }

  /**
   * Send email
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.config.enabled) {
      logger.info('SMTP disabled, skipping email sending', {
        to: options.to,
        subject: options.subject,
        enabled: false,
      });
      return false;
    }

    try {
      const mailOptions = {
        from: this.config.from,
        replyTo: this.config.replyTo,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        cc: options.cc ? (Array.isArray(options.cc) ? options.cc.join(', ') : options.cc) : undefined,
        bcc: options.bcc ? (Array.isArray(options.bcc) ? options.bcc.join(', ') : options.bcc) : undefined,
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments,
        priority: options.priority || 'normal',
        headers: {
          'X-Mailer': 'NYSC Sri Lanka Admin System',
          'X-Priority': options.priority === 'high' ? '1' : options.priority === 'low' ? '5' : '3',
        },
      };

      const info = await this.transporter.sendMail(mailOptions);

      logger.info('Email sent successfully', {
        messageId: info.messageId,
        to: options.to,
        subject: options.subject,
        response: info.response,
      });

      return true;
    } catch (error) {
      logger.error('Failed to send email', {
        error,
        to: options.to,
        subject: options.subject,
      });
      return false;
    }
  }

  /**
   * Render email template
   */
  private async renderTemplate(templateName: string, data: any): Promise<EmailTemplate> {
    try {
      const templatePath = join(this.templatesPath, `${templateName}.ejs`);
      const templateContent = readFileSync(templatePath, 'utf-8');
      
      const html = render(templateContent, {
        ...data,
        baseUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
        companyName: 'National Youth Services Council',
        supportEmail: this.config.replyTo || 'support@nysc.lk',
        currentYear: new Date().getFullYear(),
      });

      // Extract subject from template (first line should be subject)
      const lines = html.split('\n');
      const subjectMatch = lines[0].match(/<!--\s*SUBJECT:\s*(.+?)\s*-->/);
      const subject = subjectMatch ? subjectMatch[1] : 'NYSC Sri Lanka Notification';

      // Remove subject line from HTML
      const htmlContent = lines.slice(1).join('\n');

      // Generate text version (basic HTML to text conversion)
      const text = htmlContent
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      return {
        subject,
        html: htmlContent,
        text,
      };
    } catch (error) {
      logger.error('Failed to render email template', {
        error,
        templateName,
      });
      throw new Error(`Template rendering failed: ${templateName}`);
    }
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    if (!this.config.enabled) {
      logger.info('SMTP disabled, skipping welcome email', {
        email: data.email,
        enabled: false,
      });
      return false;
    }

    try {
      const template = await this.renderTemplate('welcome', data);
      
      return await this.sendEmail({
        to: data.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
        priority: 'normal',
      });
    } catch (error) {
      logger.error('Failed to send welcome email', { error, email: data.email });
      return false;
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(data: PasswordResetEmailData & { email: string }): Promise<boolean> {
    if (!this.config.enabled) {
      logger.info('SMTP disabled, skipping password reset email', {
        email: data.email,
        enabled: false,
      });
      return false;
    }

    try {
      const template = await this.renderTemplate('password-reset', data);
      
      return await this.sendEmail({
        to: data.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
        priority: 'high',
      });
    } catch (error) {
      logger.error('Failed to send password reset email', { error, email: data.email });
      return false;
    }
  }

  /**
   * Send admin notification email
   */
  async sendAdminNotification(data: AdminNotificationData & { email: string }): Promise<boolean> {
    if (!this.config.enabled) {
      logger.info('SMTP disabled, skipping admin notification', {
        email: data.email,
        enabled: false,
      });
      return false;
    }

    try {
      const template = await this.renderTemplate('admin-notification', data);
      
      return await this.sendEmail({
        to: data.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
        priority: data.action.includes('SECURITY') || data.action.includes('LOGIN_FAILED') ? 'high' : 'normal',
      });
    } catch (error) {
      logger.error('Failed to send admin notification email', { error, email: data.email });
      return false;
    }
  }

  /**
   * Send bulk emails (with rate limiting)
   */
  async sendBulkEmails(emails: EmailOptions[], batchSize: number = 10, delay: number = 1000): Promise<number> {
    if (!this.config.enabled) {
      logger.info('SMTP disabled, skipping bulk email sending', {
        emailCount: emails.length,
        enabled: false,
      });
      return 0;
    }

    let successCount = 0;
    
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const batchPromises = batch.map(email => this.sendEmail(email));
      
      try {
        const results = await Promise.allSettled(batchPromises);
        const batchSuccessCount = results.filter(result => result.status === 'fulfilled' && result.value).length;
        successCount += batchSuccessCount;
        
        logger.info('Bulk email batch processed', {
          batchIndex: Math.floor(i / batchSize) + 1,
          batchSize: batch.length,
          successful: batchSuccessCount,
          failed: batch.length - batchSuccessCount,
        });
        
        // Add delay between batches to avoid overwhelming SMTP server
        if (i + batchSize < emails.length) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        logger.error('Bulk email batch failed', { error, batchIndex: Math.floor(i / batchSize) + 1 });
      }
    }
    
    logger.info('Bulk email sending completed', {
      totalEmails: emails.length,
      successful: successCount,
      failed: emails.length - successCount,
    });
    
    return successCount;
  }

  /**
   * Send system notification to all admins
   */
  async sendSystemNotificationToAdmins(
    subject: string, 
    message: string, 
    adminEmails: string[],
    priority: 'high' | 'normal' | 'low' = 'normal'
  ): Promise<boolean> {
    if (!this.config.enabled) {
      logger.info('SMTP disabled, skipping system notification', {
        adminCount: adminEmails.length,
        subject,
        enabled: false,
      });
      return false;
    }

    try {
      const template = await this.renderTemplate('system-notification', {
        message,
        timestamp: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Colombo',
        }),
      });

      const emails = adminEmails.map(email => ({
        to: email,
        subject: `[SYSTEM] ${subject}`,
        html: template.html,
        text: template.text,
        priority,
      }));

      const successCount = await this.sendBulkEmails(emails, 5, 2000);
      return successCount === adminEmails.length;
    } catch (error) {
      logger.error('Failed to send system notification to admins', { error, subject });
      return false;
    }
  }

  /**
   * Test email configuration
   */
  async testEmailConfiguration(testEmail: string): Promise<boolean> {
    if (!this.config.enabled) {
      logger.info('SMTP disabled, skipping email configuration test', {
        testEmail,
        enabled: false,
      });
      return false;
    }

    try {
      const testSubject = 'NYSC Email Configuration Test';
      const testMessage = `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify the email configuration is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
        <p>If you received this email, your email configuration is working properly.</p>
      `;

      return await this.sendEmail({
        to: testEmail,
        subject: testSubject,
        html: testMessage,
        text: testMessage.replace(/<[^>]*>/g, ''),
      });
    } catch (error) {
      logger.error('Email configuration test failed', { error, testEmail });
      return false;
    }
  }

  /**
   * Get email statistics
   */
  getEmailStats(): {
    enabled: boolean;
    host: string;
    port: number;
    secure: boolean;
    from: string;
    isConfigured: boolean;
  } {
    return {
      enabled: this.config.enabled,
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      from: this.config.from,
      isConfigured: !!(this.config.auth.user && this.config.auth.pass),
    };
  }
}

// Create and export singleton instance
export default new EmailService();