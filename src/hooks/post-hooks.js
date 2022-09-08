import { useCallback } from "react";
import { useHttpClient } from "./http-hooks";

const API_POSTS_LIST = process.env.REACT_APP_API_POSTS_LIST;

export const usePostList = () => {
  const { error, sendRequest, clearError } = useHttpClient();

  const getPostList = useCallback(
    async (pageNumber = 1, pageSize = 20) => {
      try {
        const responseData = await sendRequest(
          API_POSTS_LIST + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  return { error, getPostList, clearError };
};
