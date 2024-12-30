import React from "react";

const Loader = () => {
  return (
    <div className="relative z-[1050] block">
      <div className="fixed top-0 left-0 bottom-0 z-[1055] right-0 bg-[#00000099] flex justify-center items-center overflow-hidden">
        <div className="loader">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
          <div className="bar9"></div>
          <div className="bar10"></div>
          <div className="bar11"></div>
          <div className="bar12"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
