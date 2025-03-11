import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";

export const LOGOUT_GQL = gql`
  mutation Logout {
    logout
  }
`;

const mutationLogout = async () => {
  const data = await useGqlRequest({
    query: LOGOUT_GQL,
  });
  return data;
};

export const useLogoutMutation = (callbacks: {
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation({
    mutationFn: mutationLogout,
    onSuccess,
    onError,
  });
};
