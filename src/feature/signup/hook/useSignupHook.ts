import { useCallback } from "react";
import { toast } from "sonner";

import {
  DuplicateUserIdResponse,
  JoinResponse,
  RequestReAuthCodeResponse,
  SignupData,
  VerificationSmsCodeResponse,
} from "@/feature/signup/model/signupModel";
import { getGqlErrorDetailData } from "@/shared/api/queryClient";

const ERROR_CODE_INVALID_SMS_CODE = -1;

export const useVerificationSmsCodeCallback = ({
  onComplete,
}: {
  onComplete: (data: Partial<SignupData>) => void;
}) => {
  const onSuccess = useCallback(
    (response: VerificationSmsCodeResponse) => {
      if (response.verificationSmsCode.success) {
        onComplete({});
      }
    },
    [onComplete],
  );

  const onError = useCallback((error: any) => {
    if (error) {
      const errorDetail = getGqlErrorDetailData(error);
      const errorCode = (errorDetail?.originalError as { code: number })?.code;
      if (errorCode === ERROR_CODE_INVALID_SMS_CODE) {
        // OTP 코드가 틀린 경우
        toast.error(
          (errorDetail?.originalError as { message: string })?.message ||
            "인증번호가 일치하지 않습니다",
        );
      } else {
        toast.error("알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.");
      }
    }
  }, []);

  return { onSuccess, onError };
};

export const useRequestReAuthCodeCallback = ({
  onComplete,
}: {
  onComplete: (response: RequestReAuthCodeResponse) => void;
}) => {
  const onSuccess = useCallback(
    (response: RequestReAuthCodeResponse) => {
      onComplete(response);
    },
    [onComplete],
  );

  const onError = useCallback((error: any) => {
    if (error) {
      toast.error("알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.");
    }
  }, []);

  return { onSuccess, onError };
};

export const useDuplicateUserIdCallback = ({
  onComplete,
}: {
  onComplete: (response: DuplicateUserIdResponse) => void;
}) => {
  const onSuccess = useCallback(
    (response: DuplicateUserIdResponse) => {
      onComplete(response);
    },
    [onComplete],
  );

  const onError = useCallback((error: any) => {
    console.log("//error", error);
    if (error) {
      toast.error("알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.");
    }
  }, []);

  return { onSuccess, onError };
};

export const useJoinCallback = ({
  onComplete,
}: {
  onComplete: (response: JoinResponse) => void;
}) => {
  const onSuccess = useCallback(
    (response: JoinResponse) => {
      if (response.join.success) {
        onComplete(response);
      }
    },
    [onComplete],
  );

  const onError = useCallback((error: any) => {
    if (error) {
      toast.error("알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.");
    }
  }, []);

  return { onSuccess, onError };
};
