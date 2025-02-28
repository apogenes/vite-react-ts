import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { DuplicateUserIdRequest, DuplicateUserIdResponse } from "@/feature/signup/model/signupModel";
import { useGqlRequest } from "@/shared/api/queryClient";

const DUPLICATE_USER_ID_GQL = gql`
  query DuplicateUserId($userId: String!) {
    duplicateUserId(userId: $userId)
  }
`;

const mutationDuplicateUserId = async (params: DuplicateUserIdRequest): Promise<DuplicateUserIdResponse> => {
  const data = await useGqlRequest<DuplicateUserIdResponse>({
    query: DUPLICATE_USER_ID_GQL,
    variables: params,
  });
  return data;
};

export const useDuplicateUserIdMutation = (callbacks: {
  onSuccess: (response: DuplicateUserIdResponse) => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation<DuplicateUserIdResponse, Error, DuplicateUserIdRequest>({
    mutationFn: mutationDuplicateUserId,
    onSuccess,
    onError,
  });
};
