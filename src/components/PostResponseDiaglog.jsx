import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostResponseDiaglog({
  open,
  handleClose,
  slam,
  owner,
}) {
  const history = useHistory();

  const handleDisagree = () => {
    history.replace("/");
  };

  return (
    <div className="container-fluid">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Welcome to Slambook`}
        </DialogTitle>
        <DialogContent>
          <h5>{`Hello ${
            slam.name[0].toUpperCase() +
            slam.name.slice(1, slam.name.length).split(" ")[0]
          }, Please fill my Slambook`}</h5>
          <div className="container d-flex justify-content-center align-items-center ">
            <div className="row px-auto mx-auto">
              <div className="col-1">
                <span style={{ fontSize: "3rem" }}>&ldquo;</span>
              </div>
              <div className={isMobile ? 'col-8' : 'col-10'}>
                <div className="my-5">
                  <DialogContentText id="alert-dialog-slide-description">
                    <p className="text-muted text-center ">{slam.message}</p>
                    <p className="text-right"></p>
                  </DialogContentText>
                </div>
              </div>
              <div className="col-1 d-flex flex-column-reverse">
                <span
                  style={{
                    fontSize: "3rem",
                    transform: `translateY(30px)`,
                  }}
                >
                  &rdquo;
                </span>
              </div>
              <div className="col-12 text-center my-3">
                <cite>{`--${owner?.name.split(" ")[0]}`}</cite>
              </div>
              <div className="col-12">
                <div className="alert alert-sm alert-danger text-center p-2 m-0">
                  Once submitted you'll not be able to edit your response.
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
