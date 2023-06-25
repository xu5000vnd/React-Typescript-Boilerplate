import React from "react";
import { Form, InputNumber, Modal } from "antd";
import Input from "../../../atoms/Input/Input";
import Button from "../../../atoms/Button/Button";
import {
  ValidateFormType,
  ValidateFieldType,
} from "../../../../common/types/validate.type";
import { useNavigate } from "react-router-dom";
import { ROUTING } from "../../../../constants/system.constant";
import ItemService from "../../../../services/item.service";

const ItemForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const dataForm = {
      name: values.name,
      startPrice: values.startPrice,
      timeWindow: values.timeWindow * 60,
    };
    const data = await ItemService.add(dataForm);
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
          title: "Create Item Success",
          content: (
            <div>
              <p>{message}</p>
            </div>
          ),
          onOk() {
            navigate(ROUTING.auth.items.list, {
              replace: true,
            });
          },
        });
      }
    }
  };

  return (
    <Form
      id="item-form"
      onFinish={onFinish}
      style={{
        width: "400px",
      }}
      form={form}
    >
      <h2>Item Form </h2>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="startPrice"
        rules={[
          { required: true, message: "This field is required" },
          { type: "number", min: 0, message: "Invalid number format" },
        ]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="Amount" />
      </Form.Item>

      <Form.Item
        name="timeWindow"
        rules={[
          { required: true, message: "This field is required" },
          { type: "number", min: 1, message: "Invalid number format" },
        ]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Time Window (Minutes)"
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="button"
          style={{ marginRight: "10px" }}
          onClick={() => {
            navigate(ROUTING.auth.items.list);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ItemForm;
