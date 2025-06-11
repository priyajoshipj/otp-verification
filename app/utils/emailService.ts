import { Resend } from 'resend';
import { OTP_EMAIL_FROM, OTP_EMAIL_SUBJECT } from '../pages/constants/otp';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOtpEmail(email: string, otp: string) {
    const htmlContent = generateOtpHtml(otp);
    const result = await resend.emails.send({
        from: OTP_EMAIL_FROM,
        to: [email],
        subject: OTP_EMAIL_SUBJECT,
        html: htmlContent,
    });

    return result;
}

function generateOtpHtml(otp: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">🔐 Verification Code</h1>
          <p style="color: #4b5563; font-size: 16px;">Your one-time password for secure access</p>
        </div>
  
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f2937; font-family: monospace;">
            ${otp}
          </div>
        </div>
  
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>⏱️ This code will expire in 30 minutes</p>
          <p>🔒 Please do not share this code with anyone</p>
        </div>
  
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px;">
          <p>If you didn't request this code, please ignore this email</p>
        </div>
      </div>
    `;
}