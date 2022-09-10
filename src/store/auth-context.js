import { createContext, useCallback, useState } from "react";

const AuthContext = createContext({
  userId: null,
  token: null,
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = currentTime + adjExpirationTime;
  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("userId");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 5000) {
    // if token expired, or remained 5 seconds
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    userId: storedUserId,
    duration: remainingTime,
  };
};

let logoutTimer;

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  let initialUserId;

  if (tokenData) {
    initialToken = tokenData.token;
    initialUserId = tokenData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const userIsLoggendIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback(
    (token, userId, expirationTime) => {
      setToken(token);
      setUserId(userId);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("expirationTime", expirationTime);

      const remainingTime = calculateRemainingTime(expirationTime);

      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [logoutHandler]
  );

  const contextValue = {
    userId: userId,
    token: token,
    isLoggedIn: userIsLoggendIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
