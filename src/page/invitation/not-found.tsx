import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundInvitation() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 pt-20 pb-5">
      <div className="flex flex-col items-center justify-start gap-2.5 self-stretch">
        <div className="text-xl leading-normal font-medium text-gray-800">
          초대장을 찾을 수 없습니다
        </div>
        <div className="self-stretch text-center text-sm leading-[18px] font-medium text-gray-600">
          유효하지 않은 초대장 링크이거나 삭제된 초대장입니다.
        </div>
      </div>
      <div data-svg-wrapper className="relative">
        <img src="/image/expired_letter.png" alt="초대장을 찾을 수 없습니다" />
      </div>
      <Button
        className="!bg-primary-400 h-[50px] rounded-[10px] px-4 text-base leading-tight font-bold text-white"
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
}
