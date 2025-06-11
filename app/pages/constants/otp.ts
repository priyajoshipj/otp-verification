export const OTP_LENGTH = 6;
export const OTP_SUCCESS_MESSAGE = 'OTP verified ✅';
export const OTP_FAILED_MESSAGE = 'Verification failed';
export const EMAIL_SEND_FAILED = 'Failed to send OTP';
export const GENERIC_ERROR = 'Something went wrong';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const API = {
    SEND_OTP: '/api/send-otp',
    VERIFY_OTP: '/api/verify-otp',
};

export const OTP_EMAIL_FROM = 'onboarding@resend.dev';
export const OTP_EMAIL_SUBJECT = 'Your One-Time Password (OTP)';
export const OTP_EXPIRY_MINUTES = 30;
export const TESTING_OTP_CODE = '123456';
