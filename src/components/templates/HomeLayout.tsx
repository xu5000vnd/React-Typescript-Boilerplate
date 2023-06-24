import React from "react";
import HeaderMenu from "../organisms/Header/Header";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
type HomeLayoutProps = {
  children: React.ReactNode;
};
const HomeLayout: React.FC<HomeLayoutProps> = ({
  children,
}: HomeLayoutProps) => {
  if (AuthService.checkAuth()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout">
      <HeaderMenu />
      <Content style={{ padding: "0 50px" }} className="layout-content">
        {children}
      </Content>
    </Layout>
  );
};

export default HomeLayout;
