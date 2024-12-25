import { IndicatorIcon } from "../assets/svgs";

type IndicatorValueType = {
  indicatorValue: boolean;
};

const Stock = ({ indicatorValue }: IndicatorValueType) => {
  return (
    <div className="w-full flex items-center justify-between border-t-[1px] border-t-[#e5e7eb] border-opacity-10 py-2 px-5">
      <div className="font-medium text-sm">TATATECH</div>
      <div className="font-medium flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span
            className={`text-sm ${
              indicatorValue
                ? "text-textColor-success"
                : "text-textColor-danger"
            }`}
          >
            908.5
          </span>
          <span className="text-[0.5rem]">{IndicatorIcon(indicatorValue)}</span>
        </div>
        <span className="text-xs"> +19.10 </span>
      </div>
    </div>
  );
};

export default Stock;
