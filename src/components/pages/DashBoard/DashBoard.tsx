import { Col, Row, Tabs } from "antd";
import React from "react";
import ItemBidTable from "../../molecules/Items/ListItemBid/ListItemBid";
import CompletedItemTable from "../../molecules/Items/ListICompletedtem/ListICompletedtem";

const DashBoard: React.FC = () => {
  const tabs = [
    {
      label: "Ongoing",
      key: "ongoing",
      children: <ItemBidTable />,
    },
    {
      label: "Completed",
      key: "completed",
      children: <CompletedItemTable />,
    },
  ];
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" items={tabs} />
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
