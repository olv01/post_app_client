import { useCallback } from "react";
import { useHttpClient } from "./http-hooks";

const API_AUTH_SIGNIN = process.env.REACT_APP_API_AUTH_SIGNIN;
const API_AUTH_SIGNUP = process.env.REACT_APP_API_AUTH_SIGNUP;
const API_AUTH_CHECK_CHECKUSERNAME =
  process.env.REACT_APP_API_AUTH_CHECKUSERNAME;

const POST_HEADER = { "Content-Type": "application/json; charset=utf-8" };

export const useSingIn = () => {
  const { error, sendRequest, clearError } = useHttpClient();

  const signIn = useCallback(
    async (data) => {
      try {
        const responseData = await sendRequest(
          API_AUTH_SIGNIN,
          "POST",
          data,
          POST_HEADER
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  return { error, signIn, clearError };
};

export const useSingUp = () => {
  const { error, sendRequest, clearError } = useHttpClient();

  const signUp = useCallback(
    async (data) => {
      try {
        const responseData = await sendRequest(
          API_AUTH_SIGNUP,
          "POST",
          data,
          POST_HEADER
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  return { error, signUp, clearError };
};

export const useCheckUsername = () => {
  const { error, sendRequest, clearError } = useHttpClient();

  const checkUsername = useCallback(
    async (data) => {
      try {
        const responseData = await sendRequest(
          API_AUTH_CHECK_CHECKUSERNAME,
          "POST",
          data,
          POST_HEADER
        );
        return responseData;
      } catch (err) {}
    },
    [sendRequest]
  );

  return { error, checkUsername, clearError };
};
