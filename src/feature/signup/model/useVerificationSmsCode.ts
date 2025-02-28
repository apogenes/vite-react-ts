import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { VerificationSmsCodeRequest, VerificationSmsCodeResponse } from "@/feature/signup/model/signupModel";
import { useGqlRequest } from "@/shared/api/queryClient";

const VERIFICATION_SMS_CODE_GQL = gql`
  mutation VerificationSmsCode($code: String!, $smsVerificationId: ID!) {
    verificationSmsCode(code: $code, smsVerificationId: $smsVerificationId) {
      code
      message
      success
    }
  }
`;

const mutationVerificationSmsCode = async (
  params: VerificationSmsCodeRequest,
): Promise<VerificationSmsCodeResponse> => {
  const data = await useGqlRequest<VerificationSmsCodeResponse>({
    query: VERIFICATION_SMS_CODE_GQL,
    variables: params,
  });
  return data;
};

export const useVerificationSmsCodeMutation = (callbacks: {
  onSuccess: (response: VerificationSmsCodeResponse) => void;
  onError: (error: any) => void;
}) => {
  const { onSuccess, onError } = callbacks;

  return useMutation<VerificationSmsCodeResponse, Error, VerificationSmsCodeRequest>({
    mutationFn: mutationVerificationSmsCode,
    onSuccess,
    onError,
  });
};
