import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import useLoading from './useLoading';
import { APIPost, HttpError } from '../../api';

const useAPIPost = <R, P>(
    endpoint: string,
    getToken?: () => Promise<string>
  ): APIPost<R, P> => {

    const [response, setResponse] = useState<R>();
    const [error, setError] = useState<HttpError>();
    const [posted, setPosted] = useState(false);
    const [lastPosted, setLastPosted] = useState<P>(null);
  
    const [posting, loadingPost] = useLoading();
  
    const handleError = (error: AxiosError): void => {
      setResponse(null);
      const { response, message } = error;

      if (response) {
        const { data } = response;
        setError(new HttpError(response.status, data));
      } else {
        setError(new HttpError(500, { error: message }));
      }
    }
  
    const post = async (data?: P, headers?: any): Promise<void> => {
      try {
        setLastPosted(data);
        const token = getToken ? await getToken() : null;
        const response = await loadingPost(
          axios.post<R>(endpoint, data, {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers
          })
        )
  
        setResponse(response.data);
        setError(null);
        setPosted(true);
      } catch (error) {
        handleError(error);
      }
    }
  
    const reset = (): void => {
      setLastPosted(null);
      setResponse(undefined);
      setError(undefined);
      setPosted(false);
    }
  
    return {
      posted,
      response,
      error,
      posting,
      lastPosted,
      post,
      reset
    }
  }


export default useAPIPost;
