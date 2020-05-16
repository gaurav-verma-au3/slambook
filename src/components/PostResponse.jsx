import React, { useState, useEffect } from "react";
import { API_ORIGIN_URL } from "../config";
import ResponseForm from "./ResponseForm";
import { useParams } from "react-router-dom";
import HelmetShare from "./HelmetShare";
import PostResponseDiaglog from "./PostResponseDiaglog";

const PostResponse = (props) => {
  const { setBg, setUserName } = props;
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
          setUserName(slam.slam.name);
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
  });
  return (
    <>
      {slam && slam.is_answered ? (
        <h4 className="text-center text-muted my-5">Response already Exists</h4>
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
      <div className="container py-5 my-5">
        {error.isError ? (
          <h4 className="text-center my-5 py-5 font-weight-bold">
            {error.message}
          </h4>
        ) : null}
      </div>
      {slam ? (
        <PostResponseDiaglog
          owner={owner}
          slam={slam}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
};
export default PostResponse;
