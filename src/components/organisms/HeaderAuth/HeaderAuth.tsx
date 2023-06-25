import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Layout, Menu } from "antd";
import "./HeaderAuth.styles.css";
import { ROUTING } from "../../../constants/system.constant";
import { UserOutlined } from "@ant-design/icons";
import Button from "../../atoms/Button/Button";
import { AuthContext } from "../../../hooks/auth.context";
const { Header } = Layout;

const HeaderAuthMenu: React.FC = () => {
  let pathName = window.location.pathname;
  pathName = pathName.split("/")[1];
  const { user } = useContext(AuthContext);
  const balance = user?.balance || 0;
  const navigate = useNavigate();
  const menu = (
    <Menu theme="light" mode="horizontal" className="header-menu">
      <Menu.Item key="items">
        <Link to={ROUTING.auth.items.list}>My Items</Link>
      </Menu.Item>
      <Menu.Item key="deposite">
        <Link to={ROUTING.auth.credit.deposit}>Deposit</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Button onClick={() => navigate(ROUTING.logout)}>Logout</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header" style={{ background: "#ffffff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[pathName]}
            className="header-menu"
          >
            <Menu.Item key="dashboard">
              <Link to={ROUTING.dashboard}>Dashboard</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <span
            style={{
              marginRight: "10px",
            }}
          >
            Balance: {balance}
          </span>
          <Dropdown overlay={menu} placement="bottomRight">
            <span>
              <UserOutlined />
            </span>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderAuthMenu;
