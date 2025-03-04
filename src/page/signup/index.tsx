import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';

import TermsBottomSheet from "@/page/signup/ui/TermsBottomSheet";
import {
  SIGNUP_STEPS,
  SignupData,
  getStepComponent,
  getStepProps,
} from "@/feature/signup/model/signupModel";
import { useJoinMutation } from "@/feature/signup/model/uesJoin";
import { useJoinCallback } from "@/feature/signup/hook/useSignupHook";
import { Button } from "@/shared/ui/button";

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
  const [signupData, setSignupData] = useState<SignupData>({
    id: "",
    password: "",
  });

  const StepComponent = getStepComponent(step);
  const stepProps = getStepProps(step, {
    token,
    inviteId: responseData.inviteId,
    smsVerificationId: responseData.smsVerificationId,
  });

  const handleStepComplete = (stepData: Partial<typeof signupData>) => {
    setSignupData((prev) => ({ ...prev, ...stepData }));

    if (step < SIGNUP_STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setIsTermsOpen(true);
    }
  }

  const { onSuccess, onError } = useJoinCallback({
    onComplete: () => {
      navigate("/welcome");
    },
  });
  const { mutate: join } = useJoinMutation({
    onSuccess,
    onError,
  });

  const handleJoin = () => {
    join({
      inviteId: responseData.inviteId,
      inviteToken: token,
      password: signupData.password,
      userId: signupData.id,
    });
  }

  return (
    <div className="flex flex-col pb-4">
      <div className="sticky top-0 z-3 h-1 overflow-hidden bg-gray-100">
        <div
          className="bg-primary-300 h-full transition-all duration-300"
          style={{ width: `${(step + 1) * (100 / SIGNUP_STEPS.length)}%` }}
        />
      </div>
      <div className="flex flex-col gap-6 px-4">
        <div className="inline-flex h-[60px] items-center justify-start gap-4">
          {step === 2 && (
            <Button variant="outline" size="icon" onClick={() => setStep((prev) => prev - 1)}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          <div className="text-xl leading-normal font-medium text-gray-800">
            {SIGNUP_STEPS[step]}
          </div>
        </div>
        <StepComponent
          {...stepProps}
          onComplete={handleStepComplete}
        />
      </div>
      <TermsBottomSheet
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onConfirm={handleJoin}
      />
    </div>
  );
};

export default Signup;
