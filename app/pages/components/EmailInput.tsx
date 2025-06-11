'use client';
import React from 'react';

type Props = {
    email: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
};

export const EmailInput: React.FC<Props> = ({ email, onChange, onSubmit }) => (
    <div className="mt-8 space-y-6">
        <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
                id="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={e => onChange(e.target.value)}
            />
        </div>
        <div>
            <button
                onClick={onSubmit}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Send OTP
            </button>
        </div>
    </div>
);