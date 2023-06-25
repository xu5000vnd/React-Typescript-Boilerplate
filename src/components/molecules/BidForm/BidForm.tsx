import React, { useContext } from "react";
import Button from "../../atoms/Button/Button";
import { Form, Modal, InputNumber } from "antd";
import {
  ValidateFieldType,
  ValidateFormType,
} from "../../../common/types/validate.type";
import BidService from "../../../services/bid.service";
import UserService from "../../../services/user.service";
import { AuthContext } from "../../../hooks/auth.context";

export interface BidFormProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  itemId: number;
  closeModal: () => void;
  fetchParentData: () => void;
}

const BidForm: React.FC<BidFormProps> = ({
  itemId,
  closeModal,
  fetchParentData,
}) => {
  const { updateUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const dataForm = {
      amount: values.amount,
    };
    const data = await BidService.bid(itemId, dataForm);
    const { error } = data;
    if (error) {
      if (typeof data?.message === "string") {
        form.setFields([
          {
            name: "amount",
            errors: [data.message],
          },
        ]);
      } else {
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
          fetchParentData();
          form.resetFields();
          const userProfile = await UserService.getMyProfile();
          updateUser(userProfile);
          closeModal();
        },
      });
    }
  };

  return (
    <Form id="bid-form" onFinish={handleSubmit} style={{}} form={form}>
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
        <div style={{ float: "right" }}>
          <Button
            type="default"
            htmlType="button"
            onClick={closeModal}
            style={{
              marginRight: "10px",
            }}
          >
            Cancle
          </Button>
          <Button type="primary" htmlType="submit">
            Bid
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default BidForm;
