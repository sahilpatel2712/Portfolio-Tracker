import { useAppSelector } from "../redux/hooks";
import { numberToCurrency } from "../utils/stocksUtils";

const Summary = () => {
  const summary = useAppSelector((state) => state.portfolio.portfolioSummary);
  return (
    <div className="w-full border-b-[0.5px] border-b-[#e5e7eb] pb-10 border-opacity-20">
      <p className="w-full font-medium text-xl">Portfolio Overview </p>
      <div className="flex items-center justify-around w-full mt-7">
        <div className="text-center">
          <p className="font-normal text-sm mb-3 mx-2">Invested Amount</p>
          <p className="font-medium">
            {numberToCurrency(summary.totalInvestment)}
          </p>
        </div>
        <div className="text-center">
          <p className="font-normal text-sm mb-3 mx-2">Current Amount</p>
          <p className="font-medium">
            {numberToCurrency(summary.totalCurrentPrice)}
          </p>
        </div>
        <div className="text-center">
          <p className="font-normal text-sm mb-3 mx-2">Overall Gain/Loss</p>
          <p
            className={`font-medium ${
              Number(summary.difference) < 0
                ? "text-textColor-danger"
                : "text-textColor-success"
            }`}
          >
            {numberToCurrency(summary.difference)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
