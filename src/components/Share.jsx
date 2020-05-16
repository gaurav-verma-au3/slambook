import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AuthRedirect from "./AuthRedirect";
import { handleNotification } from "../utils";
import { useSnackbar } from "notistack";
const Share = ({ url, media }) => {
  const { enqueueSnackbar } = useSnackbar();
  const copyToClipboard = () => {
    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", url);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    handleNotification(enqueueSnackbar, "Copied to Clipboard", "success");
  };
  return (
    <>
      <AuthRedirect />
      <div className="container-fluid">
        <div className="row my-1">
          <div className="col-12 d-flex justify-content-around align-items-center">
            <div className="bg-secondary p-2 d-flex justify-content-center align-items-center rounded-circle">
              <FileCopyIcon
                style={{ fontSize: "1.2rem", cursor: "pointer" }}
                onClick={copyToClipboard}
              />
            </div>
            <PinterestShareButton url={url} media={media}>
              <PinterestIcon size={32} round />
            </PinterestShareButton>
            <FacebookShareButton url={url}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </div>
        <div className="row my-1 ">
          <div className="col-12 d-flex justify-content-around align-items-center">
            <TelegramShareButton url={url}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TumblrShareButton url={url}>
              <TumblrIcon size={32} round />
            </TumblrShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
