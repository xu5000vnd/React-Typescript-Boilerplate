import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import HeaderAuthMenu from "../organisms/HeaderAuth/HeaderAuth";
type DashBoardLayoutProps = {
  children: React.ReactNode;
};
const DashBoardLayout: React.FC<DashBoardLayoutProps> = ({
  children,
}: DashBoardLayoutProps) => {
  if (!AuthService.checkAuth()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="layout">
      <header>
        <HeaderAuthMenu />
      </header>
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default DashBoardLayout;
