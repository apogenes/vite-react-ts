import { useConnectInviteMutation } from "@/feature/invitation/api/useConnectInvite";
import { useConnectInviteCallback } from "@/feature/invitation/hook/useInvitationHook";
import React from "react";

const AlreadyJoined: React.FC = () => {
  const { onSuccess, onError } = useConnectInviteCallback();
  const { mutate: connectInvite } = useConnectInviteMutation({ onSuccess, onError });
  //TODO: 연결 성공 후 페이지 이동
  return <div>AlreadyJoined</div>;
};

export default AlreadyJoined;