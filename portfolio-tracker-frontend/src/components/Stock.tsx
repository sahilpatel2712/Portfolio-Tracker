import { Tooltip } from "@mui/material";
import { IndicatorIcon } from "../assets/svgs";

type IndicatorValueType = {
  indicatorValue: boolean;
  onClick: () => void;
};
const stockDetail = {
  name: "TATATECH",
  overAll: "+19.10",
  price: "908.5",
};

const Stock = ({ indicatorValue, onClick }: IndicatorValueType) => {
  return (
    <div
      className="w-full flex items-center justify-between border-t-[1px] border-t-[#e5e7eb] border-opacity-10 py-2 px-5 cursor-pointer hover:bg-slate-700 hover:bg-opacity-40"
      onClick={onClick}
    >
      <Tooltip title={stockDetail.name}>
        <div className="font-medium text-sm truncate max-w-[50%]">
          {stockDetail.name}
        </div>
      </Tooltip>
      <div className="font-medium flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span
            className={`text-sm ${
              indicatorValue
                ? "text-textColor-success"
                : "text-textColor-danger"
            }`}
          >
            {stockDetail.price}
          </span>
          <span className="text-[0.5rem]">{IndicatorIcon(indicatorValue)}</span>
        </div>
        <span className="text-xs"> {stockDetail.overAll} </span>
      </div>
    </div>
  );
};

export default Stock;
