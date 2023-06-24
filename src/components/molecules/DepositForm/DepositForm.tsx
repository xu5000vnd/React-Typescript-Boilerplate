import React from "react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { Form, Modal, InputNumber } from "antd";
import CreditService from "../../../services/credit.service";

const DepositForm: React.FC = () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const dataForm = {
      amount: values.amount,
    };
    const data = await CreditService.deposit(dataForm);
    const { error, message } = data;
    if (error) {
      form.setFields([
        {
          name: "amount",
          errors: [message],
        },
      ]);
    } else {
      const message: string = data.message;
      Modal.info({
        title: "Deposit Success",
        content: (
          <div>
            <p>{message}</p>
          </div>
        ),
        onOk() {
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
          { type: "number", message: "Invalid number format" },
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
