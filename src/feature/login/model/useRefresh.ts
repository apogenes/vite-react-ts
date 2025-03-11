import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";

export const REFRESH_GQL = gql`
  mutation Refresh {
    refresh
  }
`;

const mutationRefresh = async () => {
  const data = await useGqlRequest({
    query: REFRESH_GQL,
  });
  return data;
};

export const useRefreshMutation = (callbacks: {
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation({
    mutationFn: mutationRefresh,
    onSuccess,
    onError,
  });
};
