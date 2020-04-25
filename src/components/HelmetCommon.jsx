import React from "react";
import { Helmet } from "react-helmet";
const HelmetCommon = () => {
  return (
    <div>
      <Helmet>
        <meta
          name="og:description"
          content="New age slambook to preserve your memories forever"
        />
      </Helmet>
    </div>
  );
};

export default HelmetCommon;
