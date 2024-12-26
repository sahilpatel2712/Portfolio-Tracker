import { Button, Menu } from "@mui/material";
import React from "react";
import { EditIcon, TrashIcon } from "../assets/svgs";

type StockDataType = {
  stockName: string;
  quantity: number | string;
  currentPrice: number | string;
  averagePrice: number | string;
  investedAmount: number | string;
  marketValue: number | string;
  overall: number | string;
  isProfit: boolean;
};

type StockTableType = {
  stocksData: StockDataType[];
  tableType?: "loss" | "profit" | "default";
  classes?: string;
  handleOpenFormModal: () => void;
};
const tableColor = {
  loss: "rgb(220, 53, 69,0.7)",
  profit: "rgb(40, 167, 69,0.7)",
  default: "rgb(255, 255, 255,0.7)",
};

const StockTable = ({
  stocksData,
  tableType = "default",
  classes = "",
  handleOpenFormModal,
}: StockTableType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`flex flex-col w-full text-center ${classes}`}>
      <div
        className="flex w-full font-normal text-sm border-[1px] rounded-md bg-bgColor py-2"
        style={{ borderColor: tableColor[tableType] }}
      >
        <div className="flex-1 break-words">Stock Name</div>
        <div className="flex-1 break-words">Quantity</div>
        <div className="flex-1 break-words">Today's Price</div>
        <div className="flex-1 break-words">Average Price</div>
        <div className="flex-1 break-words hidden lg:block">Amount</div>
        <div className="flex-1 break-words">Gain/Loss</div>
        <div className="flex-1 break-words hidden lg:block"></div>
      </div>

      {stocksData.map((stock, index) => (
        <React.Fragment key={index}>
          <button
            onClick={handleClick}
            key={index}
            className="flex w-full font-medium py-2 hover:bg-slate-700 cursor-pointer hover:bg-opacity-40"
          >
            <div className="flex-1">{stock.stockName}</div>
            <div className="flex-1">{stock.quantity}</div>
            <div className="flex-1">{stock.currentPrice}</div>
            <div className="flex-1">{stock.averagePrice}</div>
            <div className="flex-1 hidden lg:block">{stock.investedAmount}</div>
            <div
              className={`flex-1 ${
                stock.isProfit
                  ? "text-textColor-success"
                  : "text-textColor-danger"
              }`}
            >
              {stock.overall}
            </div>
            <div className="flex-1 hidden lg:flex justify-center items-center ">
              <Button onClick={handleOpenFormModal}>{EditIcon()}</Button>
              <Button>{TrashIcon()}</Button>
            </div>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              style: { display: "flex", padding: 0 },
            }}
            className="lg:hidden"
            disablePortal 
          >
            <Button style={{ fontWeight: "600" }} onClick={handleOpenFormModal}>
              Edit
            </Button>
            <Button style={{ color: "red", fontWeight: "600" }}>Delete</Button>
          </Menu>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StockTable;
