import React, { useState, useEffect } from "react";
import AuthRedirect from "./AuthRedirect";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getSlamDetailsAPI } from "../store/api/slamEntriesAPI";
const SlamPage = (props) => {
  const slam_id = props.match.params.id;
  const { setBg, bg } = props;
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [slamDetails, setSlamDetails] = useState(null);
  const getdata = async () => {
    const slamDetails = await getSlamDetailsAPI(
      slam_id,
      isLoggedIn,
      enqueueSnackbar
    );
    setSlamDetails(slamDetails.data[0]);
  };
  useEffect(() => {
    getdata();
    return () => {
      setSlamDetails(null);
      setBg(bg);
    };
  }, [slam_id]);

  return (
    <div>
      <div className="container-fluid">
        {slamDetails && setBg(slamDetails.custom_bg)}
        <AuthRedirect />
      </div>
    </div>
  );
};

export default SlamPage;
