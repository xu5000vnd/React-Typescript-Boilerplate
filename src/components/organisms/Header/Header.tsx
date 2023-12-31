import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./Header.styles.css";
import { ROUTING } from "../../../constants/system.constant";
const { Header } = Layout;

const HeaderMenu: React.FC = () => {
  let pathName =
    window.location.pathname === "/" ? "home" : window.location.pathname;
  if (pathName !== "home") {
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
            <Menu.Item key="home">
              <Link to={ROUTING.home}>Home</Link>
            </Menu.Item>
            <Menu.Item key="login">
              <Link to={ROUTING.login}>Login</Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to={ROUTING.signup}>SignUp</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Header>
  );
};

export default HeaderMenu;
