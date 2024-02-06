import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {!user && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
      {user && (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      )}
    </>
  );
};

export default App;
