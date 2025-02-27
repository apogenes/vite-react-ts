import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";
import { InvitationQueryKeys } from "../queryKey";

interface InvitationDetail {
  inviteInfo: {
    _id: string;
    // brandId: string;
    cellPhone: string;
    // circleId: string;
    gender: string;
    inviteToken: string;
    // invitedAt: string;
    // registrationNumber: string;
    // status: string;
    // storeId: string;
    storeName: string;
    brandName: string;
    age: string;
    maskedName: string;
    maskedBirthDate: string;
    brandLogoUrl: string;
  }
}

// 사용하지 않는 것들은 주석 처리
const GET_INVITATION_DETAIL = gql`
  query InviteInfo($token: String!) {
    inviteInfo(token: $token) {
      _id
      # brandId
      cellPhone
      # circleId
      gender
      inviteToken
      # invitedAt
      # registrationNumber
      # status
      # storeId
      storeName
      brandName
      age
      maskedName
      maskedBirthDate
      brandLogoUrl
    }
  }
`;

const fetchInvitationDetail = async (token: string): Promise<InvitationDetail> => {
  const data = await useGqlRequest<InvitationDetail>({
    query: GET_INVITATION_DETAIL,
    variables: { token }
  });
  return data;
}

export const useGetInvitationDetailQuery = (token: string) => {
  return useQuery<InvitationDetail>({
    queryKey: [InvitationQueryKeys.INVITATION_DETAIL, token],
    queryFn: () => fetchInvitationDetail(token),
    enabled: !!token,
  });
};
