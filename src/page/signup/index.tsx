import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { AcceptInviteResponse } from "@/feature/invitation/model/invitationModel";
import {
  SIGNUP_STEPS,
  getStepComponent,
  getStepProps,
} from "@/feature/signup/model/signupModel";

const Signup: React.FC = () => {
  const location = useLocation();
  const responseData: AcceptInviteResponse = location.state;

  const [step, setStep] = useState(0);
  const StepComponent = getStepComponent(step);
  const stepProps = getStepProps(step, {
    smsVerificationId: responseData.acceptInvite.smsVerificationId,
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
              setStep((prev) => prev + 1)
            } else {
              //TODO: 회원가입 완료로 이동
            }
          }
          }
        />
      </div>
    </div>
  );
};

export default Signup;
