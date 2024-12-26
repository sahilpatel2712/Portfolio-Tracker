import Stock from "./Stock";
import { SearchIcon } from "../assets/svgs";
import FormModal from "./FormModal";
import React from "react";
const list = [
  true,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  false,
];
const StocksList = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenFormModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div className="flex h-[52px] w-full px-3 py-1 gap-2 mb-2">
        <span className="flex w-5">{SearchIcon()}</span>
        <input
          type="text"
          placeholder="Stocks"
          className="w-full flex-grow shadow focus:outline-none focus:shadow-none focus:ring-0 text-white bg-bgColor-custom"
        />
      </div>
      <div className="w-full overflow-y-auto">
        {list.map((item, index) => (
          <Stock
            key={index}
            indicatorValue={item}
            onClick={handleOpenFormModal}
          />
        ))}
      </div>
      <FormModal open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default StocksList;
