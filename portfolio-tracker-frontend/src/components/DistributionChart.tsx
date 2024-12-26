import { PieChart } from "@mui/x-charts";

const DistributionChart = () => {
  return (
    <div className="w-full pb-5 flex justify-between flex-wrap gap-20">
      <div className="flex-1 flex flex-col max-[960px]:items-center">
        <p className="w-full font-medium text-xl mb-10 max-[960px]:text-center">
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
          className="max-w-[400px] min-w-[320px] w-full min-h-[200px]"
        />
      </div>
      <div className="flex-1 flex flex-col max-[960px]:items-center">
        <p className="w-full font-medium text-xl mb-10 max-[960px]:text-center">
          Profit Distribution - $ 80,491.52
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
          className="max-w-[400px] min-w-[320px] w-full min-h-[200px]"
        />
      </div>
    </div>
  );
};

export default DistributionChart;
