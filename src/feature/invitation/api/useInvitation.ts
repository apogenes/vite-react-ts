import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";
import { InvitationQueryKeys } from "../queryKey";

const GET_INVITATION_DETAIL = gql`
  query GetInvitationDetail($id: String!) {
    getInvitationDetail(id: $id) {
      id
      name
      email
    }
  }
`;

const fetchInvitationDetail = async (id: string) => {
  const data = await useGqlRequest({
    query: GET_INVITATION_DETAIL,
    variables: { id }
  });
  return data;
}

export const useGetInvitationDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [InvitationQueryKeys.INVITATION, id],
    queryFn: () => fetchInvitationDetail(id),
  });
};
