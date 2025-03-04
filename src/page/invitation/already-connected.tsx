import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

export default function AlreadyConnected() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 pt-20 pb-5">
      <div className="flex flex-col items-center justify-start gap-2.5 self-stretch">
        <div className="text-xl leading-normal font-medium text-gray-800">
          이미 연결된 가맹점이 있습니다
        </div>
        <div className="self-stretch text-center text-sm leading-[18px] font-medium text-gray-600">
          이미 연결된 가맹점의 가맹본사에 <br/>
          가맹점 연결 해제를 요청 후 다시 시도해 주세요. 
        </div>
      </div>
      <div data-svg-wrapper className="relative">
        <img src="/image/already_connected.png" alt="이미 연결된 가맹점이 있습니다" className="w-45 h-45" />
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
