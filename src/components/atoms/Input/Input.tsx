import React from "react";
import { Input as AntInput } from "antd";
import { InputProps as AntInputProps } from "antd/es/input";

const Input: React.FC<AntInputProps> = (props) => {
  return <AntInput {...props} />;
};

export default Input;
