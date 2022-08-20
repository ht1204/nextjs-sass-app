import axios from 'axios';


export interface APIPost<R, P> {
  response?: R
  error?: HttpError
  posting: boolean
  posted: boolean
  lastPosted: P
  post: (data?: P, headers?: any) => void
  reset: () => void
}

export class HttpError extends Error {
  code: number
  payload?: any

  // @ts-ignore
  constructor(code: number, payload?: any) {
    super()
    this.name = 'HttpError';
    this.code = code;
    this.payload = payload;
  }
}



export type Fetcher<R> = (path: string) => Promise<R>;

export function secureLoader<R>(apiUrl?: string, getToken?: () => Promise<string>): Fetcher<R> {
  return async (path: string): Promise<R> => {
    const token = getToken ? await getToken() : null;
    const response = await axios.get<R>(`${apiUrl || ''}${path}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })
    return response.data;
  }
}
