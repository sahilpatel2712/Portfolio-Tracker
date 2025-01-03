import { Button } from "@mui/material";
import { SearchIcon } from "../../assets/svgs";
import StockTable, { StockDataType } from "../../components/StockTable";
import FormModal from "../../components/FormModal";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { isValidArray } from "../../utils/objectsValidation";
import { StockFormType } from "../../schema/stockFormValidation";
import { stockFilter } from "../../utils/stocksUtils";

export type FormValueType = StockFormType & { id?: string };

const Portfolio = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [searchStock, setSearchStock] = React.useState<string>("");
  const stocksData = useAppSelector((state) => state.portfolio.stocksData);
  const [filterStocks, setFilterStocks] = React.useState<StockDataType[]>([]);
  const [formValue, setFormValue] = React.useState<null | FormValueType>(null);
  const handleOpenFormModal = (stockData: FormValueType | null) => {
    setFormValue(stockData);
    setOpenModal(true);
  };
  const handleFilter = (searchText: string) => {
    if (isValidArray(stocksData)) {
      if (searchText) {
        setFilterStocks(() => stockFilter(stocksData, searchText.trim()));
      } else {
        setFilterStocks(stocksData);
      }
    }
  };
  React.useEffect(() => {
    handleFilter(searchStock);
  }, [stocksData, searchStock]);

  return (
    <div className="w-full flex flex-col">
      <p className="w-full font-medium text-xl">Holdings</p>
      <div className="flex  w-full   justify-between  mt-5">
        <div className="w-full min-w-[160px] flex  gap-2 bg-bgColor px-3 py-1 h-[40px]  max-w-[30%] rounded-md border-[0.5px] border-opacity-50 border-[#e5e7eb]">
          <span className="flex w-5">{SearchIcon()}</span>
          <input
            type="text"
            placeholder="Stocks"
            className="w-full flex-grow shadow focus:outline-none focus:shadow-none focus:ring-0 text-white bg-bgColor"
            value={searchStock}
            onChange={(e) => setSearchStock(e.target.value)}
          />
        </div>
        <div className="flex h-[40px]">
          <Button
            color="inherit"
            style={{
              backgroundColor: "#2563eb",
              fontSize: 12,
              fontWeight: "600",
            }}
            onClick={() => handleOpenFormModal(null)}
          >
            Add Stocks
          </Button>
        </div>
      </div>
      <StockTable
        stocksData={filterStocks}
        classes="min-[601px]:my-5 max-[600px]:border-[#fff] max-[600px]:border-opacity-20 max-[600px]:pt-4 max-[600px]:px-2  max-[600px]:border-t-[1px]"
        handleOpenFormModal={handleOpenFormModal}
      />
      <FormModal
        open={openModal}
        setOpen={setOpenModal}
        formValues={formValue}
      />
    </div>
  );
};

export default Portfolio;
