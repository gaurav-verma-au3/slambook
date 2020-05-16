import React from "react";
import { isMobile } from "react-device-detect";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AuthRedirect from "./AuthRedirect";

const style = {
  cursor: "pointer",
};

const BgPallete = ({ setBg, setShowPallete }) => {
  const bgs = Array.from(Array(17).keys());

  const handleBgChange = (val, e) => {
    e.stopPropagation();
    setBg(`background-${val}`);
  };

  return (
    <div className="row h-100 d-flex justify-content-center align-items-center mx-2">
      <AuthRedirect />
      {bgs.map((v) => {
        return (
          <div
            key={"bg" + v + "bg"}
            style={
              isMobile
                ? {
                    ...style,
                    height: "1.5rem",
                    width: "1.5rem",
                    marginRight: "1.5px",
                  }
                : {
                    ...style,
                    height: "2rem",
                    width: "2rem",
                    marginRight: "1px",
                  }
            }
            id={`background-${v}`}
            className="  rounded-circle border border-dark my-2 "
            onClick={(e) => handleBgChange(v, e)}
          ></div>
        );
      })}

      {setShowPallete && (
        <HighlightOffIcon
          style={
            isMobile
              ? { ...style, fontSize: "2rem", marginRight: "1.5px" }
              : { ...style, fontSize: "2rem", marginRight: "1px" }
          }
          className="text-dark my-2"
          onClick={() => setShowPallete(false)}
        />
      )}
    </div>
  );
};

export default BgPallete;
