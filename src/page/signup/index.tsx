import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import TermsBottomSheet from "@/page/signup/ui/TermsBottomSheet";
import {
  SIGNUP_STEPS,
  getStepComponent,
  getStepProps,
} from "@/feature/signup/model/signupModel";

interface SignupLocationState {
  inviteId: string;
  smsVerificationId: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const location = useLocation();
  const responseData: SignupLocationState = location.state;

  const [step, setStep] = useState(0);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const StepComponent = getStepComponent(step);
  const stepProps = getStepProps(step, {
    token,
    inviteId: responseData.inviteId,
    smsVerificationId: responseData.smsVerificationId,
  });

  return (
    <div className="flex flex-col pb-4">
      <div className="sticky top-0 z-3 h-1 overflow-hidden bg-gray-100">
        <div
          className="bg-primary-300 h-full transition-all duration-300"
          style={{ width: `${(step + 1) * (100 / SIGNUP_STEPS.length)}%` }}
        />
      </div>
      <div className="flex flex-col gap-6 px-4">
        <div className="inline-flex h-[60px] items-center justify-start">
          <div className="text-xl leading-normal font-medium text-gray-800">
            {SIGNUP_STEPS[step]}
          </div>
        </div>
        <StepComponent
          {...stepProps}
          onComplete={() => {
            if (step < SIGNUP_STEPS.length - 1) {
              setStep((prev) => prev + 1);
            } else {
              setIsTermsOpen(true);
            }
          }}
        />
      </div>
      <TermsBottomSheet
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onConfirm={() => {
          setIsTermsOpen(false);
          navigate("/welcome"); // 약관 동의 후 회원가입 완료 페이지 이동 (예시)
        }}
      />
    </div>
  );
};

export default Signup;
