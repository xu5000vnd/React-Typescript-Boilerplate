import React, { useContext } from "react";
import Button from "../../atoms/Button/Button";
import { Form, Modal, InputNumber } from "antd";
import CreditService from "../../../services/credit.service";
import UserService from "../../../services/user.service";
import { AuthContext } from "../../../hooks/auth.context";
import {
  ValidateFieldType,
  ValidateFormType,
} from "../../../common/types/validate.type";

const DepositForm: React.FC = () => {
  const { updateUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const dataForm = {
      amount: values.amount,
    };
    const data = await CreditService.deposit(dataForm);
    const { error } = data;
    if (error) {
      let message: ValidateFormType = data.message;
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
        title: "Deposit Success",
        content: (
          <div>
            <p>{message}</p>
          </div>
        ),
        async onOk() {
          const userProfile = await UserService.getMyProfile();
          updateUser(userProfile);
          form.resetFields();
        },
      });
    }
  };

  return (
    <Form
      id="deposit-form"
      onFinish={handleSubmit}
      style={{
        width: "400px",
      }}
      form={form}
    >
      <h2>Deposit</h2>
      <Form.Item
        name="amount"
        rules={[
          { required: true, message: "Amount is required" },
          { type: "number", min: 0, message: "Invalid number format" },
        ]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="Amount" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Deposit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DepositForm;
