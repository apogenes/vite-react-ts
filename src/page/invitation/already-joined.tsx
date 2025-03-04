import React from "react";
import { useConnectInviteMutation } from "@/feature/invitation/model/useConnectInvite";
import { useConnectInviteCallback } from "@/feature/invitation/hook/useInvitationHook";
import { ConnectInviteResponse } from "@/feature/invitation/model/invitationModel";

const AlreadyJoined: React.FC = () => {
  const onComplete = (response: ConnectInviteResponse) => {
    //TODO: 가맹점 연결이 완료되었습니다 페이지로 이동
  }
  const { onSuccess, onError } = useConnectInviteCallback({ onComplete });
  const { mutate: connectInvite } = useConnectInviteMutation({ onSuccess, onError });
  //TODO: 연결 성공 후 페이지 이동
  return <div>AlreadyJoined</div>;
};

export default AlreadyJoined;