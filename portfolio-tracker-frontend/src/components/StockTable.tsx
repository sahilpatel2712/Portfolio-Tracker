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
};
const tableColor = {
  loss: "#DC3545",
  profit: "#28A745",
  default: "#2563eb",
};
const StockTable = ({
  stocksData,
  tableType = "default",
  classes = "",
}: StockTableType) => {
  return (
    <div className={`flex flex-col w-full text-center ${classes}`}>
      <div
        className="flex w-full font-normal text-sm border-[1px] rounded-md bg-bgColor py-2"
        style={{ borderColor: tableColor[tableType] }}
      >
        <div className="flex-1">Stock Name</div>
        <div className="flex-1">Quantity</div>
        <div className="flex-1">Today's Price</div>
        <div className="flex-1">Average Price</div>
        <div className="flex-1">Invested Amount</div>
        <div className="flex-1">Market Value</div>
        <div className="flex-1">Overall Gain/Loss</div>
      </div>

      {stocksData.map((stock, index) => (
        <div key={index} className="flex w-full font-medium py-2">
          <div className="flex-1">{stock.stockName}</div>
          <div className="flex-1">{stock.quantity}</div>
          <div className="flex-1">{stock.currentPrice}</div>
          <div className="flex-1">{stock.averagePrice}</div>
          <div className="flex-1">{stock.investedAmount}</div>
          <div className="flex-1">{stock.marketValue}</div>
          <div
            className={`flex-1 ${
              stock.isProfit
                ? "text-textColor-success"
                : "text-textColor-danger"
            }`}
          >
            {stock.overall}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockTable;
