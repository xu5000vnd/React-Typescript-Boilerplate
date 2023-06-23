import React from "react";
import { Row, Col } from "antd";

const HomePage: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>Home Page</Col>
      </Row>
    </div>
  );
};

export default HomePage;
