import { getTokenFromCookie } from "./cookie";


type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions extends Omit<RequestInit, 'method' | 'body'> {
  method?: Method;
  data?: Record<string, any>;
  timeout?: number;
}

/**
 * 1. カスタムエラークラスを定義
 * request関数の外（上）に置くことで、どこからでも参照可能にする
 */
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    
    // エラーのスタックトレースを正しく保持（TypeScriptでのお作法）
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}


export const request = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { 
    method = "GET", 
    data, 
    timeout = 8000, 
    headers,
    ...rest 
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const isGet = method === "GET";
    const token = getTokenFromCookie();
    const res = await fetch(`http://localhost:8080/${url}`, {
      ...rest,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        ...headers,
      },
      credentials: "include",
      body: data && !isGet ? JSON.stringify(data) : undefined,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      // ここで class を使って throw する
      throw new ApiError(
        res.status,
        errorBody.message || "API Error",
        errorBody
      );
    }

    if (res.status === 204) return {} as T;
    return await res.json();

  } catch (error: unknown) { // anyからunknownへ変更
    clearTimeout(id);
    
    // タイムアウトエラーの判定
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout: ${url}`);
    }
    
    // すでに ApiError ならそのまま投げる、それ以外なら加工して投げる
    if (error instanceof ApiError) throw error;
    
    throw error;
  }
};

