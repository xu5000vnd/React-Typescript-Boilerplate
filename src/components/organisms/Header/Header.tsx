import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./Header.styles.css";
const { Header } = Layout;

const HeaderMenu: React.FC = () => {
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
            defaultSelectedKeys={["home"]}
            className="header-menu"
          >
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/signup">SignUp</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Header>
  );
};

export default HeaderMenu;
