import { Col, Row } from "antd";
import React from "react";
import ItemCreateButton from "../../molecules/Items/ItemCreateButton/ItemCreateButton";
import ItemTable from "../../molecules/Items/ListItem/ListItem";

const ItemPage: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ItemCreateButton />
        </Col>
        <Col span={24}>
          <ItemTable />
        </Col>
      </Row>
    </div>
  );
};

export default ItemPage;
