import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
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
import LogoutPage from "./components/pages/LogoutPage/LogoutPage";
import ItemPage from "./components/pages/ItemPage/ItemPage";
import CreditPage from "./components/pages/CreditPage/CreditPage";

const isAuthenticated = () => {
  if (AuthService.checkAuth()) {
    return true;
  }
  return false;
};

const App: React.FC = () => {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {isAuthenticated() ? (
          <DashBoardLayout>
            <Routes>
              <Route path={ROUTING.dashboard} element={<DashBoard />} />
              <Route path={ROUTING.auth.items.list} element={<ItemPage />} />
              <Route
                path={ROUTING.auth.credit.deposit}
                element={<CreditPage />}
              />
              <Route path={ROUTING.logout} element={<LogoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DashBoardLayout>
        ) : (
          <HomeLayout>
            <Routes>
              <Route path={ROUTING.login} element={<LoginPage />} />
              <Route path={ROUTING.signup} element={<SignupPage />} />
              <Route path={ROUTING.logout} element={<LogoutPage />} />
              <Route path={ROUTING.home} element={<Home />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HomeLayout>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
