import { useNavigate } from "react-router-dom";

import { magazineData } from "@/entity/magazine";

function Home() {
  const navigate = useNavigate();

  const handleImageClick = (id: number) => {
    navigate(`/magazine/${id}`);
  };

  return (
    <>
      <div className="inline-flex h-14 items-center justify-start gap-[215px] bg-white px-5 py-[18px]">
        <div className="relative justify-start font-['Pretendard'] text-lg leading-normal font-bold text-[#008a94]">
          똑똑사장님
        </div>
      </div>
      <div className="flex h-[1582.75px] flex-col gap-6 px-4 pt-3 pb-12">
        {magazineData.map((item, index) => (
          <div
            key={index}
            className="flex h-[362.69px] cursor-pointer flex-col overflow-hidden rounded-xl border border-[#ebebec] transition-all duration-300 hover:scale-105"
            onClick={() => handleImageClick(item.id)}
          >
            {/* 이미지 영역 */}
            <div className="flex h-[298.69px] items-center justify-center overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={item.src}
                alt="매거진 이미지"
              />
            </div>
            {/* 텍스트 영역 */}
            <div className="flex h-16 items-center bg-white px-4 pt-4 pb-6">
              <div className="font-['Pretendard'] text-lg leading-normal font-bold text-[#43494f]">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
