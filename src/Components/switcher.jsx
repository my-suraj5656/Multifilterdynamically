import React, { useContext, useState } from "react";
import { Togglecontext } from "./Table";

const Switcher1 = ({ val, category }) => {
  const handleswitchchange = useContext(Togglecontext);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const ischeck = !isChecked;
    setIsChecked(ischeck);
    if (handleswitchchange) {
      handleswitchchange(val, category, ischeck);
    }
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`block h-6 w-12 rounded-full transition-colors ${
              isChecked ? "bg-blue-500" : "bg-[#E5E7EB]"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all ${
              isChecked ? "transform translate-x-6" : ""
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switcher1;
