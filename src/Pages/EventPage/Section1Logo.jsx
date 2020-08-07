
import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Breakpoint} from "react-socks";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import PixelImagePreview from "../../Components/PixelImagePreview/PixelImagePreview";

const useStyles = makeStyles(theme => ({
    relativeBox: {
        width: "100vw",
        height: "40vw",
        position: "relative",
    },
    relativeBoxTablet: {
        width: "100vw",
        height: "70vw",
        position: "relative",
    },
    relativeBoxMobile: {
        width: "100vw",
        height: "80vh",
        position: "relative",
    },
    absoluteBox: {
        width: "100vw",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0
    },
    flexBox: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
    paperMobile: {
        padding: theme.spacing(1),

        marginTop: theme.spacing(1),
        marginRight: theme.spacing(0),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(0),
    },
    logo: {
        margin: theme.spacing(2),
        objectFit: "contain",
    },
    logoMobile: {
        margin: theme.spacing(0.5),
        objectFit: "contain",
    },
    timeLabel: {
        width: "100%",
        textAlign: "center",
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 110
    },
    copyright: {
        position: "absolute",
        bottom: "5px",
        left: "15px",
        zIndex: "1000",
        color: "white",
    }
}));


const ImageElement = props => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <PixelImagePreview
                previewAppendix="-pixel-preview"
                className={classes.img}
                src={props.src}
                alt="Event Image 1"
            />
            <Typography
                variant="h6"
                className={classes.copyright}
            >© Sven Jürgenssen</Typography>
        </React.Fragment>
    )
};


const LogoBadges = props => {

    const classes = useStyles();

    // Set the date we're counting down to
    let endDate = new Date("Aug 8, 2021 08:00:00").getTime();

    // Get todays date and time
    let startDate = new Date().getTime();
    let difference = endDate - startDate;
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    let [countdown, setCountdown] = useState({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    });

    let [countdownInterval] = useState(
        setInterval(refreshCountDown, 1000)
    );

    function refreshCountDown() {
        // Get todays date and time
        let startDate = new Date().getTime();
        let difference = endDate - startDate;
        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });

        // If the count down is finished, write some text
        if (difference < 0) {
            clearInterval(countdownInterval);
            setCountdown({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        }
    }

    return (
        <div className={classes.flexBox} style={{zIndex: 120}}>
            <Container maxWidth="sm">
                <Paper elevation={3} className={props.mobile ? classes.paperMobile : classes.paper}>
                    <img
                        src="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/event-logo-dark.svg"
                        className={props.mobile ? classes.logoMobile : classes.logo} alt="Event Logo"
                    />
                </Paper>
                <Paper elevation={3} className={props.mobile ? classes.paperMobile : classes.paper}>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.days}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.hours}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.minutes}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.seconds}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">{props.mobile ? "d" : "days"}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">{props.mobile ? "h" : "hours"}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">{props.mobile ? "m" : "minutes"}</Typography></Grid>
                        <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">{props.mobile ? "s" : "seconds"}</Typography></Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );

}

function Section1Logo () {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Breakpoint small down>
                <div className={classes.relativeBoxMobile}>
                    <div className={classes.absoluteBox}>
                        <LogoBadges mobile={true}/>
                        <ImageElement src="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-01-sm.jpg"/>
                    </div>
                </div>
            </Breakpoint>
            <Breakpoint medium only>
                <div className={classes.relativeBoxTablet}>
                    <div className={classes.absoluteBox}>
                        <LogoBadges mobile={false}/>
                        <ImageElement src="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-01-md.jpg"/>
                    </div>
                </div>
            </Breakpoint>
            <Breakpoint large up>
                <div className={classes.relativeBox}>
                    <div className={classes.absoluteBox}>
                        <LogoBadges mobile={false}/>
                        <ImageElement src="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-01-lg.jpg"/>
                    </div>
                </div>
            </Breakpoint>
        </React.Fragment>
    );
}

export default Section1Logo;
