import React from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import InputPassword from "../../atoms/InputPassword/InputPassword";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form } from "antd";

const LoginForm: React.FC = () => {
  const handleSubmit = (values: any) => {
    // Perform login logic using the form values
    console.log(values);
  };

  return (
    <Form id="login-form" onFinish={handleSubmit}>
      <h2>Login</h2>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email format" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Password is required" }]}
      >
        <InputPassword
          prefix={<LockOutlined />}
          placeholder="Enter your password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
