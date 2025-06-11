'use client';
import React from 'react';

type Props = {
    email: string;
    otp: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
};

export const OtpInput: React.FC<Props> = ({ email, otp, onChange, onSubmit }) => (
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
                maxLength={6}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center tracking-widest font-mono text-2xl"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => onChange(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            />
        </div>
        <div>
            <button
                onClick={onSubmit}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Verify OTP
            </button>
        </div>
    </div>
);