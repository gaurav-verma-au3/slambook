import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { markFavourite } from "../store/slamEntries/actions/slamEntries.actions";
import Share from "./Share";
import { API_ORIGIN_URL, appRoot } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const SlamTile = ({
  slam: { name, custom_bg, message, is_answered, _id, isFavourite },
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleMarkFavourite = (_id, isFavourite) => {
    dispatch(
      markFavourite({
        _id,
        isFavourite,
        isLoggedIn,
        is_answered,
        enqueueSnackbar,
      })
    );
  };
  return (
    <>
      <Card
        className={`${
          is_answered ? "border-thick-active" : "border-thick-mute"
        } ${classes.root} p-2`}
        style={{ background: "transparent" }}
      >
        <div id={custom_bg}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {name[0].toUpperCase()}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="Share">
            //     <ShareIcon />
            //   </IconButton>
            // }
            title={name}
            // subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body2" color="textPrimary" component="p">
              {message}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon
                className={`${isFavourite ? "text-danger" : ""}`}
                onClick={(e) => handleMarkFavourite(_id, !isFavourite)}
              />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={(e) => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="share"
            >
              <ShareIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Share
                url={`${appRoot}/fill/slam/${_id}`}
                media={`https://i.ibb.co/Yd4pGm1/logo512.png`}
              />
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </>
  );
};

export default SlamTile;
