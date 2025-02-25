import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useHealthCheckQuery } from "@/shared/api/useHealthCheck";
import { Button } from "@/shared/ui/button";

const Invitation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  // const { data } = useGetInvitationDetailQuery(id);

  const navigate = useNavigate();

  const { data } = useHealthCheckQuery();
  console.log("//data", data);

  const handleAcceptInvitation = () => {
    // navigate("/invitation/accept");
    navigate("/invitation/not-found");
    // navigate("/invitation/expired-letter");
  };

  if (token) {
    // return <div>초대장 아이디가 없습니다.</div>;
    // navigate("/invitation/not-found");
    navigate("/invitation/expired-letter");
    return;
  }

  return (
    <>
      <div className="bg-primary-100 flex flex-col items-center justify-center gap-4 pt-10 pb-6">
        <div className="text-primary-400 text-sm font-bold">(서비스 로고)</div>
        <img src="/image/letter.png" alt="초대장" className="h-20 w-20" />
        <div className="text-primary-400 text-lg font-bold">
          초대장이 도착했어요.
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-6 pr-4 pb-6 pl-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-600">
            `{"마이포차"}의 {"한포차"} 담당자의 초대입니다.`
          </div>
          <div className="border-gray-150 inline-flex h-16 items-center justify-center gap-2 rounded-[10px] border bg-gray-100 p-3">
            <img
              className="h-10 w-10 rounded-lg"
              src="https://placehold.co/40x40"
            />
            <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-0.5">
              <div className="self-stretch text-xs leading-[14px] font-medium text-gray-600">
                마이포차
              </div>
              <div className="self-stretch text-base leading-tight font-bold text-gray-800">
                둔촌역점
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
                정*주
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-2 self-stretch py-2">
              <div className="w-20 text-sm leading-[18px] font-medium text-gray-500">
                생년월일
              </div>
              <div className="shrink grow basis-0 self-stretch text-sm leading-[18px] font-medium text-gray-800">
                86년 **월 **일 / 만 39세
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-2 self-stretch py-2">
              <div className="w-20 text-sm leading-[18px] font-medium text-gray-500">
                성별
              </div>
              <div className="shrink grow basis-0 self-stretch text-sm leading-[18px] font-medium text-gray-800">
                남자
              </div>
            </div>
            <div className="inline-flex items-start justify-start gap-2 self-stretch py-2">
              <div className="w-20 text-sm leading-[18px] font-medium text-gray-500">
                휴대폰 번호
              </div>
              <div className="shrink grow basis-0 self-stretch text-sm leading-[18px] font-medium text-gray-800">
                01000000000
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
