import React from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import InputPassword from "../../atoms/InputPassword/InputPassword";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form } from "antd";
import AuthService from "../../../services/auth.service";
import { ROUTING } from "../../../constants/system.constant";
import { setItem } from "../../../utils/storage.util";
import { STORAGE_KEYS } from "../../../constants/storage.constant";

const afterLoginRedirect = (data: any, returnUrl: string) => {
  setItem(STORAGE_KEYS.AUTHENTICATION, data?.accessToken);
  setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(data));
  window.location.href = returnUrl;
};
const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const data = await AuthService.login(values.email, values.password);
    const { error, message } = data;
    if (error) {
      form.setFields([
        {
          name: "password",
          errors: [message],
        },
      ]);
    }

    if (data?.accessToken) {
      let returnUrl = ROUTING.dashboard;
      const queryUrl = window.location.search;
      if (queryUrl) {
        const queryObject: URLSearchParams = new URLSearchParams(queryUrl);
        if (queryObject.get("return-url")) {
          returnUrl = decodeURIComponent(
            queryObject.get("return-url") as string
          );
        }
      }
      afterLoginRedirect(data, returnUrl);
    }
  };

  return (
    <Form
      id="login-form"
      onFinish={handleSubmit}
      style={{
        width: "400px",
      }}
      form={form}
    >
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
