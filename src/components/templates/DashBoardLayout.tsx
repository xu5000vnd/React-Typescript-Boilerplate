import { Header } from "antd/es/layout/layout";
import React from "react";
type DashBoardLayoutProps = {
  children: React.ReactNode;
};
const DashBoardLayout: React.FC<DashBoardLayoutProps> = ({
  children,
}: DashBoardLayoutProps) => {
  return (
    <div className="layout">
      <header>
        <Header />
      </header>
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default DashBoardLayout;
