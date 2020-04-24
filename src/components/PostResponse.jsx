import React, { useState, useEffect } from "react";
import { API_ORIGIN_URL } from "../config";
const PostResponse = (props) => {
  const { slam_id } = props.match.params;
  const [slam, setSlam] = useState([]);
  const [owner, setOwner] = useState(null);

  const getSlam = async (slam_id) => {
    const url = `${API_ORIGIN_URL}/fill/getslam/${slam_id}`;
    const data = await fetch(url).then((data) => data.json());
    setSlam(data.slam);
    setOwner(data.owner);
  };

  useEffect(() => {
    if (!owner) getSlam(slam_id);
  }, []);

  return <div></div>;
};

export default PostResponse;
