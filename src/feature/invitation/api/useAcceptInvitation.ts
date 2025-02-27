import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";

interface AcceptInvitationResponse {
  acceptInvite: {
    requestId: string;
    requestTime: string;
    smsVerificationId: string;
  }
}

interface AcceptInvitationParams {
  inviteId: string;
  token: string;
}

const POST_ACCEPT_INVITATION = gql`
  mutation AcceptInvite($inviteId: ID!, $token: String!) {
    acceptInvite(inviteId: $inviteId, token: $token) {
      requestId
      requestTime
      smsVerificationId
    }
  }
`;

const fetchAcceptInvitation = async (params: AcceptInvitationParams): Promise<AcceptInvitationResponse> => {
  const data = await useGqlRequest<AcceptInvitationResponse>({
    query: POST_ACCEPT_INVITATION,
    variables: params
  });
  return data;
}

export const useAcceptInvitationMutation = (callbacks: { onSuccess: () => void; onError: (error: any) => void }) => {
  const { onSuccess, onError } = callbacks;

  return useMutation<AcceptInvitationResponse, Error, AcceptInvitationParams>({
    mutationFn: fetchAcceptInvitation,
    onSuccess,
    onError,
  });
};
