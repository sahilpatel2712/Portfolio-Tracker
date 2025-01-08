import { PieChart } from "@mui/x-charts";
import { useAppSelector } from "../redux/hooks";
import { numberToCurrency } from "../utils/stocksUtils";

const DistributionChart = () => {
  const portfolioData = useAppSelector((state) => state.portfolio);
  const chartData = portfolioData.stocksData.map((stock, index) => ({
    id: index,
    value: Number(stock.investedAmount),
    label: stock.stockName,
  }));
  return (
    <div className="w-full pb-5 flex justify-between flex-wrap gap-20">
      <div className="flex-1 flex flex-col">
        <p className="w-full font-medium text-xl mb-10">
          Total Investment -{" "}
          {numberToCurrency(portfolioData.portfolioSummary.totalInvestment)}
        </p>
        <PieChart
          series={[
            {
              data: chartData,
              valueFormatter: (v) => {
                return `${numberToCurrency(v.value)}  (${(
                  (Number(v.value) * 100) /
                  Number(portfolioData.portfolioSummary.totalInvestment)
                ).toFixed(2)}%)`;
              },
              highlightScope: { fade: "global", highlight: "item" },
              arcLabel: (item) =>
                `${(
                  (Number(item.value) * 100) /
                  Number(portfolioData.portfolioSummary.totalInvestment)
                ).toFixed(2)}%`,
              arcLabelMinAngle: 35,
              cx: 150,
            },
          ]}
          slotProps={{
            legend: {
              classes: {
                root: "label-root",
              },
              labelStyle: {
                fill: "#fff",
              },
            },
            pieArcLabel: {
              style: { fontSize: 12, fontWeight: "600", fill: "#fff" },
            },
            pieArc: {
              height: 200,
              classes:{
                root:"!max-h-[200px]"
              }
            },
          }}
          className="min-w-[320px] w-full min-h-[200px] lg:max-w-[90%]"
          height={200}
        />
      </div>

    </div>
  );
};

export default DistributionChart;
