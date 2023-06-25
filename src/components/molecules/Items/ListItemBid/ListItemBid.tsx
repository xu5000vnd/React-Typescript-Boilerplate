import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import BidService from "../../../../services/bid.service";
import Button from "../../../atoms/Button/Button";
import UserService from "../../../../services/user.service";
import BidForm from "../../BidForm/BidForm";

const calculateCountDown = (endTime: Date): string => {
  const currentTime = new Date();
  const elapsedTime = Math.floor(
    (endTime.getTime() - currentTime.getTime()) / 1000
  ); // Elapsed time in seconds

  // Calculate the hours, minutes, and seconds
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return `${hours}:${minutes}:${seconds}`;
};

const ItemBidTable: React.FC = (props) => {
  const [items, setItems] = useState([]);
  const fetchData = async () => {
    const data = await BidService.getItems();
    setItems(data);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      // Update the data with updated count time
      setItems((prevData: any) => {
        if (prevData?.length) {
          return prevData.map((item: any) => ({
            ...item,
            countDown: calculateCountDown(new Date(item.endedAt)),
          }));
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const userInfo = UserService.getUserInfo();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Current Price",
      dataIndex: "startPrice",
      key: "startPrice",
      render: (startPrice: number, row: any) => {
        if (row?.bids?.length) {
          const prevBid = row.bids[0];
          return prevBid.amount;
        }

        return startPrice;
      },
    },
    {
      title: "Duration",
      dataIndex: "countDown",
      key: "countDown",
      render: (countDown: number, row: any) => {
        const endedAt = row.endedAt;
        const restTime = new Date(endedAt).getTime() - new Date().getTime();
        if (restTime < 0) {
          return "Stopped";
        }
        return countDown;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: number, row: any) => {
        if (row?.bids?.length) {
          const prevBid = row.bids[0];
          if (userInfo?.id === prevBid.userId) {
            return "";
          }
        }
        return (
          <Button
            type="default"
            onClick={() => {
              showModalBid(row);
            }}
          >
            Bid
          </Button>
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<any>({});
  const closeModal = () => {
    setOpen(false);
  };
  const showModalBid = (row: any) => {
    setOpen(true);
    setItem(row);
  };

  return (
    <>
      <Table dataSource={items} columns={columns} />
      <Modal open={open} title="Bid" footer={null}>
        <BidForm
          itemId={item?.id}
          closeModal={closeModal}
          fetchParentData={fetchData}
        />
      </Modal>
    </>
  );
};

export default ItemBidTable;
