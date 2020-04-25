import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SlamTile from "./SlamTile";
import AuthRedirect from "./AuthRedirect";
import { fetchAllEntries } from "../store/api/slamEntriesAPI";
import { useSnackbar } from "notistack";
const SlamList = () => {
  const { slamEntries, isLoggedIn } = useSelector((state) => state);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllEntries(isLoggedIn, enqueueSnackbar);
    }
  }, []);

  return (
    <div className="container">
      <AuthRedirect />
      <div className="row ">
        {slamEntries &&
          slamEntries.map((slam, idx) => (
            <div className="col-md-3 col-sm-12 mb-3">
              <SlamTile id={slam._id} slam={slam} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SlamList;
