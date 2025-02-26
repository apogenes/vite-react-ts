import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundInvitation() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 pt-20 pb-5">
      <div className="flex flex-col items-center justify-start gap-2.5 self-stretch">
        <div className="text-xl leading-normal font-medium text-gray-800">
          만료됐거나 없는 초대장입니다
        </div>
        <div className="self-stretch text-center text-sm leading-[18px] font-medium text-gray-600">
          본사 담당자에게 새 초대장을 요청하세요
        </div>
      </div>
      <div data-svg-wrapper className="relative">
        <img src="/image/expired_letter.png" alt="초대장을 찾을 수 없습니다" className="w-45 h-45" />
      </div>
      <Button
        className="!bg-primary-400 h-[50px] rounded-[10px] px-4 text-base leading-tight font-bold text-white w-full"
        onClick={() => navigate("/")}
      >
        홈으로
      </Button>
    </div>
  );
}
