import React from "react";

import DashboardComponent from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<DashboardComponent />} />
      </Routes>
    </>
  );
};

export default App;
