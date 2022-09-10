import { useCallback } from "react";
import { useHttpClient } from "./http-hooks";
import { format } from "react-string-format";

const API_POST = process.env.REACT_APP_API_POST;
const API_POSTS_LIST = process.env.REACT_APP_API_POSTS_LIST;
const API_POSTS_CREATE = process.env.REACT_APP_API_POSTS_CREATE;
const API_POSTS_SEARCH = process.env.REACT_APP_API_POSTS_SEARCH;

const POST_HEADER = { "Content-Type": "application/json; charset=utf-8" };

export const usePost = () => {
  const { error, sendRequest, clearError } = useHttpClient();

  const getPost = useCallback(
    async (postNumber) => {
      try {
        const responseData = await sendRequest(format(API_POST, postNumber));
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  const createPost = useCallback(
    async (data, token) => {
      try {
        POST_HEADER["Authorization"] = `Bearer ${token}`;
        const responseData = await sendRequest(
          format(API_POSTS_CREATE),
          "POST",
          data,
          POST_HEADER
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  const updatePost = useCallback(
    async (postNumber, data, token) => {
      POST_HEADER["Authorization"] = `Bearer ${token}`;
      try {
        const responseData = await sendRequest(
          format(API_POST, postNumber),
          "PATCH",
          data,
          POST_HEADER
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  const deletePost = useCallback(
    async (postNumber, token) => {
      POST_HEADER["Authorization"] = `Bearer ${token}`;
      try {
        const responseData = await sendRequest(
          format(API_POST, postNumber),
          "DELETE",
          null,
          POST_HEADER
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  const getPostList = useCallback(
    async (pageNumber = 1, pageSize = 20) => {
      try {
        const responseData = await sendRequest(
          format(API_POSTS_LIST, pageNumber, pageSize)
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  const searchPostList = useCallback(
    async (searchQuery, category, pageNumber = 1, pageSize = 20) => {
      try {
        const responseData = await sendRequest(
          format(API_POSTS_SEARCH, searchQuery, category, pageNumber, pageSize)
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  return {
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostList,
    searchPostList,
    error,
    clearError,
  };
};
