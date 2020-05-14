import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ShareIcon from "@material-ui/icons/Share";
import PostAddIcon from "@material-ui/icons/PostAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import LockIcon from "@material-ui/icons/Lock";
import HomeIcon from "@material-ui/icons/Home";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HowTo = ({ handleClickOpen, helpOpen, handleClose }) => {
  return (
    <div id="help">
      <Dialog
        open={helpOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Get Started"}</DialogTitle>
        <DialogContent>
          <ul className="py-3 px-4" style={{ listStyleType: "none" }}>
            <li className="py-3">
              <span>
                Click <HomeIcon className="mx-2" /> to see your Slam Entries.
              </span>
            </li>
            <li className="py-3">
              Click <ColorLensIcon className="mx-2" /> to change App Background.
            </li>
            <li className="py-3">
              Click <GroupAddIcon className="mx-2" /> to create an entry in your
              Slambook.
            </li>
            <li className="py-3">
              Click <PostAddIcon className="mx-2" /> to Edit, Reorder, Delete or
              Add a new question. You'll find few predfined Questions.
            </li>
            <li className="py-3">
              Click <ShareIcon className="mx-2" /> to share your slam Entry with
              the person it belongs.
            </li>
            <li className="py-3">
              Click <LockIcon className="mx-2" /> to Logout.
            </li>
            <li className="py-3">
              <div className="alert alert-danger text-center p-3 mt-5">
                Share links personally as filling a slam doesn't require any
                authentication anyone with the link can submit response
              </div>
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HowTo;
