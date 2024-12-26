import StockTable from "../../components/StockTable";
import DistributionChart from "../../components/DistributionChart";
import React from "react";
import FormModal from "../../components/FormModal";

const Dashboard = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenFormModal = () => {
    setOpenModal(true);
  };
  return (
    <>
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
              isProfit: true,
            },
          ]}
          handleOpenFormModal={handleOpenFormModal}
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
              isProfit: false,
            },
          ]}
          handleOpenFormModal={handleOpenFormModal}
        />
      </div>
      <DistributionChart />
      <FormModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default Dashboard;
