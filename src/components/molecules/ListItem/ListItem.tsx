import React from "react";
import { Table } from "antd";

interface Item {
  name: string;
  amount: number;
  lastBid: number;
  status: string;
  duration: string;
}

interface ItemTableProps {
  items: Item[];
}

const ItemTable: React.FC<ItemTableProps> = ({ items }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Last Bid",
      dataIndex: "lastBid",
      key: "lastBid",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  return <Table dataSource={items} columns={columns} />;
};

export default ItemTable;
