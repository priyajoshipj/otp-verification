import { NextResponse } from 'next/server';
import { getOtp, isOtpExpired } from '../../utils/otpStore';
import { TESTING_OTP_CODE } from '../../pages/constants/otp';
export async function POST(req: Request) {
    const { email, code } = await req.json();
    if (!email || !code) {
        return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 });
    }

    // Fallback for dev/testing
    if (code === TESTING_OTP_CODE) {
        return NextResponse.json({ success: true, message: 'Dummy OTP accepted ✅' });
    }

    const record = getOtp(email.trim().toLowerCase());
    if (!record) {
        return NextResponse.json({ error: 'No OTP found for this email' }, { status: 400 });
    }

    if (isOtpExpired(record)) {
        return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    if (record.code !== code) {
        return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
}
