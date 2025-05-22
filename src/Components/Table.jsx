import React, { createContext, useCallback, useEffect, useState } from "react";
import "./table.css";
import DynamicTable from "./Dynamictable";
import Tooglecontainer from "./Togglecontainer";
import { gettoggleobj } from "../utils/toggleobj.js";
import { array } from "../api/api.js";

export const Togglecontext = createContext();
const Table = () => {
  const [data, setdata] = useState([]);
  const [togglearray, settogglearray] = useState([]);
  const [keys, setkeys] = useState(null);
  const [value, setvalue] = useState(null);
  const [tooglestate, settooglestate] = useState({});
  const [filterdata, setfilterdata] = useState([]);
  const [searchname, setsearchname] = useState("");
  // console.log(tooglestate);

  const handleswitchchange = (val, category, ischecked) => {
    // console.log(val, category, ischecked);
    settooglestate((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [val]: ischecked,
      },
    }));
  };

  const handlesearch = (e) => {
    setsearchname(e.target.value);
  };

  useEffect(() => {
    // console.log("search");
    const truedata = [];
    // console.log(truedata);

    if (tooglestate) {
      for (const group in tooglestate) {
        // console.log(tooglestate[values]);
        const obj = tooglestate[group];

        for (const [key, value] of Object.entries(obj)) {
          // console.log(key, value);
          if (value) {
            truedata.push({ group, key });
          }
        }
      }
    }
    const filteredArray = array.filter((item) => {
      // console.log(item);
      return truedata.every(({ group, key }) => {
        return (
          String(item[group])?.toLowerCase() === String(key)?.toLowerCase()
        );
      });
    });

    const filteredname = filteredArray?.filter((item) => {
      return item.name?.includes(searchname.toLocaleLowerCase());
    });

    if (filteredArray) {
      setfilterdata(filteredArray);
    }
    if (searchname) {
      setfilterdata(filteredname);
    }
  }, [tooglestate, searchname]);

  useEffect(() => {
    setdata(array);
    setfilterdata(array);
  }, []);

  useEffect(() => {
    if (data) {
      const accdata = gettoggleobj(data);
      // console.log(accdata);
      settogglearray(accdata);
    }
  }, [data]);

  useEffect(() => {
    if (togglearray) {
      const keys = Object.keys(togglearray);
      const values = Object.values(togglearray);
      // console.log(keys);

      setkeys(keys);
      setvalue(values);
      const obj = keys.reduce((acc, key) => {
        acc[key] = togglearray[key].reduce((innacc, val) => {
          innacc[val] = false;
          return innacc;
        }, {});
        return acc;
      }, {});

      settooglestate(obj);
    }
  }, [togglearray]);

  return (
    <>
      <Togglecontext.Provider value={handleswitchchange}>
        <Tooglecontainer
          toggleKeys={keys}
          toggleValues={value}
          handlesearch={handlesearch}
          searchname={searchname}
        />
      </Togglecontext.Provider>
      <DynamicTable data={filterdata} />
    </>
  );
};

export default Table;
