import React, { useState, useEffect } from "react";
import AuthRedirect from "./AuthRedirect";
import { useSelector } from "react-redux";
import { red, blue, green } from "@material-ui/core/colors";
import { useSnackbar } from "notistack";
import { getSlamDetailsAPI } from "../store/api/slamEntriesAPI";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { Button, Switch } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { Redirect } from "react-router-dom";
import { bgs } from "./styles/bg";

// const Slides = ({ slamDetails }) => {
//   slamDetails &&
//     slamDetails.questions.map((q, i) => {
//       return (
//         <Slide
//           key={q.question + i}
//           media={
//             <h5>
//               {q.remainSilent
//                 ? "I choose my right to remain Silent"
//                 : `${q.answer}`}
//             </h5>
//           }
//           mediaBackgroundStyle={bgs.background0}
//           style={bgs.background0}
//           title={slamDetails && slamDetails.name}
//           subtitle={q.question}
//         />
//       );
//     });
// };

const SlamPage = (props) => {
  const slam_id = props.match.params.id;
  const { setBg, bg } = props;
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [slamDetails, setSlamDetails] = useState(null);
  const [state, setState] = useState({
    open: true,
  });
  const [autoplay, setAutoplay] = useState(true);
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
        {slamDetails &&
          console.log(
            slamDetails.custom_bg.slice(0, 10) +
              slamDetails.custom_bg.slice(11, slamDetails.custom_bg.length)
          )}
        <AuthRedirect />
        {!state.open ? <Redirect to="/" /> : null}
        {!isMobile ? (
          <div style={{ position: "relative", width: "100%", height: 500 }}>
            <AutoRotatingCarousel
              label="Close"
              autoplay={autoplay}
              open={state.open}
              onClose={() => setState({ open: false })}
              onStart={() => setState({ open: false })}
              style={{ position: "absolute" }}
            >
              {slamDetails ? (
                slamDetails.questions.map((q, i) => {
                  return (
                    <Slide
                      key={q.question + i}
                      media={
                        <h5>
                          {q.remainSilent
                            ? "I choose my right to remain Silent"
                            : `${q.answer}`}
                        </h5>
                      }
                      mediaBackgroundStyle={bgs.background0}
                      style={bgs.background0}
                      title={slamDetails && slamDetails.name}
                      subtitle={q.question}
                    />
                  );
                })
              ) : (
                <Slide
                  media={<h5>hello</h5>}
                  mediaBackgroundStyle={bgs.background0}
                  style={bgs.background0}
                  title={"Gaurav"}
                  subtitle={"question"}
                />
              )}
            </AutoRotatingCarousel>
          </div>
        ) : (
          <div style={{ position: "relative", width: "100%", height: 500 }}>
            <AutoRotatingCarousel
              id={slamDetails && slamDetails.custom_bg}
              label="Close"
              open={state.open}
              onClose={() => setState({ open: false })}
              onStart={() => setState({ open: false })}
              mobile
              autoplay={autoplay}
              style={{ position: "absolute", height: "80vh" }}
            >
              {slamDetails ? (
                slamDetails.questions.map((q, i) => {
                  return (
                    <Slide
                      key={q.question + i}
                      media={
                        <h5>
                          {q.remainSilent
                            ? "I choose my right to remain Silent"
                            : `${q.answer}`}
                        </h5>
                      }
                      mediaBackgroundStyle={bgs.background0}
                      style={bgs.background0}
                      title={slamDetails && slamDetails.name}
                      subtitle={q.question}
                    />
                  );
                })
              ) : (
                <Slide
                  media={<h5>hello</h5>}
                  mediaBackgroundStyle={bgs.background0}
                  style={bgs.background0}
                  title={"Gaurav"}
                  subtitle={"question"}
                />
              )}
            </AutoRotatingCarousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlamPage;
