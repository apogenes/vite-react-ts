import { Loader2 } from "lucide-react"; // lucide-react 아이콘 라이브러리 사용

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
    </div>
  );
};

export default LoadingSpinner;