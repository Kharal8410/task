import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
// import UserContextProvider from "./context/userState/UserContext";
import UserState from "./context/userState/UserState";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <UserState>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserState>
    </AuthContext.Provider>
  );
};

export default App;
