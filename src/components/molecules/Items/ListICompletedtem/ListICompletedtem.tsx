import React from "react";
import { Table } from "antd";
import ItemService from "../../../../services/item.service";
import { useQuery } from "react-query";
import { BID_STATUS } from "../../../../common/types/bid.type";
import { formatDate } from "../../../../utils/common.util";

const CompletedItemTable: React.FC = (props) => {
  const { data, isLoading, isError, refetch } = useQuery("items", () => {
    return ItemService.listFinished();
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Price",
      dataIndex: "startPrice",
      key: "startPrice",
    },
    {
      title: "Bid Price",
      key: "id",
      render: (id: number, row: any) => {
        if (row?.bids?.length) {
          const bid = row.bids[0];
          if (bid.status === BID_STATUS.SUCCESS) {
            return bid.amount;
          }
        }

        return "";
      },
    },
    {
      title: "Ended At",
      dataIndex: "endedAt",
      key: "endedAt",
      render: (endedAt: string, row: any) => formatDate(new Date(endedAt)),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default CompletedItemTable;
