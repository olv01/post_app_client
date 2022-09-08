import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useCustomSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPartialParam = useCallback(
    (newParams) => {
      let params = {};

      for (let entry of searchParams.entries()) {
        params[entry[0]] = entry[1];
      }

      params = { ...params, ...newParams };
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return { searchParams, setPartialParam };
};
