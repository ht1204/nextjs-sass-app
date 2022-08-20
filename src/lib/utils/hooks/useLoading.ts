import { useEffect, useState, useRef } from 'react';

const useLoading = (): [boolean, (aPromise: Promise<any>) => any] => {

    const [isLoading, setState] = useState<boolean>(false);
    const mount = useRef(false);
  
    useEffect(() => {
      mount.current = true
      return () => {
        mount.current = false
      }
    }, []);
  
    const load = async (aPromise: Promise<any>): Promise<any> => {
      setState(true)
      return await aPromise.finally(() => {
        if (mount.current) {
          setState(false)
        }
      })
    }
    return [isLoading, load];
  }

  export default useLoading;