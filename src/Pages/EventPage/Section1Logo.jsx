
import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Breakpoint} from "react-socks";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import EventLogo from './assets/EventLogo.svg';
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
    }
}));


function Section1Logo (props) {

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

    const absoluteBox = (
        <div className={classes.absoluteBox}>
            <div className={classes.flexBox} style={{zIndex: 120}}>
                <Container maxWidth="sm">
                    <Breakpoint small down>
                        <Paper elevation={3} className={clsx(classes.paperMobile)}>
                            <img src={EventLogo} className={clsx(classes.logoMobile)} alt="Event Logo"/>
                        </Paper>
                        <Paper elevation={3} className={clsx(classes.paperMobile)}>
                            <Grid container spacing={0} justify="center">
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.days}</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.hours}</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.minutes}</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.seconds}</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">d</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">h</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">m</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">s</Typography></Grid>
                            </Grid>
                        </Paper>
                    </Breakpoint>

                    <Breakpoint medium up>
                        <Paper elevation={3} className={clsx(classes.paper)}>
                            <img src={EventLogo} className={clsx(classes.logo)} alt="Event Logo"/>
                        </Paper>
                        <Paper elevation={3} className={clsx(classes.paper)}>
                            <Grid container spacing={0} justify="center">
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.days}</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.hours}</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.minutes}</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h5">{countdown.seconds}</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">days</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">hours</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">minutes</Typography></Grid>
                                <Grid item xs={3}><Typography className={classes.timeLabel} variant="h6">seconds</Typography></Grid>
                            </Grid>
                        </Paper>
                    </Breakpoint>

                </Container>
            </div>
            <PixelImagePreview
                previewAppendix="-pixel-preview"
                className={classes.img}
                src="https://storage.googleapis.com/i14-worlds-2021-upload/DSC2737_2cab11f170/_DSC2737_DSC2737_2cab11f170.jpeg"
                alt="Event Image 1"/>
        </div>
    )

    return (
        <React.Fragment>
            <Breakpoint small down>
                <div className={classes.relativeBoxMobile}>
                    {absoluteBox}
                </div>
            </Breakpoint>
            <Breakpoint medium only>
                <div className={classes.relativeBoxTablet}>
                    {absoluteBox}
                </div>
            </Breakpoint>
            <Breakpoint large up>
                <div className={classes.relativeBox}>
                    {absoluteBox}
                </div>
            </Breakpoint>
        </React.Fragment>
    );
}

export default Section1Logo;
