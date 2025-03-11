import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { MeResponse } from "@/feature/login/model/loginModel";
import { LoginQueryKeys } from "@/feature/login/queryKey";
import { useGqlRequest } from "@/shared/api/queryClient";

const ME_GQL = gql`
  query Query {
    me {
      birthDate
      brandId
      cellPhone
      circleId
      connectedAt
      deletedAt
      gender
      id
      isActive
      isMarketingAgreed
      lastSessionAt
      marketingAgreedAt
      metadata
      name
      password
      refreshToken
      registrationNumber
      roles
      status
      storeId
      storeName
      userId
    }
  }
`;

const queryMe = async (): Promise<MeResponse> => {
  const data = await useGqlRequest<MeResponse>({
    query: ME_GQL,
  });
  return data;
};

export const useMeQuery = () => {
  return useQuery<MeResponse>({
    queryKey: [LoginQueryKeys.ME],
    queryFn: queryMe,
  });
};
