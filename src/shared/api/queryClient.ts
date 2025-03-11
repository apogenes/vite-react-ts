import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { GraphQLErrorExtensions } from "graphql";
import { ClientError, GraphQLClient, RequestDocument } from "graphql-request";

// any 타입 미리 만들어줌
type AnyOBJ = { [key: string]: any };

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_ENDPOINT;

// Create a client
export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

// const gqlClient = new GraphQLClient(`${API_URL}/graphql`, {
//   // headers: {
//   //   authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
//   // }
//   // credentials: "include",
// });
const gqlClient = new GraphQLClient(`${API_URL}/graphql`);

interface IRequestOptions {
  query: RequestDocument;
  variables?: any;
  requestHeaders?: HeadersInit;
}

interface ErrorExtensions extends GraphQLErrorExtensions {
  code: number;
  timestamp: number;
  extra: any;
  stacktrace: string[];
}

export const getGqlErrorDetailData = (error: ClientError | any) => {
  return (error as ClientError)?.response?.errors?.[0]
    ?.extensions as ErrorExtensions;
};

const useErrorHandler = () => {
  const errorHandler = async (error: ClientError) => {
    const extensions = getGqlErrorDetailData(error);
    console.log("//extensions", extensions);
    if (extensions?.code === 401) {
      switch (extensions.extra?.code) {
        case -1: // 토큰 만료
          try {
            console.log("//catch -1");
            // const data: any = await gqlClient.request(REFRESH_TOKEN);

            // if (data?.refresh) {
            //   // 토큰 갱신 후 실패한 요청 재시도
            //   extensions.extra.retry = true;
            //   // eslint-disable-next-line no-throw-literal
            //   throw {
            //     response: {
            //       errors: [extensions],
            //     },
            //   };
            // } else {
            //   await logout();
            // }
          } catch (e) {
            // 재시도 강제 exception 아닌 경우 에러처리
            // if (!extensions.extra.retry) {
            //   const retryExtention = getGqlErrorDetailData(e);
            //   console.log(e, retryExtention);
            //   if (retryExtention?.code === 401) {
            //     clearSession();
            //   }
            // }
            console.log("//catch -1 e", e);
          }
          break;
        case -2: // 유저 정보 없음
        case -3: // 토큰정보 변경 (패스워드 변경, 서버에서 강제 세션 종료)
          // if (extensions.extra.code === -3) {
          //   // 동시로그인 허용을 하지 않기 때문에 패스워드 변경 에러 이전에 중복로그인 에러가 먼저 발생할 것이므로 무조건 동시로그인 에러로 처리함.
          //   setSessionErrorModal(SessionErrorType.duplicated);
          // }
          // clearSession();
          console.log("//catch -2");
          break;
      }
    }

    throw error;
  };
  return errorHandler;
};

export const useGqlRequest = <T>({
  query,
  variables,
  requestHeaders,
}: IRequestOptions): Promise<T> => {
  const errorHandler = useErrorHandler();
  const client = new GraphQLClient(`${API_URL}/graphql`, {
    credentials: "include",
  });
  return client
    .request<T>(query, variables, requestHeaders)
    .catch(errorHandler);
};

// 기본 url
const BASE_URL = "https://fakestoreapi.com";

// async로 요청
export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  // 메소드 타입 정의
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  // url대신 path를 받음
  path: string;

  // post나 put의 경우엔 body가 필요하므로
  body?: AnyOBJ;

  // 파라미터
  params?: AnyOBJ;
}) => {
  try {
    // 기본 url + path
    let url = `${BASE_URL}${path}`;

    // RequestInit은 node에 기본적으로 정의되어 있음
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Contnet-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };

    // param이 오면
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += "?" + searchParams.toString();
    }

    // body가 오면
    if (body) fetchOptions.body = JSON.stringify(body);

    // url와 옵션들 요청
    // 메서드와 path를 받아서 완성
    const res = await fetch(url, fetchOptions);

    // 받은 것을 json으로 바꾸기
    const json = await res.json();
    return json;

    // 에러 출력
  } catch (err) {
    console.error(err);
  }
};

// 쿼리 키 만들기
export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
};
