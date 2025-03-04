import React, { useState } from "react";
import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { CircleCheckBig } from 'lucide-react';
import { Button } from "@/shared/ui/button";


interface TermsBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const TermsBottomSheet: React.FC<TermsBottomSheetProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [isAllAgreed, setIsAllAgreed] = useState(false);

  const handleServiceTerms = () => {
    console.log("서비스 이용 약관 동의");
  }

  const handlePersonalInfoTerms = () => {
    console.log("개인정보 수집 및 이용 동의");
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-xl px-4 pt-6 pb-10 items-center">
        <div className="flex flex-col items-center justify-start gap-6 rounded-tl-[20px] rounded-tr-[20px] bg-white">
          <div className="flex flex-col gap-2 self-stretch">
            {/* 약관 모두 동의 */}
            <div className="flex-row flex h-[50px] items-center justify-start gap-2 rounded-[10px] border border-gray-200 px-4">
              <Button className="w-6 h-6" variant="outline" size="icon" onClick={() => setIsAllAgreed(!isAllAgreed)}>
                <CircleCheckBig className={`w-6 h-6 ${isAllAgreed ? "text-primary-400" : "text-gray-400"}`} />
              </Button>
              <div className="font-['Pretendard'] text-base leading-tight font-medium text-gray-800">
                약관에 모두 동의
              </div>
            </div>

            <div className="flex h-20 flex-col items-start justify-start">
              {/* 서비스 이용 약관 동의 */}
              <div className="inline-flex h-10 items-center justify-start gap-4 self-stretch">
                <div className="flex h-5 shrink grow basis-0 items-center justify-start gap-2">
                  <div className="flex items-center justify-start gap-1">
                    <div className="font-['Pretendard'] text-base leading-tight font-medium text-gray-800">
                      서비스 이용 약관 동의 (필수)
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-0.5 rounded">
                  <div className="font-['Pretendard'] text-xs leading-[14px] font-medium text-gray-600 underline cursor-pointer" onClick={handleServiceTerms}>
                    내용보기
                  </div>
                </div>
              </div>
              {/* 개인정보 수집 및 이용 동의 */}
              <div className="inline-flex h-10 w-[312px] items-center justify-start gap-4">
                <div className="flex h-5 shrink grow basis-0 items-center justify-start gap-2">
                  <div className="font-['Pretendard'] text-base leading-tight font-medium text-gray-800">
                    개인정보 수집 및 이용 동의 (필수)
                  </div>
                </div>
                <div className="flex items-center justify-center gap-0.5 rounded">
                  <div className="font-['Pretendard'] text-xs leading-[14px] font-medium text-gray-600 underline cursor-pointer" onClick={handlePersonalInfoTerms}>
                    내용보기
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="default" size="lg" className="inline-flex h-[50px] items-center justify-center gap-2 self-stretch rounded-[10px] !bg-primary-400 px-4" onClick={onConfirm}>
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
