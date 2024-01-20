import { useState, useCallback, useEffect } from "react";

interface UseDelayedApiCallProps<TParam, TResult> {
  apiCallFunction: (param: TParam) => Promise<TResult>;
  delay: number;
}

interface UseDelayedApiCallResult<TResult> {
  value: TResult | null;
  isLoading: boolean;
  delayedApiCall: (param: TResult) => Promise<void>;
}

const useDelayedApiCall = <TParam, TResult>({ apiCallFunction, delay }: UseDelayedApiCallProps<TParam, TResult>): UseDelayedApiCallResult<TResult> => {
  const [value, setValue] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const delayedApiCall = useCallback(
    async (param: TParam) => {
      setValue(null);
      setIsLoading(true);

      // Introduce a delay before making the actual API call
      await new Promise((resolve) => setTimeout(resolve, delay));

      try {
        const result = await apiCallFunction(param);
        setValue(result);
      } catch (error) {
        console.error("Error in API call:", error);
        setValue(null);
      } finally {
        setIsLoading(false);
      }
    },
    [apiCallFunction, delay]
  );

  return { value, isLoading, delayedApiCall };
};

export default useDelayedApiCall;
