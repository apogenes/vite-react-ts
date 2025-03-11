import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";
import { LoginRequest, LoginResponse } from "./loginModel";

const LOGIN_GQL = gql`
  mutation Login($password: String!, $userId: String!) {
    login(password: $password, userId: $userId)
  }
`;

const mutationLogin = async (params: LoginRequest) => {
  const data = await useGqlRequest<LoginResponse>({
    query: LOGIN_GQL,
    variables: params,
  });
  return data;
};

export const useLoginMutation = (callbacks: {
  onSuccess: (response: LoginResponse) => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: mutationLogin,
    onSuccess,
    onError,
  });
};
