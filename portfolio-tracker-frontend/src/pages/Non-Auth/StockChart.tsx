import React from "react";
import { LineChart, useDrawingArea } from "@mui/x-charts";
import { useLocation, useNavigate } from "react-router";
import { Tooltip } from "@mui/material";
import Select from "react-select";
import { getStockSeries } from "../../api/stocksApi";

type ChartsDataType = {
  closingPrices: number[];
  dates: string[];
  current: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  isPositive: boolean;
};

type OptionType = { label: string; value: string | number };
const SelectOption = [
  { value: 0, label: "Week" },
  { value: 1, label: "Month" },
  { value: 2, label: "Year" },
];

const StockChart = () => {
  const { ticker, name } = useLocation().state;
  const navigate = useNavigate();
  const [chartsData, setChartsData] = React.useState<ChartsDataType>();
  const [chartLoading, setChartLoading] = React.useState(false);
  const [duration, setDuration] = React.useState<OptionType>(SelectOption[0]);
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = async (selectValue: any) => {
    setChartLoading(true);
    const response = await getStockSeries(
      ticker || "",
      selectValue.value,
      (path: string) => {
        navigate(path);
      }
    );
    setDuration(selectValue)
    setChartsData(response?.data.payload);
    setChartLoading(false);
  };

  React.useEffect(() => {
    handleChange(duration);
  }, [ticker]);

  const StockDetail = ({
    details,
    classes,
    tooltip,
  }: {
    details: OptionType
    classes: string;
    tooltip?: boolean;
  }) => (
    <div
      className={`flex flex-col justify-center items-center text-center flex-grow border-black ${classes}`}
    >
      <p className="w-full font-normal border-b-2 border-black bg-gray-800 p-2">
        {details.label}
      </p>
      <Tooltip title={details.value} disableHoverListener={!tooltip}>
        <p
          className={`font-medium w-full p-2 text-lg ${
            tooltip ? "truncate" : ""
          }`}
        >
          {details.value}
        </p>
      </Tooltip>
    </div>
  );

  return (
    <div className="w-full min-h-[calc(100vh-188px)] flex flex-col items-center gap-8">
      <Select
        options={SelectOption}
        isSearchable={false}
        value={duration}
        defaultValue={SelectOption[0]}
        onChange={handleChange}
        classNames={{
          indicatorSeparator: () => "!hidden",
          menuList: () => "bg-bgColor",
          singleValue: () => "!text-black font-medium",
          option: () => "hover:!bg-bgColor-custom !bg-transparent",
          input: () => "!text-white",
          control: () => "!border-none !bg-[#E4E0E1]",
        }}
        className="self-start"
      />
      <div>
        <LineChart
          className="md:!w-[600px] min-h-[300px] !w-[390px]"
          height={300}
          loading={chartLoading}
          series={[
            {
              data: (chartsData?.closingPrices as number[]) || [],
              label: name ? name : "",
              area: true,
              showMark: false,
              color: chartsData?.isPositive ? "#28A745" : "#DC3545",
              baseline:"min"
            },
          ]}
          xAxis={[
            {
              data: (chartsData?.dates as string[]) || [],
              scaleType: "point",
              tickLabelStyle: {
                fill: "#fff",
                fontSize: 12,
                fontWeight: "bold",
              },
              valueFormatter: (value: string) =>
                `${value.split("-")[2]}/${value.split("-")[1]}/${
                  value.split("-")[0]
                }`,
            },
          ]}
          yAxis={[
            {
              tickLabelStyle: {
                fill: "#fff",
                fontSize: 12,
                fontWeight: "bold",
              },
            },
          ]}
          sx={{
            "& .MuiAreaElement-root": {
              fill: "url(#areaGradient)",
            },
            "& .MuiChartsAxis-line": {
              stroke: "#fff !important",
            },
            "& .MuiChartsAxis-tick": {
              stroke: "#fff !important",
            },
          }}
          slotProps={{
            legend: { labelStyle: { fill: "#fff" }, markGap: 10 },
            loadingOverlay: {
              message: "Data will be available soon.",
              style: { fill: "#fff" },
            },
            noDataOverlay: {
              message: "No data to display.",
              style: { fill: "#fff" },
            },
          }}
        >
          <defs>
            <linearGradient
              id="areaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2={svgHeight}
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor={chartsData?.isPositive ? "#28A745" : "#DC3545"}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={chartsData?.isPositive ? "#28A745" : "#DC3545"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        </LineChart>
      </div>
      <div className="w-full flex items-center justify-between border-y-2 border-black">
        <StockDetail
          classes="border-s-2 max-w-[25%]"
          details={{ label: "Name", value: name }}
          tooltip={true}
        />
        <StockDetail
          classes="border-s-2"
          details={{ label: "Symbol", value: ticker }}
        />
        <StockDetail
          classes="border-s-2"
          details={{ label: "High", value: chartsData?.current?.high || "-" }}
        />
        <StockDetail
          classes="border-s-2"
          details={{ label: "Open", value: chartsData?.current?.open || "-" }}
        />
        <StockDetail
          classes="border-s-2"
          details={{ label: "Low", value: chartsData?.current?.low || "-" }}
        />

        <StockDetail
          classes="border-x-2"
          details={{ label: "Close", value: chartsData?.current?.close || "-" }}
        />
      </div>
    </div>
  );
};

export default StockChart;
