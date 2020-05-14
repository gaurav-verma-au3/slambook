import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SlamTile from "./SlamTile";
import AuthRedirect from "./AuthRedirect";
import { fetchAllEntries } from "../store/api/slamEntriesAPI";
import { useSnackbar } from "notistack";
import InfoIcon from "@material-ui/icons/Info";
const SlamList = () => {
  const { slamEntries, isLoggedIn } = useSelector((state) => state);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isLoggedIn) {
      fetchAllEntries(isLoggedIn, enqueueSnackbar);
    }
  }, []);

  return (
    <div className="container mb-5 pb-5">
      <AuthRedirect />
      <div className="row ">
        {slamEntries && slamEntries.length === 0 ? (
          <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
          >
            <div className="alert alert-info px-5" style={{ opacity: "0.6" }}>
              <p className="text-center font-weight-bold">No Entries</p>
              <p className="text-center">
                Click <InfoIcon className="mx-1" /> to get started
              </p>
            </div>
          </div>
        ) : (
          slamEntries.map((slam, idx) => (
            <div className="col-md-3 col-sm-12 mb-3" key={slam._id}>
              <SlamTile id={slam._id} slam={slam} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SlamList;
