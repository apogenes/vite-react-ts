import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { JoinRequest, JoinResponse } from "@/feature/signup/model/signupModel";
import { useGqlRequest } from "@/shared/api/queryClient";

const JOIN_GQL = gql`
  mutation Join($inviteId: String!, $inviteToken: String!, $password: String!, $userId: String!, $isMarketingAgreed: Boolean) {
    join(inviteId: $inviteId, inviteToken: $inviteToken, password: $password, userId: $userId, isMarketingAgreed: $isMarketingAgreed) {
      code
      message
      success
    }
  }
`;

const mutationJoin = async (
  params: JoinRequest,
): Promise<JoinResponse> => {
  const data = await useGqlRequest<JoinResponse>({
    query: JOIN_GQL,
    variables: params,
  });
  return data;
};

export const useJoinMutation = (callbacks: {
  onSuccess: (response: JoinResponse) => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation<JoinResponse, Error, JoinRequest>({
    mutationFn: mutationJoin,
    onSuccess,
    onError,
  });
};
