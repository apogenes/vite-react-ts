import { useCallback } from "react";
import { toast } from "sonner";

import { LoginResponse } from "@/feature/login/model/loginModel";

export const useLoginCallback = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const onSuccess = useCallback(
    (response: LoginResponse) => {
      if (response.login) {
        onComplete();
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
