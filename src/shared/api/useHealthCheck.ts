import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { useGqlRequest } from "@/shared/api/queryClient";

const HEALTH_CHECK = gql`
  query ExampleQuery {
    check
  }
`;

const fetchHealthCheck = async () => {
  const data = await useGqlRequest({
    query: HEALTH_CHECK,
  });
  return data;
}

export const useHealthCheckQuery = () => {
  return useQuery({
    queryKey: ['health_check'],
    queryFn: fetchHealthCheck,
  });
};
