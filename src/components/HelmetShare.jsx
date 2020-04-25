import React from "react";
import { Helmet } from "react-helmet";
const HelmetShare = ({ message, image }) => {
  return (
    <div>
      <Helmet>
        <meta property="og:description" content={`${message}`} />
      </Helmet>
    </div>
  );
};

export default HelmetShare;
