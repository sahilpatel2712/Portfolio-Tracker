import { SearchIcon } from "../../assets/svgs";
import StockTable from "../../components/StockTable";

const stockData = [
  {
    stockName: "TATATECH",
    quantity: 15,
    currentPrice: 1100.5,
    averagePrice: 1035.15,
    investedAmount: 15527.25,
    marketValue: 16507.5,
    overall: 980.25,
    isProfit: true,
  },
  {
    stockName: "ADANIGREEN",
    quantity: 9,
    currentPrice: 1031.05,
    averagePrice: 1672.56,
    investedAmount: 15053.04,
    marketValue: 9279.45,
    overall: -5773.59,
    isProfit: false,
  },
  {
    stockName: "RELIANCE",
    quantity: 20,
    currentPrice: 2300.5,
    averagePrice: 2250.0,
    investedAmount: 45000.0,
    marketValue: 46010.0,
    overall: 1010.0,
    isProfit: true,
  },
  {
    stockName: "INFY",
    quantity: 10,
    currentPrice: 1450.75,
    averagePrice: 1500.0,
    investedAmount: 15000.0,
    marketValue: 14507.5,
    overall: -492.5,
    isProfit: false,
  },
  {
    stockName: "HDFCBANK",
    quantity: 25,
    currentPrice: 1650.0,
    averagePrice: 1600.0,
    investedAmount: 40000.0,
    marketValue: 41250.0,
    overall: 1250.0,
    isProfit: true,
  },
];

const Portfolio = () => {
  return (
    <div className="w-full flex flex-col">
      <p className="w-full font-medium text-xl">Holdings</p>
      <div className="flex h-[40px] max-w-[30%] w-full px-3 py-1 gap-2 mt-5 bg-bgColor self-end rounded-md border-[0.5px] border-opacity-50 border-[#e5e7eb]">
        <span className="flex w-5">{SearchIcon()}</span>
        <input
          type="text"
          placeholder="Stocks"
          className=" flex-grow shadow focus:outline-none focus:shadow-none focus:ring-0 text-white bg-bgColor"
        />
      </div>
      <StockTable stocksData={stockData} classes="my-5" />
    </div>
  );
};

export default Portfolio;
