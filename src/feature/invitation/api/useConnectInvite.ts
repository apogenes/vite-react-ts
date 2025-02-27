import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";

interface ConnectInviteResponse {
  connectInvite: {
    code: number;
    message: string;
    success: boolean;
  };
}

interface ConnectInviteRequest {
  inviteId: string;
  token: string;
}

const CONNECT_INVITE_GQL = gql`
  mutation ConnectInvite($inviteId: ID!, $token: String!) {
    connectInvite(inviteId: $inviteId, token: $token) {
      code
      message
      success
    }
  }
`;

const mutationConnectInvite = async (
  params: ConnectInviteRequest,
): Promise<ConnectInviteResponse> => {
  const data = await useGqlRequest<ConnectInviteResponse>({
    query: CONNECT_INVITE_GQL,
    variables: params,
  });
  return data;
};

export const useConnectInviteMutation = (callbacks: {
  onSuccess: () => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation<ConnectInviteResponse, Error, ConnectInviteRequest>({
    mutationFn: mutationConnectInvite,
    onSuccess,
    onError,
  });
};
