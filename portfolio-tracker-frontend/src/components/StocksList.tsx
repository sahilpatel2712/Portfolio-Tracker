import Select, { SingleValue } from "react-select";
import Stock from "./Stock";
import { SearchIcon } from "../assets/svgs";
import FormModal, { OptionType } from "./FormModal";
import React from "react";
import { searchStock } from "../api/stocksApi";
import { useNavigate } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { StockDataType } from "./StockTable";
import { isValidArray } from "../utils/objectsValidation";
import { StockFormType } from "../schema/stockFormValidation";
import { FormValueType } from "../pages/Non-Auth/Portfolio";

export type StockListType = Pick<StockDataType, "stockName" | "ticker">;

const StocksList = () => {
  const navigate = useNavigate();
  const stocksData = useAppSelector((state) => state.portfolio.stocksData);
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState<OptionType[]>([]);
  const [formValue, setFormValue] = React.useState<null | FormValueType>(null);
  const [inputText, setInputText] = React.useState<string>("");
  const [stocksList, setStocksList] = React.useState<StockListType[]>([]);

  const searchTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleOpenFormModal = (stockValue: StockFormType) => {
    setFormValue(stockValue);
    setOpenModal(true);
  };
  const handleSelect = (value: SingleValue<OptionType>) => {
    if (value) {
      setStocksList([{ stockName: value.description, ticker: value.symbol }]);
    } else {
      setStocksList(stocksData || []);
    }
  };
  const handleSearch = (searchText: string) => {
    setInputText(searchText);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      if (searchText.trim()) {
        setIsLoading(true);

        const response = await searchStock(searchText, false, (path: string) =>
          navigate(path)
        );
        const stocks = response?.data.payload.searchedStocks || [];
        setOptions(() => stocks);

        setIsLoading(false);
      }
    }, 300);
  };

  React.useEffect(() => {
    if (isValidArray(stocksData)) {
      setStocksList(() => stocksData.slice(0, 9));
    }
  }, [stocksData]);
  return (
    <div className="min-h-[calc(100vh-140px)] h-full w-full">
      <div className="flex h-[52px] w-full px-3 py-1 gap-2 mb-2">
        <span className="flex w-5">{SearchIcon()}</span>
        <Select
          options={options}
          isSearchable={true}
          hideSelectedOptions={true}
          isClearable
          isMulti={false}
          inputValue={inputText}
          getOptionLabel={(e) => `${e.description} ${e.symbol}`}
          getOptionValue={(e) => e.symbol}
          placeholder="Stocks"
          onChange={handleSelect}
          onInputChange={handleSearch}
          isLoading={isLoading}
          components={{
            DropdownIndicator: () => null,
          }}
          className="w-full flex-grow focus:outline-none focus:shadow-none focus:ring-0 text-white bg-bgColor-custom"
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              backgroundColor: "#1e1e1e",
              border: "none",
            }),
          }}
          classNames={{
            indicatorSeparator: () => "hidden",
            menuList: () => "bg-bgColor",
            singleValue: () => "!text-white",
            option: () => "hover:!bg-bgColor !bg-transparent",
            input: () => "!text-white",
            control: () =>
              "hover:!border-transparent focus:!border-transparent !shadow-none",
          }}
        />
      </div>
      <div className="w-full overflow-y-auto ">
        {isValidArray(stocksList) ? (
          stocksList.map((stock, index) => (
            <Stock
              key={index}
              onClick={() =>
                handleOpenFormModal({
                  stockName: stock.stockName,
                  ticker: stock.ticker,
                  averagePrice: 0,
                  quantity: 0,
                })
              }
              stock={stock}
            />
          ))
        ) : (
          <div className="my-4 font-normal text-center ">Stocks not found</div>
        )}
      </div>
      <FormModal
        open={openModal}
        setOpen={setOpenModal}
        formValues={formValue}
      />
    </div>
  );
};

export default StocksList;
