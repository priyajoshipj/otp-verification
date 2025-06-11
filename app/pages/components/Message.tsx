'use client';
import React from 'react';

type Props = {
    message: string;
};

export const Message: React.FC<Props> = ({ message }) => {
    if (!message) return null;

    let color = 'text-gray-600';
    if (message.includes('✅')) color = 'text-green-600';
    else if (message.includes('Failed') || message.includes('error')) color = 'text-red-600';

    return (
        <div className={`mt-4 text-center text-sm ${color}`}>{message}</div>
    );
};
