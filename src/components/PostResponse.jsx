import React, { useState, useEffect } from "react";
import { API_ORIGIN_URL } from "../config";
import ResponseForm from "./ResponseForm";
import { useParams } from "react-router-dom";
import HelmetShare from "./HelmetShare";

const PostResponse = (props) => {
  const { setBg, setUserName } = props;
  const { slam_id } = useParams();
  const [slam, setSlam] = useState(null);
  const [owner, setOwner] = useState(null);

  const getSlam = async (slam_id) => {
    const url = `${API_ORIGIN_URL}/fill/getslam/${slam_id}`;
    const data = await fetch(url).then((data) => data.json());
    setSlam(data.slam);
    setUserName(data.slam.name);
    setOwner(data.owner);
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
            ) : (
              <h4 className="text-center">Page Not Found</h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default PostResponse;
