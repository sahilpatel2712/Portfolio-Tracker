import StocksList from "../../components/StocksList";

const StockPage = () => {
  return (
    <div className="flex lg:hidden w-full max-h-[calc(100vh-140px)] h-full bg-bgColor-custom rounded-md flex-col items-center py-3 text-white">
      <StocksList />
    </div>
  );
};

export default StockPage;
