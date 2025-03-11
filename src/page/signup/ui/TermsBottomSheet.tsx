import React, { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface TermsBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (isMarketingInfoTermsAgreed: boolean) => void;
}

const TermsBottomSheet: React.FC<TermsBottomSheetProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isServiceTermsAgreed, setIsServiceTermsAgreed] = useState(false);
  const [isPersonalInfoTermsAgreed, setIsPersonalInfoTermsAgreed] =
    useState(false);
  const [isMarketingInfoTermsAgreed, setIsMarketingInfoTermsAgreed] =
    useState(false);

  const handleAllAgreed = () => {
    if (isAllAgreed) {
      setIsAllAgreed(false);
      setIsServiceTermsAgreed(false);
      setIsPersonalInfoTermsAgreed(false);
      setIsMarketingInfoTermsAgreed(false);
    } else {
      setIsAllAgreed(true);
      setIsServiceTermsAgreed(true);
      setIsPersonalInfoTermsAgreed(true);
      setIsMarketingInfoTermsAgreed(true);
    }
  };

  useEffect(() => {
    if (
      isServiceTermsAgreed &&
      isPersonalInfoTermsAgreed &&
      isMarketingInfoTermsAgreed
    ) {
      setIsAllAgreed(true);
    } else {
      setIsAllAgreed(false);
    }
  }, [
    isServiceTermsAgreed,
    isPersonalInfoTermsAgreed,
    isMarketingInfoTermsAgreed,
  ]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="items-center rounded-t-xl px-4 pt-6 pb-10"
      >
        <div className="flex flex-col items-center justify-start gap-6 rounded-tl-[20px] rounded-tr-[20px] bg-white">
          <div className="flex flex-col gap-2 self-stretch">
            {/* 약관 모두 동의 */}
            <div className="flex h-[50px] flex-row items-center justify-start gap-2 rounded-[10px] border border-gray-200 px-4">
              <Button
                className="h-6 w-6"
                variant="outline"
                size="icon"
                onClick={handleAllAgreed}
              >
                <CircleCheckBig
                  className={`h-6 w-6 ${isAllAgreed ? "text-primary-400" : "text-gray-400"}`}
                />
              </Button>
              <div className="font-['Pretendard'] text-base leading-tight font-medium text-gray-800">
                약관에 모두 동의
              </div>
            </div>

            <div className="flex h-30 flex-col items-start justify-start pl-4">
              {/* 서비스 이용 약관 동의 */}
              <div className="inline-flex h-10 items-center justify-start gap-2 self-stretch">
                <Button
                  className="h-6 w-6"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsServiceTermsAgreed(!isServiceTermsAgreed)}
                >
                  <CircleCheckBig
                    className={`h-6 w-6 ${isServiceTermsAgreed ? "text-primary-400" : "text-gray-400"}`}
                  />
                </Button>
                <div className="inline-flex items-center justify-start gap-1">
                  <div className="relative justify-center">
                    <a
                      href="https://myfranchise.notion.site/1ac9a0c9c42a80078e7dd3a8512c2490?pvs=4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-['Pretendard'] text-base leading-tight font-medium text-[#6d7176] underline">
                        서비스 이용 약관
                      </span>
                    </a>
                    <span className="font-['Pretendard'] text-base leading-tight font-medium text-[#6d7176]">
                      {" "}
                      동의 (필수)
                    </span>
                  </div>
                </div>
              </div>
              {/* 개인정보 수집 및 이용 동의 */}
              <div className="inline-flex h-10 items-center justify-start gap-2 self-stretch">
                <Button
                  className="h-6 w-6"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setIsPersonalInfoTermsAgreed(!isPersonalInfoTermsAgreed)
                  }
                >
                  <CircleCheckBig
                    className={`h-6 w-6 ${isPersonalInfoTermsAgreed ? "text-primary-400" : "text-gray-400"}`}
                  />
                </Button>
                <div className="inline-flex items-center justify-start gap-1">
                  <div className="relative justify-center">
                    <a
                      href="https://myfranchise.notion.site/1ac9a0c9c42a8030b368f444b0f26ce9?pvs=4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-['Pretendard'] text-base leading-tight font-medium text-[#6d7176] underline">
                        개인정보 수집 및 이용
                      </span>
                    </a>
                    <span className="font-['Pretendard'] text-base leading-tight font-medium text-[#6d7176]">
                      {" "}
                      동의 (필수)
                    </span>
                  </div>
                </div>
              </div>

              {/* 마케팅 정보 수신 동의 */}
              <div className="inline-flex h-10 items-center justify-start gap-2 self-stretch">
                <Button
                  className="h-6 w-6"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setIsMarketingInfoTermsAgreed(!isMarketingInfoTermsAgreed)
                  }
                >
                  <CircleCheckBig
                    className={`h-6 w-6 ${isMarketingInfoTermsAgreed ? "text-primary-400" : "text-gray-400"}`}
                  />
                </Button>
                <div className="inline-flex items-center justify-start gap-1">
                  <div className="relative justify-center">
                    <span className="font-['Pretendard'] text-base leading-tight font-medium text-[#6d7176]">
                      마케팅 정보 수신
                    </span>
                    <span className="font-['Pretendard'] text-base leading-tight font-medium text-[#6d7176]">
                      {" "}
                      동의 (선택)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            className="!bg-primary-400 inline-flex h-[50px] items-center justify-center gap-2 self-stretch rounded-[10px] px-4"
            onClick={() => onConfirm(isMarketingInfoTermsAgreed)}
            disabled={!isServiceTermsAgreed || !isPersonalInfoTermsAgreed}
          >
            <div className="font-['Pretendard'] text-base leading-tight font-bold text-white">
              회원가입 및 가맹점 연동
            </div>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TermsBottomSheet;
