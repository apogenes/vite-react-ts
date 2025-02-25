import { useHealthCheckQuery } from "@/src/shared/api/useHealthCheck";
import React from "react";
import { useParams } from "react-router-dom";


const InvitationDetail: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  // const { data } = useGetInvitationDetailQuery(id);

  const { data } = useHealthCheckQuery();
  console.log("//data", data);

  if (!id) {
    return <div>초대장 아이디가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-20 pt-40 pb-24 bg-primary-100">
      <div className="text-lg font-bold text-primary-400">초대장이 도착했어요.</div>
    </div>
  );
};

export default InvitationDetail;