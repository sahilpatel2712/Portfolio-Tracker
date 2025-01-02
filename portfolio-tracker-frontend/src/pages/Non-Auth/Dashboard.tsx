import StockTable from "../../components/StockTable";
import DistributionChart from "../../components/DistributionChart";
import React from "react";
import FormModal from "../../components/FormModal";
import { useAppSelector } from "../../redux/hooks";
import {
  leastPerformerStock,
  topPerformerStock,
} from "../../utils/stocksUtils";

const Dashboard = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const stocksData = useAppSelector((state) => state.portfolio.stockData);
  const handleOpenFormModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="w-full border-b-[0.5px] border-b-[#e5e7eb] pb-10 border-opacity-20">
        <p className="w-full font-medium text-xl">Top Performer</p>
        <StockTable
          tableType="profit"
          classes="min-[601px]:mt-7 max-[600px]:mb-5 mb-7"
          stocksData={topPerformerStock(stocksData)}
          handleOpenFormModal={handleOpenFormModal}
        />
        <p className="w-full font-medium text-xl">Least Performer</p>
        <StockTable
          tableType="loss"
          classes="min-[601px]:mt-7"
          stocksData={leastPerformerStock(stocksData)}
          handleOpenFormModal={handleOpenFormModal}
        />
      </div>
      <DistributionChart />
      <FormModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default Dashboard;
