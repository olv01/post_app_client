import { useCallback } from "react";
import { useHttpClient } from "./http-hooks";

const API_AUTH_SIGNIN = process.env.REACT_APP_API_AUTH_SIGNIN;
const API_AUTH_SIGNUP = process.env.REACT_APP_API_AUTH_SIGNUP;
const API_AUTH_CHECK_CHECKUSERNAME =
  process.env.REACT_APP_API_AUTH_CHECKUSERNAME;

const POST_HEADER = { "Content-Type": "application/json; charset=utf-8" };

export const useAuth = () => {
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

  return { signIn, signUp, checkUsername, error, clearError };
};
