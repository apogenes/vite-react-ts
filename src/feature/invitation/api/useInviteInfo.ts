import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";
import { InvitationQueryKeys } from "../queryKey";

interface InviteInfoResponse {
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
  };
}

// 사용하지 않는 것들은 주석 처리
const INVITE_INFO_GQL = gql`
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

const queryInviteInfo = async (token: string): Promise<InviteInfoResponse> => {
  const data = await useGqlRequest<InviteInfoResponse>({
    query: INVITE_INFO_GQL,
    variables: { token },
  });
  return data;
};

export const useInviteInfoQuery = (token: string) => {
  return useQuery<InviteInfoResponse>({
    queryKey: [InvitationQueryKeys.INVITE_INFO, token],
    queryFn: () => queryInviteInfo(token),
    enabled: !!token,
  });
};
