import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// any 타입 미리 만들어줌
type AnyOBJ = { [key: string]: any };

// Create a client
export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client) client = new QueryClient({});
    return client;
  };
})();

// 기본 url
const BASE_URL = "https://fakestoreapi.com";

// async로 요청
export const fetcher = async ({
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
    const url = `${BASE_URL}${path}`;

    // RequestInit은 node에 기본적으로 정의되어 있음
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Contnet-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };

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