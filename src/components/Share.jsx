import React from "react";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestIcon,
  InstapaperIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
const Share = ({ url, media }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row my-1">
          <div className="col-12 d-flex justify-content-around align-items-center">
            <PinterestShareButton url={url} media={media}>
              <PinterestIcon size={32} round />
            </PinterestShareButton>
            <InstapaperShareButton url={url}>
              <InstapaperIcon size={32} round />
            </InstapaperShareButton>
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
