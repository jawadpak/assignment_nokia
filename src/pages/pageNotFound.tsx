import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import i18n from "../config/i18n.js";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 32
  },
  content: {
    paddingTop: 150,
    textAlign: "center"
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560
  }
}));

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">{i18n.t("error-404")}</Typography>
            <Typography variant="subtitle2">
              {i18n.t("error-mistake")}
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/undraw_page_not_found_su7k.svg"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PageNotFound;
