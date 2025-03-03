import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff, Check } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

type FormValues = {
  password: string;
  passwordConfirm: string;
};

interface EnterPasswordStepProps {
  onComplete: () => void;
}

const EnterPasswordStep: React.FC<EnterPasswordStepProps> = ({
  onComplete,
}) => {
  const [isValidLength, setIsValidLength] = useState<boolean>(false);
  const [isValidPattern, setIsValidPattern] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const passwordValue = watch("password");
  const passwordConfirmValue = watch("passwordConfirm");

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowPasswordConfirm = () =>
    setShowPasswordConfirm((prev) => !prev);

  const validatePassword = (password: string) => {
    const isLengthValid = password.length >= 8 && password.length <= 20;
    const isPatternValid =
      /^(?!.*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣])((?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*\d)(?=.*[\W_])).{8,20}$/.test(
        password,
      );

    setIsValidLength(isLengthValid);
    setIsValidPattern(isPatternValid);

    if (!isLengthValid) {
      setError("password", {
        type: "length",
        message: "8~20자리 비밀번호를 입력하세요.",
      });
    }
    if (!isPatternValid) {
      setError("password", {
        type: "pattern",
        message: "영문/숫자/특수문자 2가지 이상 조합",
      });
    }

    return isLengthValid && isPatternValid;
  };

  const validatePasswordConfirm = (passwordConfirm: string) => {
    if (passwordConfirm !== passwordValue) {
      setError("passwordConfirm", {
        type: "confirm",
        message: "비밀번호가 일치하지 않습니다",
      });
      return false;
    }
    return true;
  };

  const handleSubmitCode = () => {
    if (!validatePasswordConfirm(getValues("passwordConfirm"))) {
      return;
    }

    onComplete();
    //TODO: 로그인 처리
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className={"text-sm leading-[18px] font-medium text-gray-600"}>
          비밀번호
        </div>

        <div className="focus-within:border-primary-400 relative flex h-[50px] shrink grow items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 transition-colors duration-300 focus-within:border-[1px]">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "비밀번호 입력",
              pattern: {
                value: /^(?=(.*[a-zA-Z])?(.*\d)?(.*[\W_])?.*){2,}.*$/,
                message: "영문/숫자/특수문자 2가지 이상 조합",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="비밀번호 입력"
                type={showPassword ? "text" : "password"} 
                maxLength={20}
                className="w-full pr-8 text-gray-800"
                inputMode="text"
                onChange={(e) => {
                  field.onChange(e);
                  validatePassword(e.target.value);
                }}
              />
            )}
          />
          {passwordValue && (
            <Button
              className="absolute right-4 h-6 w-6 !bg-transparent !p-0 text-gray-300 transition"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <div className="flex flex-col justify-center gap-1">
          <div
            className={`flex flex-row items-center gap-1 text-sm leading-[18px] font-medium transition-all duration-300 ease-in-out ${isValidLength ? "text-primary-400" : "text-gray-400"}`}
          >
            <Check
              className={`h-4 w-4 transition-all duration-300 ease-in-out ${isValidLength ? "text-primary-400" : "text-gray-400"}`}
            />
            8-20자
          </div>
          <div
            className={`flex flex-row items-center gap-1 text-sm leading-[18px] font-medium transition-all duration-300 ease-in-out ${isValidPattern ? "text-primary-400" : "text-gray-400"}`}
          >
            <Check
              className={`h-4 w-4 transition-all duration-300 ease-in-out ${isValidPattern ? "text-primary-400" : "text-gray-400"}`}
            />
            영문/숫자/특수문자 2가지 이상 조합
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className={"text-sm leading-[18px] font-medium text-gray-600"}>
          비밀번호 확인
        </div>

        <div className="focus-within:border-primary-400 relative flex h-[50px] shrink grow items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 transition-colors duration-300 focus-within:border-[1px]">
          <Controller
            name="passwordConfirm"
            control={control}
            rules={{
              required: "비밀번호 입력",
              pattern: {
                value: /^(?=(.*[a-zA-Z])?(.*\d)?(.*[\W_])?.*){2,}.*$/,
                message: "영문/숫자/특수문자 2가지 이상 조합",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="비밀번호 입력"
                type={showPasswordConfirm ? "text" : "password"}
                maxLength={20}
                className="w-full pr-8 text-gray-800"
                inputMode="text"
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("passwordConfirm");
                }}
              />
            )}
          />
          {passwordConfirmValue && (
            <Button
              className="absolute right-4 h-6 w-6 !bg-transparent !p-0 text-gray-300 transition"
              onClick={toggleShowPasswordConfirm}
            >
              {showPasswordConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <div className="inline-flex items-center justify-between gap-2 self-stretch">
          <div className="text-right font-['Pretendard'] text-sm leading-[18px] font-medium text-red-400">
            {errors?.passwordConfirm?.message || ""}
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

export default EnterPasswordStep;
