import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import {
  TIMEOUT_TIME,
  RE_SEND_THRESHOLD,
  TimeoutNumberRef,
  TimeoutNumber,
} from "@/feature/signup/ui/TimeoutNumber";
import { useVerificationSmsCodeMutation } from "@/feature/signup/model/useVerificationSmsCode";
import { useVerificationSmsCodeCallback } from "@/feature/signup/hook/useSignupHook";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import RotateRightIcon from "@/shared/icon/rotate-right.svg?react";

type FormValues = {
  code: string;
};

interface PhoneVerificationStepProps {
  onComplete: () => void;
  smsVerificationId?: string;
}

const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  smsVerificationId,
  onComplete,
}) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const timeoutRef = useRef<TimeoutNumberRef>(null);

  const { onSuccess, onError } = useVerificationSmsCodeCallback({ onComplete });
  const { mutate: verificationSmsCode } = useVerificationSmsCodeMutation({
    onSuccess,
    onError,
  });

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: { code: "" },
  });

  const handleResendCode = () => {
    if (!timeoutRef.current) return;

    timeoutRef.current?.resetTime();
    setIsDisabled(true);

    const interval = setInterval(() => {
      const currentTime = timeoutRef.current?.getTime() || 0;
      if (currentTime <= TIMEOUT_TIME - RE_SEND_THRESHOLD) {
        setIsDisabled(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  const onSubmit = (values: FormValues) => {
    verificationSmsCode({
      code: values.code,
      smsVerificationId: smsVerificationId || "",
    });
  };

  const validateCode = (
    code: string,
    callback: (errorMessage: string) => void,
  ) => {
    if (!code) {
      callback("인증번호를 입력하세요.");
      return false;
    }
    if (!/^[0-9]{6}$/.test(code)) {
      callback("6자리 숫자를 입력하세요.");
      return false;
    }
    return true;
  };

  const handleSubmitCode = () => {
    // if (
    //   !validateCode(getValues("code"), (errorMessage) => {
    //     setError("code", { type: "required", message: errorMessage });
    //   })
    // ) {
    //   return;
    // }
    // onSubmit(getValues());
    
    //TODO: 임시 넘어가기 기능으로 처리
    onComplete();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div
            className={`text-sm leading-[18px] font-medium ${errors.code ? "text-red-500" : "text-gray-600"}`}
          >
            인증번호
          </div>

          <div className="flex flex-row gap-2">
            <div className="focus-within:border-primary-400 flex h-[50px] shrink grow basis-0 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 transition-colors duration-300 focus-within:border-[1px]">
              <Controller
                name="code"
                control={control}
                rules={{
                  required: "인증번호를 입력하세요.",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "6자리 숫자를 입력하세요.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="6자리 인증번호"
                    maxLength={6}
                    className="w-full text-gray-800"
                    inputMode="numeric"
                    onChange={(e) => {
                      field.onChange(e);
                      clearErrors();
                    }}
                  />
                )}
              />
            </div>
            <Button
              variant="outline"
              className="flex h-[50px] items-center justify-center gap-2 rounded-[10px] border !border-gray-200 !bg-white px-4 text-base leading-tight font-bold text-gray-800"
              onClick={handleResendCode}
              disabled={isDisabled}
            >
              <RotateRightIcon className="h-4 w-4 text-gray-800" />
              재전송
            </Button>
          </div>

          <div className="inline-flex items-center justify-between gap-2 self-stretch">
            <div className="text-right font-['Pretendard'] text-sm leading-[18px] font-medium text-red-400">
              {errors?.code?.message || ""}
            </div>
            <TimeoutNumber ref={timeoutRef} onTimeout={() => navigate("/")} />
          </div>
        </div>

        <div className="text-sm leading-tight font-medium text-gray-600">
          ・인증번호가 오지 않나요? 초대 받은 정보를 확인한 후 정보가 맞지
          않는다면 브랜드 담당자에게 문의해 새로운 초대장을 요청하세요.
          <br />
          ・입력시간 초과 시 ‘재전송’ 버튼을 눌러주세요.
        </div>
      </div>

      <Button
        className="!bg-primary-300 h-[50px] rounded-[10px] px-4 text-base leading-tight font-bold text-white"
        onClick={handleSubmitCode}
      >
        인증
      </Button>
    </>
  );
};

export default PhoneVerificationStep;
