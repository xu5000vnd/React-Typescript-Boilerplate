import React from "react";
import { ButtonProps as AntButtonProps } from "antd/es/button";
import ButtonAntd from "antd/es/button";
// import "antd/es/button/style/css";
import "./Button.styles.css";

const Button: React.FC<AntButtonProps> = (props: AntButtonProps) => {
  return <ButtonAntd {...props} />;
};

export default Button;
