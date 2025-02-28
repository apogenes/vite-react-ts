import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import InvitationSkeleton from "@/feature/invitation/ui/InvitationSkeleton";
import { useInviteInfoQuery } from "@/feature/invitation/model/useInviteInfo";
import { useAcceptInviteMutation } from "@/feature/invitation/model/useAcceptInvite";
import { useInviteInfoError, useAcceptInviteCallback } from "@/feature/invitation/hook/useInvitationHook";
import { Button } from "@/shared/ui/button";

const Invitation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || import.meta.env.VITE_REACT_APP_INVITATION_TOKEN;
  
  const { data, error, isLoading, isFetched } = useInviteInfoQuery(token);
  useInviteInfoError(error);

  const { onSuccess, onError } = useAcceptInviteCallback();
  const { mutate: acceptInvitation } = useAcceptInviteMutation({ onSuccess, onError });


  useEffect(() => {
    if (!token || (isFetched && !data)) {
      navigate("/invitation/not-found");
    }
  }, [token, isFetched, data, navigate]);

  const handleAcceptInvitation = () => {
    acceptInvitation({ inviteId: data?.inviteInfo?._id || '', token });
    
  };

  if (isLoading) {
    return <InvitationSkeleton />;
  }

  return (
    <>
      <div className="bg-primary-100 flex flex-col items-center justify-center gap-4 pt-10 pb-6">
        <div className="text-primary-400 text-sm font-bold">(서비스명)</div>
        <img src="/image/letter.png" alt="초대장" className="h-20 w-20" />
        <div className="text-primary-400 text-lg font-bold">
          초대장이 도착했어요.
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-6 pr-4 pb-6 pl-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-600">
            {`${data?.inviteInfo?.brandName}의 ${data?.inviteInfo?.storeName} 담당자의 초대입니다.`}
          </div>
          <div className="border-gray-150 inline-flex h-16 items-center justify-center gap-2 rounded-[10px] border bg-gray-100 p-3">
            <img
              className="h-10 w-10 rounded-lg"
              src={data?.inviteInfo?.brandLogoUrl || "https://placehold.co/40x40"}
            />
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-0.5">
              <div className="self-stretch text-xs leading-[14px] font-medium text-gray-600">
                {data?.inviteInfo?.brandName}
              </div>
              <div className="self-stretch text-base leading-tight font-bold text-gray-800">
                {data?.inviteInfo?.storeName}
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex h-[162px] flex-col items-start justify-start gap-2">
          <div className="inline-flex items-center justify-start gap-2 self-stretch">
            <div className="text-sm leading-[18px] font-bold text-gray-800">
              초대 받으시는 분
            </div>
          </div>
          <div className="flex h-[136px] flex-col items-start justify-start self-stretch rounded-[10px]">
            <div className="inline-flex items-start justify-start gap-2 self-stretch py-2">
              <div className="w-20 text-sm leading-[18px] font-medium text-gray-500">
                이름
              </div>
              <div className="shrink grow basis-0 text-sm leading-[18px] font-medium text-gray-800">
                {data?.inviteInfo?.maskedName || '-'}
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-2 self-stretch py-2">
              <div className="w-20 text-sm leading-[18px] font-medium text-gray-500">
                생년월일
              </div>
              <div className="shrink grow basis-0 self-stretch text-sm leading-[18px] font-medium text-gray-800">
                {`${data?.inviteInfo?.maskedBirthDate || '-'} / 만 ${data?.inviteInfo?.age || '-'}세`}
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-2 self-stretch py-2">
              <div className="w-20 text-sm leading-[18px] font-medium text-gray-500">
                성별
              </div>
              <div className="shrink grow basis-0 self-stretch text-sm leading-[18px] font-medium text-gray-800">
                {data?.inviteInfo?.gender ? data.inviteInfo.gender === 'M' ? '남자' : '여자' : '-'}
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-2 self-stretch py-2">
              <div className="w-20 text-sm leading-[18px] font-medium text-gray-500">
                휴대폰 번호
              </div>
              <div className="shrink grow basis-0 self-stretch text-sm leading-[18px] font-medium text-gray-800">
                {data?.inviteInfo?.cellPhone || '-'}
              </div>
            </div>
          </div>
        </div>

        <Button
          className="!bg-primary-400 h-[50px] rounded-[10px] px-4 text-base leading-tight font-bold text-white"
          onClick={handleAcceptInvitation}
        >
          초대 수락하기
        </Button>
      </div>
    </>
  );
};

export default Invitation;
