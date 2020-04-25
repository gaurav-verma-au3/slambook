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
  const [response, setResponse] = useState({});

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
    <div
      className="container-fluid m-0 p-0"
      id={`${slam && slam.custom_bg ? slam.custom_bg : "background-9"}`}
    >
      <HelmetShare message={slam.message} />
      <div className="row d-flex justify-content-center">
        {slam ? <ResponseForm questions={slam.questions} /> : null}
      </div>
    </div>
  );
};
export default PostResponse;
