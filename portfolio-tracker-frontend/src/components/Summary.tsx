
const Summary = () => {
  return (
    <div className="w-full border-b-[0.5px] border-b-[#e5e7eb] pb-10 border-opacity-20">
      <p className="w-full font-medium text-xl">Investment Summary </p>
      <div className="flex items-center justify-around w-full mt-7">
        <div className="text-center">
          <p className="font-normal text-sm mb-3 mx-2">Invested Amount</p>
          <p className="font-medium">80,491</p>
        </div>
        <div className="text-center">
          <p className="font-normal text-sm mb-3 mx-2">Current Amount</p>
          <p className="font-medium">75,001</p>
        </div>
        <div className="text-center">
          <p className="font-normal text-sm mb-3 mx-2">Overall Gain/Loss</p>
          <p className="font-medium text-textColor-danger">5000</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
