
export interface VerificationSmsCodeResponse {
  verificationSmsCode: {
    code: number;
    message: string;
    success: boolean;
  };
}

export interface VerificationSmsCodeRequest {
  code: string;
  smsVerificationId: string;
}
