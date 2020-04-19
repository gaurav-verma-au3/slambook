import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const BgPallete = ({ setBg, setShowPallete }) => {
  const bgs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleBgChange = (val, e) => {
    e.stopPropagation();
    setBg(`background-${val}`);
  };
  return (
    <div className="row  justify-content-center align-items-center border rounded border border-light p-3">
      {bgs.map((v) => {
        return (
          <div
            key={"bg" + v + "bg"}
            style={{ height: "3rem", width: "3rem", marginRight: "3px" }}
            id={`background-${v}`}
            className="  rounded-circle border my-2 "
            onClick={(e) => handleBgChange(v, e)}
          ></div>
        );
      })}

      <HighlightOffIcon
        style={{
          fontSize: "3.5rem",
          marginRight: "3px",
        }}
        className="text-light my-2"
        onClick={() => setShowPallete(false)}
      />
    </div>
  );
};

export default BgPallete;
