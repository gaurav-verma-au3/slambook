import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import { useDispatch, useSelector } from "react-redux";
import {
  markFavourite,
  deleteEntry,
} from "../store/slamEntries/actions/slamEntries.actions";
import Share from "./Share";
import { appRoot } from "../config";
import { Link } from "react-router-dom";

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
  const handleDelete = (_id) => {
    dispatch(deleteEntry({ _id, isLoggedIn, enqueueSnackbar }));
  };
  return (
    <>
      <Card
        className={` rounded shadow shadow-sm ${classes.root}`}
        style={{ background: "transparent", border: "2px solid black" }}
      >
        <div id={custom_bg}>
          {is_answered ? (
            <Link
              className="text-dark font-weight-bold"
              to={`/app/slam/${_id}`}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {name[0].toUpperCase()}
                  </Avatar>
                }
                title={name}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  style={{ height: "10vh" }}
                  color="textPrimary"
                  component="p"
                >
                  {message}
                </Typography>
              </CardContent>
            </Link>
          ) : (
            <div className="m-0 p-0">
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {name[0].toUpperCase()}
                  </Avatar>
                }
                title={name}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  style={{ height: "10vh" }}
                  color="textPrimary"
                  component="p"
                >
                  {message}
                </Typography>
              </CardContent>
            </div>
          )}
          <small>
            <p
              className={`font-weight-bold  text-center ${
                is_answered ? "text-success" : "text-danger"
              }`}
            >
              {is_answered ? "Recieved" : "Pending"}
            </p>
          </small>
          <CardActions disableSpacing>
            <IconButton
              onClick={(e) => handleMarkFavourite(_id, !isFavourite)}
              aria-label="Add to favorites"
            >
              <FavoriteIcon className={`${isFavourite ? "text-danger" : ""}`} />
            </IconButton>
            <IconButton
              className="text-danger"
              onClick={(e) => handleDelete(_id)}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
            {!is_answered ? (
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
            ) : null}
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Share
                url={`${appRoot}/app/fill/slam/${_id}`}
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
