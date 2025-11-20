export const generateOtp = () => {

    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
}

export const sendOtp = (mobile: string, otp: string) => {
        
}
