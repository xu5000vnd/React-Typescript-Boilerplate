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
import { AuthProvider } from "./hooks/auth.context";
import ItemCreatePage from "./components/pages/ItemPage/ItemCreatePage";
import { Modal } from "antd";

const isAuthenticated = () => {
  if (AuthService.checkAuth()) {
    return true;
  }
  return false;
};

const App: React.FC = () => {
  const queryClient = useMemo(() => new QueryClient(), []);
  // const [modal, contextHolder] = Modal.useModal();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {isAuthenticated() ? (
            <DashBoardLayout>
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path={ROUTING.dashboard} element={<DashBoard />} />
                <Route path={ROUTING.auth.items.list} element={<ItemPage />} />
                <Route
                  path={ROUTING.auth.items.create}
                  element={<ItemCreatePage />}
                />
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
          {/* {contextHolder} */}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
