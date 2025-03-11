import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import LoginForm from "@/widget/login/ui/LoginForm";
import { useLoginCallback } from "@/feature/login/hook/useLoginHook";
import { useLoginMutation } from "@/feature/login/model/useLogin";


export default function Login() {
  const navigate = useNavigate();
  
  const onCompleteLogin = () => {
    toast.success("로그인 성공");
    navigate("/");
  };
  const { onSuccess: onSuccessLogin, onError: onErrorLogin } = useLoginCallback({ onComplete: onCompleteLogin });
  const { mutate: login } = useLoginMutation({
    onSuccess: onSuccessLogin,
    onError: onErrorLogin,
  });

  const handleSubmit = (id: string, password: string) => {
    login({
      userId: id,
      password: password,
    });
  };

  return (
    <div className="flex flex-col self-stretch px-4 pb-30">
      <div className="inline-flex h-[60px] items-center gap-2 self-stretch">
        <div className="font-['Pretendard'] text-xl leading-normal font-medium text-[#43494f]">
          가맹점 연결
        </div>
      </div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}
