import React from "react";
import { Form, Modal } from "antd";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword/InputPassword";
import Button from "../../atoms/Button/Button";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import AuthService from "../../../services/auth.service";
import {
  ValidateFormType,
  ValidateFieldType,
} from "../../../common/types/validate.type";
import { useNavigate } from "react-router-dom";
import { ROUTING } from "../../../constants/system.constant";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const data = await AuthService.signup(values.email, values.password);
    if (data) {
      const { error }: { error: string } = data;
      if (error) {
        const message: ValidateFormType = data.message;
        if (message?.length) {
          message.forEach((item: ValidateFieldType) => {
            form.setFields([
              {
                name: item.field,
                errors: [item.error],
              },
            ]);
          });
        }
      } else {
        const message: string = data.message;
        Modal.info({
          title: "Signup Success",
          content: (
            <div>
              <p>{message}</p>
            </div>
          ),
          onOk() {
            navigate(ROUTING.login, {
              replace: true,
            });
          },
          okText: "Login",
        });
      }

      console.log(data);
    }
  };

  return (
    <Form
      id="signup-form"
      onFinish={onFinish}
      style={{
        width: "400px",
      }}
      form={form}
    >
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
        rules={[
          { required: true, message: "Please enter your password" },
          { min: 10, message: "Password must be at least 10 characters" },
          {
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]+$/,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
          },
        ]}
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
