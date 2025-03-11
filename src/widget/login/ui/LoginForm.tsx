import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Eye, EyeOff, XCircle } from "lucide-react";

type FormValues = {
  id: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (id: string, password: string) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { control, setValue, watch } = useForm<FormValues>({
    defaultValues: { id: "", password: "" },
  });

  const idValue = watch("id");
  const passwordValue = watch("password");

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col gap-6 self-stretch">
      <div className="font-['Pretendard'] text-sm leading-[18px] font-medium text-[#6d7176]">
        가맹점을 연결하기 위해 로그인을 진행해 주세요
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className={"text-sm leading-[18px] font-medium text-gray-600"}>
            아이디
          </div>

          <div className="focus-within:border-primary-400 relative flex h-[50px] shrink grow items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 transition-colors duration-300 focus-within:border-[1px]">
            <Controller
              name="id"
              control={control}
              rules={{
                required: "아이디 입력",
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message: "영문 소문자와 숫자만 입력 가능합니다.",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="아이디 입력"
                  maxLength={12}
                  className="w-full pr-8 text-gray-800"
                  inputMode="text"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            {idValue && (
              <Button
                className="absolute right-4 h-6 w-6 !bg-transparent !p-0 text-gray-300 transition"
                onClick={() => setValue("id", "")}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

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
        </div>
      </div>

      <Button
        className="!bg-primary-300 h-[50px] rounded-[10px] px-4 text-base leading-tight font-bold text-white"
        onClick={() => onSubmit(idValue, passwordValue)}
      >
        로그인
      </Button>
    </div>
  );
};

export default LoginForm;
