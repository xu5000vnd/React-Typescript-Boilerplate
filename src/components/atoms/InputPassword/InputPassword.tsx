import React from "react";
import { Input as AntInput } from "antd";
import { InputProps as AntInputProps } from "antd/es/input";

const InputPassword: React.FC<AntInputProps> = (props) => {
  return <AntInput.Password {...props} />;
};

export default InputPassword;
