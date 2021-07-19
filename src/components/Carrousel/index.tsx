import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
interface data {
  label: string;
  imgPath: string;
}

interface Props {
  datas?: Array<data>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    position: "relative",
  },
  header: {
    position: "absolute",
    padding: '10px',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1000,
    paddingLeft: theme.spacing(4),
    backgroundColor: 'rgba(0, 0, 0, 0.11)',
    color: '#FFF'
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#000000e6'
  },
  img: {
    height: 355,
    display: "block",
    maxWidth: '100%',
    overflow: "hidden",
  },
}));

function SwipeableTextMobileStepper({ datas }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  function handleStepChange(step) {
    setActiveStep(step);
  }
  if (datas === undefined || datas.length === 0) return null;
  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>
          {datas !== undefined || [] ? datas[activeStep].label : ""}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {datas !== undefined || []
          ? datas.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <div className={classes.container}>
                    <img
                      className={classes.img}
                      src={step.imgPath}
                      alt={step.label}
                    />
                  </div>
                ) : null}
              </div>
            ))
          : "Nenhum destaque encontrado"}
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default SwipeableTextMobileStepper;
