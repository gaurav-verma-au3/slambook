import React, { useState, useEffect } from "react";
import AuthRedirect from "./AuthRedirect";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getSlamDetailsAPI } from "../store/api/slamEntriesAPI";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { isMobile } from "react-device-detect";
import { Redirect } from "react-router-dom";
import { bgs } from "./styles/bg";

const SlamPage = (props) => {
  const slam_id = props.match.params.id;
  const { setBg, bg } = props;
  const { enqueueSnackbar } = useSnackbar();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [slamDetails, setSlamDetails] = useState(null);
  const [state, setState] = useState({
    open: true,
  });
  const [bgStyle, setBgStyle] = useState(null);
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

  useEffect(() => {
    let bg = slamDetails
      ? bgs[
          slamDetails?.custom_bg.slice(0, 10) +
            slamDetails?.custom_bg.slice(11, slamDetails?.custom_bg.length)
        ]
      : bgs.background9;
    setBgStyle(bg);
  }, [slamDetails]);

  return (
    <div>
      <div className="container-fluid">
        {slamDetails && setBg(slamDetails.custom_bg)}
        <AuthRedirect />
        {!state.open ? <Redirect to="/" /> : null}

        {bgStyle ? (
          !isMobile ? (
            <div style={{ position: "relative", width: "100%", height: 500 }}>
              <AutoRotatingCarousel
                className="text-dark"
                label="Close"
                autoplay={true}
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
                          <h5 className="text-dark">
                            {q.remainSilent
                              ? "I choose my right to remain Silent"
                              : q.answer
                              ? `${q.answer}`
                              : "No Answer"}
                          </h5>
                        }
                        mediaBackgroundStyle={{
                          ...bgStyle,
                        }}
                        style={{
                          ...bgStyle,
                        }}
                        title={
                          <h4 className="text-dark">{slamDetails.name}</h4>
                        }
                        subtitle={<h4 className="text-dark">{q.question}</h4>}
                      />
                    );
                  })
                ) : (
                  <Slide
                    className="text-dark"
                    media={<h5 className="text-dark">hello</h5>}
                    mediaBackgroundStyle={bgStyle}
                    style={bgStyle}
                    title={"Gaurav"}
                    subtitle={"question"}
                  />
                )}
              </AutoRotatingCarousel>
            </div>
          ) : (
            <div style={{ position: "relative", width: "100%", height: 500 }}>
              <AutoRotatingCarousel
                id={slamDetails && slamDetails._id}
                label="Close"
                open={state.open}
                onClose={() => setState({ open: false })}
                onStart={() => setState({ open: false })}
                mobile
                autoplay={true}
                style={{ position: "absolute" }}
              >
                {slamDetails ? (
                  slamDetails.questions.map((q, i) => {
                    return (
                      <Slide
                        key={q.question + i}
                        media={
                          <h5 className="text-dark">
                            {q.remainSilent
                              ? "I choose my right to remain Silent"
                              : q.answer
                              ? `${q.answer}`
                              : "No Answer"}
                          </h5>
                        }
                        mediaBackgroundStyle={{
                          ...bgStyle,
                        }}
                        style={{
                          ...bgStyle,
                        }}
                        title={
                          <h4 className="text-dark">{slamDetails.name}</h4>
                        }
                        subtitle={
                          <h6
                            // style={{ paddingBottom: "100px" }}
                            className="text-dark "
                          >
                            {q.question}
                          </h6>
                        }
                      />
                    );
                  })
                ) : (
                  <Slide
                    media={<h5>hello</h5>}
                    mediaBackgroundStyle={bgStyle}
                    style={bgStyle}
                    title={"Gaurav"}
                    subtitle={"question"}
                  />
                )}
              </AutoRotatingCarousel>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default SlamPage;
