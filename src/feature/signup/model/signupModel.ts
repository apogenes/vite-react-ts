import PhoneVerificationStep from "@/page/signup/ui/phoneVerificationStep";
import EnterIdStep from "@/page/signup/ui/enterIdStep";
import EnterPasswordStep from "@/page/signup/ui/enterPasswordStep";

export const SIGNUP_STEPS = [
  "휴대전화 번호를 인증해주세요",
  "아이디를 입력해주세요",
  "비밀번호를 입력해주세요",
];

export const stepComponents = {
  0: PhoneVerificationStep,
  1: EnterIdStep,
  2: EnterPasswordStep,
};

export const getStepComponent = (step: number) => {
  return stepComponents[step as keyof typeof stepComponents];
};

export const getStepProps = (
  step: number,
  data: { token: string, inviteId: string, smsVerificationId: string },
) => {
  switch (step) {
    case 0:
      return {
        token: data.token,
        inviteId: data.inviteId,
        smsVerificationId: data.smsVerificationId,
      };
    case 1:
      return {};
    case 2:
      return {};
    default:
      return {};
  }
};

export interface SignupData {
  id: string;
  password: string;
}


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

export interface DuplicateUserIdResponse {
  duplicateUserId: boolean;
}

export interface DuplicateUserIdRequest {
  userId: string;
}

export interface RequestReAuthCodeResponse {
  requestReAuthCode: {
    requestId: string;
    requestTime: string;
    smsVerificationId: string;
  };
}

export interface RequestReAuthCodeRequest {
  inviteId: string;
  token: string;
}

export interface JoinResponse {
  join: {
    code: number;
    message: string;
    success: boolean;
  };
}

export interface JoinRequest {
  inviteId: string;
  inviteToken: string;
  password: string;
  userId: string;
}