import React, { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import LoginForm from "@/widget/login/ui/LoginForm";
import { useConnectInviteMutation } from "@/feature/invitation/model/useConnectInvite";
import { useConnectInviteCallback } from "@/feature/invitation/hook/useInvitationHook";
import { useLoginMutation } from "@/feature/login/model/useLogin";
import { useLoginCallback } from "@/feature/login/hook/useLoginHook";

const AlreadyJoined: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const location = useLocation();
  const responseData: { inviteId: string } = location.state;

  useEffect(() => {
    if (!token) {
      navigate("/invitation/not-found");
    }
  }, [token, navigate]);

  const onComplete = () => {
    navigate("/invitation/connect-done");
  };
  const { onSuccess, onError } = useConnectInviteCallback({ onComplete });
  const { mutate: connectInvite } = useConnectInviteMutation({
    onSuccess,
    onError,
  });

  useEffect(() => {
    connectInvite({
      inviteId: responseData.inviteId,
      token: token,
    });
  }, []);

  const onCompleteLogin = () => {
    connectInvite({
      inviteId: responseData.inviteId,
      token: token,
    });
  };
  const { onSuccess: onSuccessLogin, onError: onErrorLogin } = useLoginCallback({ onComplete: onCompleteLogin });
  const { mutate: login } = useLoginMutation({
    onSuccess: onSuccessLogin,
    onError: onErrorLogin,
  });

  const handleSubmit = (id: string, password: string) => {
    login({
      userId: id,
      password: password,
    });
  };

  return (
    <div className="flex flex-col self-stretch px-4 pb-30">
      <div className="inline-flex h-[60px] items-center gap-2 self-stretch">
        <div className="font-['Pretendard'] text-xl leading-normal font-medium text-[#43494f]">
          가맹점 연결
        </div>
      </div>

      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AlreadyJoined;
