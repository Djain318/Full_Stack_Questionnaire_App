import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoutes.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
