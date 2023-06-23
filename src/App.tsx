import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/templates/HomeLayout";
import DashBoard from "./components/pages/DashBoard/DashBoard";
import Home from "./components/pages/Home/Home";
import DashBoardLayout from "./components/templates/DashBoardLayout";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import "./styles/global.css";
import SignupPage from "./components/pages/SignupPage/SignupPage";

const isAuthenticated = () => {
  // Implement your authentication logic here
  // Return true if authenticated, false otherwise
  // You can use cookies, JWT, or any other authentication mechanism
  return false;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {isAuthenticated() ? (
        <DashBoardLayout>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </DashBoardLayout>
      ) : (
        <HomeLayout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<Home />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </HomeLayout>
      )}
    </BrowserRouter>
  );
};

export default App;
