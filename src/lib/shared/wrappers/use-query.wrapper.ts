import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URI = "http://localhost:3047/v1";
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}
export type KeyValAny = {
  [x: string]: any;
};
export type UseQueryWrapperType = {
  path: string;
  method?: HttpMethod;
  config?: KeyValAny;
  body?: KeyValAny;
  headers: KeyValAny;
};

export async function useApiWrapper(
  path: string,
  body: KeyValAny,
  method: HttpMethod,
  query?: KeyValAny,
  header?: KeyValAny
) {
  const token = Cookies.get("token");
  const url = `${API_BASE_URI}/${path}`;
  const { data } = await axios(url, {
    data: body,
    params: query,
    method,
    headers: {
      ...header,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "access-control-allow-origin": "*",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return data;
}
// export function useQueryWrapper(input: UseQueryWrapperType) {
//   const {
//     path,
//     method = HttpMethod.GET,
//     config,
//     body = {},
//     headers = {},
//   } = input;
//   const defaultConfig = { staleTime: 100000, cacheTime: 5000, ...config };
//   const url = `${API_BASE_URI}/${path}`;
//   if (method === HttpMethod.GET) {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     return useQuery(
//       path,
//       async () => {
//         // eslint-disable-next-line react-hooks/rules-of-hooks
//         return useApiWrapper(url, body, headers);
//       },
//       defaultConfig
//     );
//   }
//   if (method === HttpMethod.POST) {
//   }
// }
