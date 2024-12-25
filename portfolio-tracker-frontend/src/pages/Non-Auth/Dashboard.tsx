import { PieChart } from "@mui/x-charts/PieChart";
import StockTable from "../../components/StockTable";

const Dashboard = () => {
  return (
    <>
      <div className="w-full border-b-[0.5px] border-b-[#e5e7eb] pb-10 border-opacity-20">
        <p className="w-full font-medium text-xl">Stock Summary </p>
        <div className="flex items-center justify-around w-full mt-7">
          <div className="text-center">
            <p className="font-normal text-sm">Invested Amount</p>
            <p className="font-medium">80,491</p>
          </div>
          <div className="text-center">
            <p className="font-normal text-sm">Current Amount</p>
            <p className="font-medium">75,001</p>
          </div>
          <div className="text-center">
            <p className="font-normal text-sm">Overall Gain/Loss</p>
            <p className="font-medium text-textColor-danger">5000</p>
          </div>
        </div>
      </div>
      <div className="w-full border-b-[0.5px] border-b-[#e5e7eb] pb-10 border-opacity-20">
        <p className="w-full font-medium text-xl">Top Performer</p>
        <StockTable
          tableType="profit"
          classes="mt-7 mb-10"
          stocksData={[
            {
              stockName: "HDFCBANK",
              quantity: 25,
              currentPrice: 1650.0,
              averagePrice: 1600.0,
              investedAmount: 40000.0,
              marketValue: 41250.0,
              overall: 1250.0,
              isProfit: true, // Profit
            },
          ]}
        />
        <p className="w-full font-medium text-xl">Least Performer</p>
        <StockTable
          tableType="loss"
          classes="mt-7"
          stocksData={[
            {
              stockName: "ADANIGREEN",
              quantity: 9,
              currentPrice: 1031.05,
              averagePrice: 1672.56,
              investedAmount: 15053.04,
              marketValue: 9279.45,
              overall: -5773.59,
              isProfit: false, // Loss
            },
          ]}
        />
      </div>
      <div className="w-full  pb-5">
        <p className="w-full font-medium text-xl mb-10">
          Amount Distribution - $ 80,491.52
        </p>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
                { id: 3, value: 60, label: "series d" },
                { id: 4, value: 10, label: "series e" },
                { id: 5, value: 25, label: "series f" },
              ],
            },
          ]}
          slotProps={{
            legend: {
              direction: "column",
              position: {
                vertical: "middle",
                horizontal: "right",
              },

              itemMarkWidth: 20,
              itemMarkHeight: 2,
              markGap: 5,
              itemGap: 10,
              labelStyle: { fill: "#fff" },
            },
          }}
          width={400}
          height={200}
        />
      </div>
    </>
  );
};

export default Dashboard;
