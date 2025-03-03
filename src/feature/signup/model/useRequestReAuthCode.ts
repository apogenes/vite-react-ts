import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { RequestReAuthCodeRequest, RequestReAuthCodeResponse } from "@/feature/signup/model/signupModel";
import { useGqlRequest } from "@/shared/api/queryClient";

const REQUEST_RE_AUTH_CODE_GQL = gql`
  mutation RequestReAuthCode($inviteId: ID!, $token: String!) {
    requestReAuthCode(inviteId: $inviteId, token: $token) {
      requestId
      requestTime
      smsVerificationId
    }
  }
`;

const mutationRequestReAuthCode = async (
  params: RequestReAuthCodeRequest,
): Promise<RequestReAuthCodeResponse> => {
  const data = await useGqlRequest<RequestReAuthCodeResponse>({
    query: REQUEST_RE_AUTH_CODE_GQL,
    variables: params,
  });
  return data;
};

export const useRequestReAuthCodeMutation = (callbacks: {
  onSuccess: (response: RequestReAuthCodeResponse) => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation<RequestReAuthCodeResponse, Error, RequestReAuthCodeRequest>({
    mutationFn: mutationRequestReAuthCode,
    onSuccess,
    onError,
  });
};
