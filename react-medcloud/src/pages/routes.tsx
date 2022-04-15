import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./login.page";
import PatientsPage from "./patients.page";

const RoutesCustom = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="patients/*" element={<PatientsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesCustom;
