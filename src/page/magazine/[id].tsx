import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import { magazineData } from "@/entity/magazine";

const MagazineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [htmlContent, setHtmlContent] = useState("");

  // 현재 선택된 매거진 데이터 찾기
  const item = magazineData.find((magazine) => magazine.id === Number(id));

  // 뒤로 가기 핸들러
  const handleBack = () => navigate("/");

  useEffect(() => {
    if (item?.html) {
      fetch(item.html)
        .then((res) => res.text())
        .then(setHtmlContent)
        .catch((err) => console.error("Failed to load HTML:", err));
    }
  }, [item?.html]);

  return (
    <>
      {/* 헤더 영역 */}
      <div className="inline-flex h-14 items-center justify-start bg-white px-5 py-[18px]">
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-100"
          onClick={handleBack}
        >
          <ChevronLeft />
        </div>
      </div>

      {/* 이미지 영역 */}
      {item?.src && (
        <div className="relative h-[250.44px] overflow-hidden">
          <img
            src={item.src}
            alt="매거진 이미지"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* 타이틀 및 날짜 영역 */}
      <div className="flex h-[162px] flex-col gap-6 px-4 pt-6 pb-8">
        <div className="flex h-16 flex-col items-start justify-start gap-2.5">
          <div className="relative justify-center font-['Pretendard'] text-2xl font-bold text-[#43494f]">
            {item?.title}
          </div>
        </div>
        <div className="text-sm font-medium text-[#abaeb1]">{item?.date}</div>
      </div>

      {/* HTML 콘텐츠 렌더링 영역 */}
      <div className="flex flex-col items-center px-4 pb-20">
        <div
          className="w-full overflow-auto"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </>
  );
};

export default MagazineDetail;
