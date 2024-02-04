import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import AuthContext from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { User } = useContext(AuthContext);
  return (
    <>
      {!User && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
      {User && (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      )}
    </>
  );
};

export default App;
