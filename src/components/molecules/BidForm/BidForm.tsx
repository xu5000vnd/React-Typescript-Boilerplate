import React, { useContext } from "react";
import Button from "../../atoms/Button/Button";
import { Form, Modal, InputNumber } from "antd";
import UserService from "../../../services/user.service";
import { AuthContext } from "../../../hooks/auth.context";
import {
  ValidateFieldType,
  ValidateFormType,
} from "../../../common/types/validate.type";
import BidService from "../../../services/bid.service";

export interface BidFormProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  itemId: number;
  closeModal: () => void;
}

const BidForm: React.FC<BidFormProps> = ({ itemId, closeModal }) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const dataForm = {
      amount: values.amount,
    };
    const data = await BidService.bid(itemId, dataForm);
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
        title: "Bid Success",
        content: (
          <div>
            <p>{message}</p>
          </div>
        ),
        async onOk() {
          form.resetFields();
          closeModal();
        },
      });
    }
  };

  return (
    <Form
      id="bid-form"
      onFinish={handleSubmit}
      style={{
        width: "400px",
      }}
      form={form}
    >
      <h2>Bid</h2>
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
          Bid
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BidForm;
