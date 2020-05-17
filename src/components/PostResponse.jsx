import React, { useState, useEffect } from "react";
import { API_ORIGIN_URL } from "../config";
import ResponseForm from "./ResponseForm";
import { useParams } from "react-router-dom";
import HelmetShare from "./HelmetShare";
import PostResponseDiaglog from "./PostResponseDiaglog";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import { isMobile } from "react-device-detect";

const PostResponse = (props) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { setBg, setUserName, bg } = props;
  const { slam_id } = useParams();
  const [slam, setSlam] = useState(null);
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState({ isError: false, message: "" });
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getSlam = async (slam_id) => {
    const url = `${API_ORIGIN_URL}/fill/getslam/${slam_id}`;
    await fetch(url)
      .then((data) => data.json())
      .then((slam) => {
        if (slam.slam) {
          setSlam(slam.slam);
          if (!isLoggedIn.token) {
            // setUserName(slam.slam.name);
          }
          setOwner(slam.owner);
        }
      })
      .catch((err) => {
        setError({
          isError: true,
          message: "Slam Not Found",
        });
      });
  };

  useEffect(() => {
    getSlam(slam_id);
  }, [slam_id]);

  useEffect(() => {
    if (slam) setBg(slam.custom_bg);
    return () => {
      setBg(null);
    };
  }, [slam?.custom_bg]);

  return (
    <>
      <Menu bg={bg} />

      <div
        style={
          !isLoggedIn.token
            ? !isMobile
              ? {
                  paddingTop: "15vh",
                  paddingBottom: "15vh",
                }
              : { paddingTop: "20vh", paddingBottom: "21.5vh" }
            : !isMobile
            ? {
                paddingBottom: "15vh",
              }
            : { paddingBottom: "21.5vh" }
        }
      >
        {slam && slam.is_answered ? (
          <h4 className="text-center text-muted my-5">
            Response already Exists
          </h4>
        ) : (
          <div
            className="container-fluid m-0 p-0"
            id={`${slam && slam.custom_bg ? slam.custom_bg : "background-9"}`}
          >
            <HelmetShare message={slam?.message} />

            <div className="row d-flex justify-content-center">
              {slam ? (
                <ResponseForm questions={slam.questions} slam_id={slam_id} />
              ) : null}
            </div>
          </div>
        )}
        {error.isError ? (
          <div className="container py-5 my-5">
            <h4 className="text-center my-5 py-5 font-weight-bold">
              {error.message}
            </h4>
          </div>
        ) : null}
        {slam ? (
          <PostResponseDiaglog
            owner={owner}
            slam={slam}
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        ) : null}
      </div>
    </>
  );
};
export default PostResponse;
