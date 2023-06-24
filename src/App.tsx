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
import { ROUTING } from "./constants/system.constant";
import AuthService from "./services/auth.service";

const isAuthenticated = () => {
  if (AuthService.checkAuth()) {
    return true;
  }
  return false;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {isAuthenticated() ? (
        <DashBoardLayout>
          <Routes>
            <Route path={ROUTING.dashboard} element={<DashBoard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </DashBoardLayout>
      ) : (
        <HomeLayout>
          <Routes>
            <Route path={ROUTING.login} element={<LoginPage />} />
            <Route path={ROUTING.signup} element={<SignupPage />} />
            <Route path={ROUTING.home} element={<Home />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HomeLayout>
      )}
    </BrowserRouter>
  );
};

export default App;
