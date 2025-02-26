import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";

const POST_ACCEPT_INVITATION = gql`
  mutation Mutation($acceptInviteId: ID!, $token: String!) {
    acceptInvite(id: $acceptInviteId, token: $token) {
      requestId
      requestTime
      smsVerificationId
    }
  }
`;

const fetchAcceptInvitation = async (acceptInviteId: string, token: string) => {
  const data = await useGqlRequest({
    query: POST_ACCEPT_INVITATION,
    variables: { acceptInviteId, token }
  });
  return data;
}

export const useAcceptInvitationQuery = (acceptInviteId: string, token: string) => {
  return useMutation({
    mutationFn: () => fetchAcceptInvitation(acceptInviteId, token),
  });
};
