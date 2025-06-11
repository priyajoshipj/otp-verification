'use client'
import { useState } from 'react';
import { EmailInput } from './pages/components/EmailInput';
import { OtpInput } from './pages/components/OtpInput';
import { Message } from './pages/components/Message';
import { API } from './pages/constants/otp';
export default function Home() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    try {
      const res = await fetch(API.SEND_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStep('verify');
        setMessage('OTP sent to email');
      } else {
        const error = await res.json();
        setMessage(error?.error || 'Failed to send OTP');
      }
    } catch (err) {
      setMessage('Unexpected error while sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch(API.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await res.json();
      setMessage(data.success ? 'OTP verified ✅' : data.error || 'Verification failed');
    } catch (error) {
      setMessage('Something went wrong during verification');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Email Verification</h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 'input' ? 'Enter your email to receive OTP' : 'Enter the OTP sent to your email'}
          </p>
        </div>

        {step === 'input' ? (
          <EmailInput email={email} onChange={setEmail} onSubmit={sendOtp} />
        ) : (
          <OtpInput email={email} otp={otp} onChange={setOtp} onSubmit={verifyOtp} />
        )}

        <Message message={message} />
      </div>
    </div>
  );
}
