import React from "react";
import { Form } from "antd";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword/InputPassword";
import Button from "../../atoms/Button/Button";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const SignupForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values:", values);
    // Handle form submission
  };

  return (
    <Form id="signup-form" onFinish={onFinish}>
      <h2>Signup</h2>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Invalid email address" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <InputPassword prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Passwords do not match");
            },
          }),
        ]}
      >
        <InputPassword
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
