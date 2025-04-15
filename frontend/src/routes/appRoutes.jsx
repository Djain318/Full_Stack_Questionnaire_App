// src/routes/appRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserInfoPage from "../components/UserInfoPage";
import QuestionPage from "../components/QuestionPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserInfoPage />} />
      <Route path="/questions" element={<QuestionPage />} />
    </Routes>
  );
};

export default AppRoutes;
