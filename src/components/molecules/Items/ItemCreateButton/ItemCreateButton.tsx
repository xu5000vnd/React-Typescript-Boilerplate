import React from "react";
import Button from "../../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import { ROUTING } from "../../../../constants/system.constant";

const ItemCreateButton: React.FC = () => {
  const navigate = useNavigate();
  const _onClick = () => {
    navigate(ROUTING.auth.items.create, {
      replace: true,
    });
  };
  return (
    <Button onClick={_onClick} type="default" htmlType="button">
      Create
    </Button>
  );
};

export default ItemCreateButton;
