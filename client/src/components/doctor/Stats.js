import React, { Component } from "react";
import Chart from "react-apexcharts";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { quantity, sexesPie, sexesBar, business, satisfaction,monthlyVisitors } from "./charts/ChartsConfigs";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paperStats: {
    margin: "1%"
  },
  headerMargin: {
    marginTop: "1vh"
  }
});

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: { labels: ["One", "Two", "Three"] },
      series: [44, 44, 44]
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="flex flex-wrap">
        <Paper className={classes.paperStats} elevation={3}>
          <Typography
            className={classes.headerMargin}
            align="center"
            variant="h5"
          >
            Quantity
          </Typography>
          <Typography align="center" variant="subtitle1">
            You have
          </Typography>
          <Chart
            height="280"
            type="radialBar"
            width="260"
            options={quantity.options}
            series={quantity.series}
          />
          <Typography align="center" variant="subtitle1">
            Patients
          </Typography>
        </Paper>

        <Paper className={classes.paperStats} elevation={3}>
          <Typography
            className={classes.headerMargin}
            align="center"
            variant="h5"
          >
            Chart1
          </Typography>
          <Chart
            options={sexesPie.options}
            series={sexesPie.series}
            type="pie"
            width="420"
            height="350"
          />
        </Paper>

        <Paper className={classes.paperStats} elevation={3}>
          <Typography
            className={classes.headerMargin}
            align="center"
            variant="h5"
          >
            Ages
          </Typography>
          <Chart
            options={sexesBar.options}
            series={sexesBar.series}
            height="350"
            width="600"
            type="bar"
          />
        </Paper>
        <Paper className={classes.paperStats} elevation={3}>
          <Typography
            className={classes.headerMargin}
            align="center"
            variant="h5"
          >
            Visits
          </Typography>
          <Chart
            options={business.options}
            series={business.series}
            height="350"
            width="500"
            type="line"
          />
        </Paper>

        <Paper className={classes.paperStats} elevation={3}>
          <Typography
            className={classes.headerMargin}
            align="center"
            variant="h5"
          >
            Patients Satisfaction
          </Typography>
          <Chart
            options={satisfaction.options}
            series={satisfaction.series}
            type="donut"
            height="350"
            width="500"
          />
        </Paper>

        <Paper className={classes.paperStats} elevation={3}>
          <Typography
            className={classes.headerMargin}
            align="center"
            variant="h5"
          >
            Monthly stats
          </Typography>
          <Typography align="center" variant="subtitle1">
            You had
          </Typography>
          <Chart
            type="radialBar"
            options={monthlyVisitors.options}
            series={monthlyVisitors.series}
            height="280"
            width="260"
          />
          <Typography align="center" variant="subtitle1">
            Visits this month
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Stats);
