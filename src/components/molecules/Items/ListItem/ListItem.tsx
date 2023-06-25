import React from "react";
import { Table, Modal } from "antd";
import { ITEM_STATUS } from "../../../../common/types/item.type";
import ItemService from "../../../../services/item.service";
import { useQuery } from "react-query";
import UserService from "../../../../services/user.service";
import Button from "../../../atoms/Button/Button";

interface Item {
  id?: number;
  name: string;
  startPrice: number;
  status: ITEM_STATUS;
  endedAt: string;
  publishedAt: string;
}

const ItemTable: React.FC = (props) => {
  const { data, isLoading, isError, refetch } = useQuery("items", () => {
    const userInfo = UserService.getUserInfo();

    if (userInfo) {
      return UserService.getItems(userInfo?.id);
    }
  });

  const handlePublish = async (id: number) => {
    const { error, message } = await ItemService.publish(id);
    if (error) {
      Modal.error({
        title: "Error",
        content: <p>{message}</p>,
      });
    } else {
      Modal.success({
        title: "Success",
        content: <p>{message}</p>,
      });
      refetch();
    }
  };

  const showConfirm = (id: number) => {
    Modal.confirm({
      title: "Do you want to publish this item?",
      onOk() {
        handlePublish(id);
      },
    });
  };

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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Published At",
      dataIndex: "publishedAt",
      key: "publishedAt",
    },
    {
      title: "Ended At",
      dataIndex: "endedAt",
      key: "endedAt",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: number, row: Item) => {
        if (row.status === ITEM_STATUS.PENDING) {
          return (
            <Button type="default" onClick={() => showConfirm(id)}>
              Publish
            </Button>
          );
        }

        return "";
      },
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default ItemTable;
