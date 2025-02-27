import LoadingSpinner from "@/shared/component/LoadingSpinner";
import { Skeleton } from "@/shared/ui/skeleton";

const InvitationSkeleton = () => {
  return (
    <div className="flex flex-col h-screen relative">
      {/* 상단 로고 및 이미지 */}
      <div className="bg-primary-100 flex flex-col items-center justify-center gap-4 pt-10 pb-6">
        <Skeleton className="h-5 w-20" /> {/* 서비스명 */}
        <Skeleton className="h-20 w-20 rounded-md" /> {/* 초대장 이미지 */}
        <Skeleton className="h-6 w-40" /> {/* 초대장이 도착했어요 */}
      </div>

      {/* 초대 정보 */}
      <div className="flex flex-col gap-6 pt-6 pr-4 pb-6 pl-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-60" /> {/* 초대 설명 */}
          <div className="border-gray-150 inline-flex h-16 items-center justify-center gap-2 rounded-[10px] border bg-gray-100 p-3">
            <Skeleton className="h-10 w-10 rounded-lg" /> {/* 가게 아이콘 */}
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3 w-20" /> {/* 가게명 */}
              <Skeleton className="h-4 w-32" /> {/* 지점명 */}
            </div>
          </div>
        </div>

        {/* 초대 받는 사람 정보 */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-40" /> {/* 초대 받는 분 */}
          <div className="flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" /> {/* 라벨 */}
                <Skeleton className="h-4 flex-1" /> {/* 값 */}
              </div>
            ))}
          </div>
        </div>

        {/* 초대 수락 버튼 */}
        <Skeleton className="h-[50px] w-full rounded-[10px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default InvitationSkeleton;