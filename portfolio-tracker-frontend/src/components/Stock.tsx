import { Tooltip } from "@mui/material";
import { IndicatorIcon } from "../assets/svgs";
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
    <div
      className="w-full flex items-center justify-between border-t-[1px] border-t-[#e5e7eb] border-opacity-10 py-2 px-5 cursor-pointer hover:bg-slate-700 hover:bg-opacity-40"
      onClick={onClick}
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
    </div>
  );
};

export default Stock;
