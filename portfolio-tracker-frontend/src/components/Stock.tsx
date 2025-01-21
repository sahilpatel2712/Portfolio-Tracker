import { Button, Menu, Tooltip } from "@mui/material";
import { ChartIcon, IndicatorIcon } from "../assets/svgs";
import React from "react";
import { StockListType } from "./StocksList";
import { getStockData } from "../api/stocksApi";
import { useNavigate } from "react-router";
import { isValidObject } from "../utils/objectsValidation";
import { numberToCurrency } from "../utils/stocksUtils";
type IndicatorValueType = {
  onClick: () => void;
  stock: StockListType;
};
type PopUpMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  handleOpenFormModal: () => void;
  navigateChart: () => void;
};
type DailyStockType = {
  ticker: string;
  currentPrice: number | string;
  d: number | string;
  dp: number | string;
  isUp: boolean;
};

const Stock = ({ onClick, stock }: IndicatorValueType) => {
  const [stockData, setStockData] = React.useState<DailyStockType>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchStockData = async () => {
    const response = await getStockData(stock.ticker, (path: string) => {
      navigate(path);
    });
    if (response && isValidObject(response.data.payload.stockData)) {
      setStockData(response.data.payload.stockData);
    } else {
      setStockData(undefined);
    }
  };
  React.useEffect(() => {
    fetchStockData();
  }, [stock]);
  return (
    <>
      <button
        className="w-full flex items-center justify-between border-t-[1px] border-t-[#e5e7eb] border-opacity-10 py-2 px-5 cursor-pointer hover:bg-slate-700 hover:bg-opacity-40"
        onClick={handleClick}
      >
        <Tooltip title={stock.ticker}>
          <div className="font-medium text-sm truncate max-w-[50%]">
            {stock.stockName}
          </div>
        </Tooltip>
        <div className="font-medium flex flex-col gap-1">
          <div className="flex justify-end gap-1">
            <span
              className={`text-sm ${
                stockData?.isUp
                  ? "text-textColor-success"
                  : "text-textColor-danger"
              }`}
            >
              {numberToCurrency(stockData?.currentPrice || 0)}
            </span>
            <span className="text-[0.5rem] pt-1">
              {IndicatorIcon(stockData?.isUp || false)}
            </span>
          </div>
          <div className="w-full text-xs text-end">
            <span className="mr-2">
              {stockData?.d && Number(stockData?.d) > 0 ? "+" : ""}
              {stockData?.d || 0}
            </span>
            <span>{`(${stockData?.dp || 0.0}%)`}</span>
          </div>
        </div>
      </button>
      <PopUpMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        handleOpenFormModal={onClick}
        navigateChart={() =>
          navigate(`/chart`, {
            state: { ticker: stock.ticker, name: stock.stockName },
          })
        }
      />
    </>
  );
};

export default Stock;

const PopUpMenu = ({
  anchorEl,
  open,
  handleClose,
  handleOpenFormModal,
  navigateChart,
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
        style: {
          display: "flex",
          padding: 0,
          justifyContent: "space-between",
        },
      }}
      disablePortal
    >
      <Tooltip title="Add">
        <Button
          style={{ fontWeight: "600" }}
          onClick={() => {
            {
              handleOpenFormModal();
              handleClose();
            }
          }}
        >
          Add
        </Button>
      </Tooltip>
      <Tooltip title="Chart">
        <Button
          className="cursor-pointer flex justify-center items-center"
          onClick={navigateChart}
        >
          <span>{ChartIcon()}</span>
        </Button>
      </Tooltip>
    </Menu>
  );
