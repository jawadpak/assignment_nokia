import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import { red, green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

const useStyles = makeStyles({
  middleTextVerticalAlign: {
    verticalAlign: "middle"
  },
  redColor: {
    color: red[500]
  },
  greenColor: {
    color: green[500]
  }
});

interface TaskStatusDataType {
  taskStatus: string;
}

export default function TaskStatus(props: TaskStatusDataType) {
  const classes = useStyles();

  const [taskStatus, setTaskStatus] = useState<string>(props.taskStatus);
  let taskStatusHtml;
  switch (taskStatus) {
    case "Failed":
      taskStatusHtml = (
        <>
          {" "}
          <CancelIcon
            className={[classes.middleTextVerticalAlign, classes.redColor].join(
              " "
            )}
          ></CancelIcon>{" "}
          <span>{taskStatus}</span>
        </>
      );
      break;
    case "Finished":
      taskStatusHtml = (
        <span>
          {" "}
          <CheckCircleIcon
            className={[
              classes.middleTextVerticalAlign,
              classes.greenColor
            ].join(" ")}
          ></CheckCircleIcon>{" "}
          {taskStatus}
        </span>
      );
      break;
    case "Interrupted":
      taskStatusHtml = (
        <span>
          {" "}
          <PauseCircleOutlineIcon
            className={classes.middleTextVerticalAlign}
          ></PauseCircleOutlineIcon>{" "}
          {taskStatus}
        </span>
      );
      break;
    default:
      taskStatusHtml = <span>{taskStatus}</span>;
      break;
  }

  return <div>{taskStatusHtml}</div>;
}
