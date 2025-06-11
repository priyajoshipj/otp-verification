export const otpMap = new Map<string, { code: string; expiresAt: number }>();

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function saveOtp(email: string, code: string) {
    otpMap.set(email, {
        code,
        expiresAt: Date.now() + 30 * 60 * 1000,
    });
}

export function getOtp(email: string) {
    return otpMap.get(email);
}

export function isOtpExpired(record?: { expiresAt: number }) {
    return !record || record.expiresAt < Date.now();
}
