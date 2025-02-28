import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { InviteInfoResponse } from "@/feature/invitation/model/invitationModel";
import { InvitationQueryKeys } from "@/feature/invitation/queryKey";
import { useGqlRequest } from "@/shared/api/queryClient";


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
