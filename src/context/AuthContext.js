import { createContext, useState } from "react";

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const initialToken = sessionStorage.getItem("userInfo");
  const userData = JSON.parse(initialToken);
  const [UserId, setUserId] = useState(userData);

  const userIsLoggedIn = !!UserId;

  const loginHandler = (token) => {
    localStorage.setItem("userInfo", JSON.stringify(token));
  };

  const logOutHandler = () => {
    setUserId(null);
  };

  const contextValue = {
    user: UserId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
