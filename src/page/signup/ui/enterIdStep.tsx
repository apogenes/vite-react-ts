import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import { useDuplicateUserIdMutation } from "@/feature/signup/model/useDuplicateUserId";
import { useDuplicateUserIdCallback } from "@/feature/signup/hook/useSignupHook";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import CheckIcon from "@/shared/icon/check.svg?react";

type FormValues = {
  id: string;
};

interface EnterIdStepProps {
  onComplete: () => void;
}

const EnterIdStep: React.FC<EnterIdStepProps> = ({ onComplete }) => {
  const [isValidLength, setIsValidLength] = useState<boolean>(false);
  const [isValidPattern, setIsValidPattern] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: { id: "" },
  });

  const { onSuccess, onError } = useDuplicateUserIdCallback({ onComplete });
  const { mutate: duplicateUserId } = useDuplicateUserIdMutation({
    onSuccess,
    onError,
  });

  const onSubmit = (values: FormValues) => {
    console.log("//values.id", values.id);
    duplicateUserId({ userId: values.id });
  };

  const validateCode = (id: string) => {
    let isLengthValid = id.length >= 6 && id.length <= 12;
    let isPatternValid = /^[a-z0-9]+$/.test(id);

    setIsValidLength(isLengthValid);
    setIsValidPattern(isPatternValid);

    if (!isLengthValid) {
      setError("id", {
        type: "length",
        message: "6~12자리 아이디를 입력하세요.",
      });
    }
    if (!isPatternValid) {
      setError("id", {
        type: "pattern",
        message: "영문 소문자와 숫자만 입력 가능합니다.",
      });
    }

    return isLengthValid && isPatternValid;
  };

  const handleSubmitCode = () => {
    const id = getValues("id");
    if (!validateCode(id)) {
      return;
    }
    onSubmit(getValues());
  };

  console.log(errors);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className={"text-sm leading-[18px] font-medium text-gray-600"}>
          아이디
        </div>

        <div className="focus-within:border-primary-400 flex h-[50px] shrink grow items-center rounded-lg border border-gray-300 bg-white px-4 transition-colors duration-300 focus-within:border-[1px]">
          <Controller
            name="id"
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
                placeholder="아이디 입력"
                maxLength={12}
                className="w-full text-gray-800"
                inputMode="text"
                onChange={(e) => {
                  field.onChange(e);
                  validateCode(e.target.value);
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col justify-center gap-1">
          <div
            className={`flex flex-row items-center gap-1 text-sm leading-[18px] font-medium transition-all duration-300 ease-in-out ${isValidLength ? "text-primary-400" : "text-gray-400"}`}
          >
            <CheckIcon
              className={`h-4 w-4 transition-all duration-300 ease-in-out ${isValidLength ? "text-primary-400" : "text-gray-400"}`}
            />
            6-12자
          </div>
          <div
            className={`flex flex-row items-center gap-1 text-sm leading-[18px] font-medium transition-all duration-300 ease-in-out ${isValidPattern ? "text-primary-400" : "text-gray-400"}`}
          >
            <CheckIcon
              className={`h-4 w-4 transition-all duration-300 ease-in-out ${isValidPattern ? "text-primary-400" : "text-gray-400"}`}
            />
            영문 소문자/숫자 조합
          </div>
        </div>
      </div>

      <Button
        className="!bg-primary-300 h-[50px] rounded-[10px] px-4 text-base leading-tight font-bold text-white"
        onClick={handleSubmitCode}
        disabled={!isValidLength || !isValidPattern}
      >
        다음
      </Button>
    </>
  );
};

export default EnterIdStep;
