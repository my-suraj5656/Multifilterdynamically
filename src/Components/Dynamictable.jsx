import React from "react";

const DynamicTable = ({ data }) => {
  if (!data) {
    return null;
  }
  // console.log(data);

  const heading = [];
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!heading.includes(key)) {
        heading.push(key);
      }
    });
  });

  return (
    <>
      {!data.length ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          No data found...
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              {heading.map((item, i) => {
                return <th key={i}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowi) => {
              return (
                <tr key={rowi}>
                  {heading.map((key, coli) => {
                    return (
                      <td key={coli}>
                        {item[key] === undefined ||
                        item[key] === null ||
                        item[key] === ""
                          ? "-"
                          : String(item[key])}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default DynamicTable;
