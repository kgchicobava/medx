import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import deepOrange from "@material-ui/core/colors/deepOrange";
import HomeIcon from "@material-ui/icons/Home";
import DateIcon from "@material-ui/icons/DateRange";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import WorkIcon from "@material-ui/icons/Work";

const styles = {
  card: {
    minWidth: "20vw"
  },
  media: {
    height: 100
  },
  avatar: {
    margin: "0 10px 10px 0"
  },
  orangeAvatar: {
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  typoMargin: {
    marginBottom: "-6px",
    marginLeft: "1em"
  }
};

class UserCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://www.beautycolorcode.com/190080.png"
            title="Contemplative Reptile"
          />
          <CardContent>
              {/* Title */}
            <div className="flex flex-center">
              <Avatar
                sizes="large"
                className={`${classes.orangeAvatar} ${classes.bigAvatar} ${classes.avatar}`}>
                DD
              </Avatar>
              <Typography variant="h5" component="h2">
                {`${this.props.user.firstName} ${this.props.user.lastName}`}
              </Typography>
            </div>
            {/* Living place */}
            <div className="flex flex-center creditsPos">
              <HomeIcon />
              <Typography
                component="p"
                variant="body2"
                className={classes.typoMargin}
              >
                California, Orange County
              </Typography>
            </div>
            {/* Date of birth */}
            <div className="flex flex-center creditsPos">
              <DateIcon />
              <Typography
                component="p"
                variant="body2"
                className={classes.typoMargin}
              >
                12.12.2018 (35 years)
              </Typography>
            </div>
            {/* Phone number */}
            <div className="flex flex-center creditsPos">
              <PhoneIcon />
              <Typography
                component="p"
                variant="body2"
                className={classes.typoMargin}
              >
                +38-065-111-22-33
              </Typography>
            </div>
            {/* E-mail */}
            <div className="flex flex-center creditsPos">
              <MailIcon />
              <Typography
                component="p"
                variant="body2"
                className={classes.typoMargin}
              >
                <a href="mailto:example@example.com">example@example.com</a>
              </Typography>
            </div>
            {/* Work */}
            <div className="flex flex-center creditsPos">
              <WorkIcon />
              <Typography
                component="p"
                variant="body2"
                className={classes.typoMargin}
              >
                Google LLC
              </Typography>
            </div>

          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles)(UserCard);
