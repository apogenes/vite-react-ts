import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  AcceptInviteResponse,
  ConnectInviteResponse,
} from "@/feature/invitation/model/invitationModel";
import { getGqlErrorDetailData } from "@/shared/api/queryClient";

const ERROR_CODE_NO_INVITATION = -1;
const ERROR_CODE_ALREADY_JOINED = -2;

export function useInviteInfoError(error: any) {
  useEffect(() => {
    if (error) {
      const errorDetail = getGqlErrorDetailData(error);
      const errorCode = (errorDetail?.originalError as { code: number })?.code;
      if (errorCode === ERROR_CODE_NO_INVITATION) {
        // 초대 정보가 없는 경우
        toast.error(
          (errorDetail?.originalError as { message: string })?.message ||
            "초대 정보를 찾을 수 없습니다",
        );
      } else {
        toast.error("알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.");
      }
    }
  }, [error]);
}

export const useAcceptInviteCallback = ({
  onComplete,
}: {
  onComplete: (response: AcceptInviteResponse) => void;
}) => {
  const navigate = useNavigate();

  const onSuccess = useCallback(
    (response: AcceptInviteResponse) => {
      onComplete(response);
    },
    [navigate, onComplete],
  );

  const onError = useCallback((error: any) => {
    if (error) {
      const errorDetail = getGqlErrorDetailData(error);
      const errorCode = (errorDetail?.originalError as { code: number })?.code;
      switch (errorCode) {
        case ERROR_CODE_NO_INVITATION: // 만료되었거나 찾을 수 없는 초대 정보가 없는 경우
          toast.error(
            (errorDetail?.originalError as { message: string })?.message ||
              "만료되었거나 찾을 수 없는 초대 정보 입니다",
          );
          navigate("/invitation/not-found");
          break;
        case ERROR_CODE_ALREADY_JOINED: // 이미 가입된 경우
          toast.error(
            (errorDetail?.originalError as { message: string })?.message ||
              "이미 가입된 사용자 입니다",
          );
          navigate("/invitation/already-joined");
          break;
        default:
          toast.error(
            "알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.",
          );
          break;
      }
    }
  }, []);

  return { onSuccess, onError };
};

export const useConnectInviteCallback = ({
  onComplete,
}: {
  onComplete: (response: ConnectInviteResponse) => void;
}) => {
  const navigate = useNavigate();

  const onSuccess = useCallback(
    (response: ConnectInviteResponse) => {
      onComplete(response);
    },
    [navigate, onComplete],
  );

  const onError = useCallback((error: any) => {
    if (error) {
      //TODO: error.code 가 401 일 경우 로그인 페이지로 이동하는 처리
      const errorDetail = getGqlErrorDetailData(error);
      const errorCode = (errorDetail?.originalError as { code: number })?.code;
      switch (errorCode) {
        case ERROR_CODE_NO_INVITATION: // 초대 정보가 없는 경우
          toast.error(
            (errorDetail?.originalError as { message: string })?.message ||
              "초대 정보를 찾을 수 없습니다",
          );
          navigate("/invitation/not-found");
          break;
        case ERROR_CODE_ALREADY_JOINED: // 이미 연결된 가맹점이 있는 경우
          toast.error(
            (errorDetail?.originalError as { message: string })?.message ||
              "이미 연결된 가맹점이 있습니다",
          );
          navigate("/invitation/already-connected");
          break;
        default:
          toast.error(
            "알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.",
          );
          break;
      }
    }
  }, []);

  return { onSuccess, onError };
};
