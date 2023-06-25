import { Col, Row } from "antd";
import React from "react";
import ItemBidTable from "../../molecules/Items/ListItemBid/ListItemBid";

const DashBoard: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}></Col>
        <Col span={24}>
          <ItemBidTable />
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
