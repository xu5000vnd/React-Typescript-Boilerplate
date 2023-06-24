import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./HeaderAuth.styles.css";
import { ROUTING } from "../../../constants/system.constant";
const { Header } = Layout;

const HeaderAuthMenu: React.FC = () => {
  let pathName =
    window.location.pathname === "/" ? "dashboard" : window.location.pathname;
  if (pathName !== "dashboard") {
    pathName = pathName.split("/")[1];
  }
  return (
    <Header className="header" style={{ background: "#ffffff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[pathName]}
            className="header-menu"
          >
            <Menu.Item key="dashboard">
              <Link to={ROUTING.dashboard}>Dash Board</Link>
            </Menu.Item>
            <Menu.Item key="items">
              <Link to={ROUTING.auth.items.list}>Items</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Header>
  );
};

export default HeaderAuthMenu;
