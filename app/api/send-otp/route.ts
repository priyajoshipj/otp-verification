import { NextResponse } from 'next/server';
import { generateOTP, saveOtp } from '../../utils/otpStore';
import { sendOtpEmail } from '../../utils/emailService';

export async function POST(req: Request) {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });
    const otp = generateOTP();

    saveOtp(email.trim().toLowerCase(), otp);
    const result = await sendOtpEmail(email, otp);
    if (result.error) return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });

    return NextResponse.json({ success: true });
}