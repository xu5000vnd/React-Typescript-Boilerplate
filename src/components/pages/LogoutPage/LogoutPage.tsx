import React from "react";
import { ROUTING } from "../../../constants/system.constant";
import AuthService from "../../../services/auth.service";

const LogoutPage: React.FC = () => {
  AuthService.logout();
  window.location.href = ROUTING.login;
  return <></>;
};

export default LogoutPage;
