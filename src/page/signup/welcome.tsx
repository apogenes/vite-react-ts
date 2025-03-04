import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 pt-20 pb-5">
      <div className="flex flex-col items-center justify-start gap-2.5 self-stretch">
        <div className="text-xl leading-normal font-medium text-gray-800 text-center">
          회원가입 및 가맹점 연결이 <br />
          완료되었습니다
        </div>
        <div className="self-stretch text-center text-sm leading-[18px] font-medium text-gray-600">
          5초 후 홈으로 이동합니다
        </div>
      </div>
      <div data-svg-wrapper className="relative">
        <img
          src="/image/welcome.png"
          alt="회원가입 및 가맹점 연결 완료"
          className="h-45 w-45"
        />
      </div>
      <Button
        className="!bg-primary-400 h-[50px] w-full rounded-[10px] px-4 text-base leading-tight font-bold text-white"
        onClick={() => navigate("/")}
      >
        홈으로
      </Button>
    </div>
  );
};

export default Welcome;
