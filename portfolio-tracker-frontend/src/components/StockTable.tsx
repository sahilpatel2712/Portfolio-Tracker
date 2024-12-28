import { Button, Menu } from "@mui/material";
import React from "react";
import { EditIcon, TrashIcon } from "../assets/svgs";
import DeleteConformModal from "./DeleteConformModal";

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

type PopUpMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  handleOpenFormModal: () => void;
} & Pick<StockSlotType, "handleOpenDeleteModal">;
type StockTableType = {
  stocksData: StockDataType[];
  tableType?: "loss" | "profit" | "default";
  classes?: string;
  handleOpenFormModal: () => void;
};

type StockSlotType = { handleOpenDeleteModal: () => void } & StockDataType &
  Pick<StockTableType, "handleOpenFormModal" | "classes">;

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
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  return (
    <>
      <div
        className={`flex flex-col w-full text-center overflow-y-auto max-[600px]:hidden ${classes}`}
      >
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
          <TableCP
            key={index}
            handleOpenFormModal={handleOpenFormModal}
            handleOpenDeleteModal={handleOpenDeleteModal}
            {...stock}
          />
        ))}
      </div>
      <div className="w-full hidden flex-col my-5 max-[600px]:flex gap-5">
        {stocksData.map((stock, index) => (
          <StockSlot
            {...stock}
            handleOpenFormModal={handleOpenFormModal}
            handleOpenDeleteModal={handleOpenDeleteModal}
            classes={classes}
            key={index}
          />
        ))}
      </div>
      <DeleteConformModal open={openDeleteModal} setOpen={setOpenDeleteModal} />
    </>
  );
};

export default StockTable;

const StockSlot = (stockProp: StockSlotType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className={`w-full flex justify-between ${stockProp.classes}`}
      >
        <div className="flex flex-col gap-1 text-left">
          <p className="text-lg">{stockProp.stockName}</p>
          <p className="font-normal text-sm">
            {stockProp.quantity} X{" "}
            <span className=" text-[#B3B3B3] mr-1">AVG</span>
            {stockProp.averagePrice}
          </p>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <p
            className={`text-lg ${
              stockProp.isProfit
                ? "text-textColor-success"
                : "text-textColor-danger"
            }`}
          >
            {stockProp.overall}
          </p>
          <p className="font-normal text-sm">
            <span className=" text-[#B3B3B3] mr-1">LTP</span>
            <span>{stockProp.currentPrice}</span>
          </p>
        </div>
      </button>

      <PopUpMenu
        handleClose={handleClose}
        open={open}
        handleOpenFormModal={stockProp.handleOpenFormModal}
        anchorEl={anchorEl}
        handleOpenDeleteModal={stockProp.handleOpenDeleteModal}
      />
    </>
  );
};

const PopUpMenu = ({
  anchorEl,
  open,
  handleClose,
  handleOpenFormModal,
  handleOpenDeleteModal,
}: PopUpMenuProps) =>
  anchorEl && (
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
      <Button
        style={{ color: "red", fontWeight: "600" }}
        onClick={handleOpenDeleteModal}
      >
        Delete
      </Button>
    </Menu>
  );

const TableCP = (stockProp: StockSlotType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget || null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex w-full font-medium py-2 hover:bg-slate-700 cursor-pointer hover:bg-opacity-40"
      >
        <div className="flex-1">{stockProp.stockName}</div>
        <div className="flex-1">{stockProp.quantity}</div>
        <div className="flex-1">{stockProp.currentPrice}</div>
        <div className="flex-1">{stockProp.averagePrice}</div>
        <div className="flex-1 hidden lg:block">{stockProp.investedAmount}</div>
        <div
          className={`flex-1 ${
            stockProp.isProfit
              ? "text-textColor-success"
              : "text-textColor-danger"
          }`}
        >
          {stockProp.overall}
        </div>
        <div className="flex-1 hidden lg:flex justify-evenly items-center ">
          <div onClick={stockProp.handleOpenFormModal}>{EditIcon()}</div>
          <div onClick={stockProp.handleOpenDeleteModal}>{TrashIcon()}</div>
        </div>
      </button>
      <PopUpMenu
        handleClose={handleClose}
        open={open}
        handleOpenFormModal={stockProp.handleOpenFormModal}
        anchorEl={anchorEl}
        handleOpenDeleteModal={stockProp.handleOpenDeleteModal}
      />
    </>
  );
};
