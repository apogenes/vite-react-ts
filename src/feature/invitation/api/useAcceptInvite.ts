import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";

interface AcceptInviteResponse {
  acceptInvite: {
    requestId: string;
    requestTime: string;
    smsVerificationId: string;
  };
}

interface AcceptInviteRequest {
  inviteId: string;
  token: string;
}

const ACCEPT_INVITE_GQL = gql`
  mutation AcceptInvite($inviteId: ID!, $token: String!) {
    acceptInvite(inviteId: $inviteId, token: $token) {
      requestId
      requestTime
      smsVerificationId
    }
  }
`;

const mutationAcceptInvite = async (
  params: AcceptInviteRequest,
): Promise<AcceptInviteResponse> => {
  const data = await useGqlRequest<AcceptInviteResponse>({
    query: ACCEPT_INVITE_GQL,
    variables: params,
  });
  return data;
};

export const useAcceptInviteMutation = (callbacks: {
  onSuccess: () => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation<AcceptInviteResponse, Error, AcceptInviteRequest>({
    mutationFn: mutationAcceptInvite,
    onSuccess,
    onError,
  });
};
