import React, { useState } from "react";
import Switcher1 from "./switcher";
import "./toggle.css";
const Tooglecontainer = ({
  toggleKeys,
  toggleValues,
  searchname,
  handlesearch,
}) => {
  // console.log(...toggleKeys, ...toggleValues);

  return (
    <div>
      <div className="flex justify-center pt-10">
        <div className="w-full max-w-sm min-w-[50px] text-center">
          <input
            value={searchname}
            className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search name..."
            onChange={(e) => handlesearch(e)}
          />
        </div>
      </div>

      <div className="container">
        {toggleKeys ? (
          toggleKeys.map((item, rowi) => {
            return (
              <div key={rowi} className="category">
                <div className="categoryname">{item}</div>
                <div className="categorydata">
                  {toggleValues[rowi]?.map((val, i) => {
                    return (
                      <label key={i} className="toggledata">
                        <Switcher1 val={val} category={item} />
                        {val}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ marginTop: "30px" }}>Loading...</p>
        )}
        <br />
      </div>
    </div>
  );
};

export default Tooglecontainer;
