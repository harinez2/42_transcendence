import axios from "axios";
import { API_PATH } from "@/config";

const isServer = typeof window === "undefined";

export const api = axios.create({
  baseURL: API_PATH,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers"),
      token = cookies().get("jwt")?.value;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    /* code below doesn't work with http-only cookies */
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

/**
 * Represents the standardized response format from API requests.
 *
 * - In case of a successful response, `success` is `true` and the actual response data
 *   is attached to the `data` property.
 *
 * - In case of a failed response, `success` is `false` and the error message or reason
 *   is attached to the `error` property.
 *
 * @template T The type of the data returned in case of a successful response.
 */
type ResponseType<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

type Method = "get" | "post" | "put" | "delete"; // methods of axios class

/**
 * Make a request to the given endpoint using the specified method and return the standardized result.
 * @param method the HTTP method to use.
 * @param endpoint the API endpoint to hit.
 * @param data (optional) data to send in the request.
 */
export default async function makeAPIRequest<T>(
  method: Method,
  endpoint: string,
  data?: Record<string, unknown>,
): Promise<ResponseType<T>> {
  try {
    const response = await api[method]<T>(endpoint, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    let errorMessage = `An error occurred while making a ${method.toUpperCase()} request to the API`;

    if (axios.isAxiosError(e) && e.response) {
      errorMessage = e.response.data.message || errorMessage;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
