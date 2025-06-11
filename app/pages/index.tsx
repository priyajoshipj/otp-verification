'use client';
import { useState } from 'react';
import {
    OTP_LENGTH,
    OTP_SUCCESS_MESSAGE,
    OTP_FAILED_MESSAGE,
    EMAIL_SEND_FAILED,
    GENERIC_ERROR,
    API,
} from './constants/otp';

export default function Home() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'input' | 'verify'>('input');
    const [message, setMessage] = useState('');

    const sendOtp = async () => {
        console.log("sendOtp", API.SEND_OTP)
        const res = await fetch(API.SEND_OTP, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        if (res.ok) {
            setStep('verify');
            setMessage('OTP sent to email');
        } else {
            setMessage(EMAIL_SEND_FAILED);
        }
    };

    const verifyOtp = async () => {
        try {
            const res = await fetch(API.VERIFY_OTP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: otp }),
            });

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};
            setMessage(data.success ? OTP_SUCCESS_MESSAGE : data.error || OTP_FAILED_MESSAGE);
        } catch (error) {
            setMessage(GENERIC_ERROR);
            console.error('verifyOtp error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Email Verification
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {step === 'input' ? 'Enter your email to receive OTP' : 'Enter the OTP sent to your email'}
                    </p>
                </div>

                {step === 'input' ? (
                    <div className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                onClick={sendOtp}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Send OTP
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 space-y-6">
                        <div className="text-center text-sm text-gray-600">
                            OTP sent to: <span className="font-medium text-gray-900">{email}</span>
                        </div>
                        <div>
                            <label htmlFor="otp" className="sr-only">OTP</label>
                            <input
                                id="otp"
                                type="text"
                                required
                                maxLength={OTP_LENGTH}
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-center tracking-widest font-mono text-2xl"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                            />
                        </div>
                        <div>
                            <button
                                onClick={verifyOtp}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                )}

                {message && (
                    <div className={`mt-4 text-center text-sm ${message.includes('✅') ? 'text-green-600' :
                        message.includes('Failed') ? 'text-red-600' :
                            'text-gray-600'
                        }`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
