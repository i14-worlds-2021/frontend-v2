
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Section2Slider from "./Section2Slider";
import Section3Map from "./Section3Map";
import Section1Logo from "./Section1Logo";
import PixelImagePreview from "../../Components/PixelImagePreview/PixelImagePreview";
import clsx from "clsx";
import {Breakpoint} from "react-socks";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    fullWidthSection: {
        width: "100vw",
        margin: 0,
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    fullWidthSectionSlim: {
        width: "100vw",
        height: "auto",
        overflow: "hidden",
    },
    imageBox: {
        width: "100vw",
        height: "40vw",
        position: "relative",
    },
    imageBoxTablet: {
        width: "100vw",
        height: "70vw",
        position: "relative",
    },
    imageBoxMobile: {
        width: "100vw",
        position: "relative",
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
        color: "white"
    }
}));


function FullWidthSection(props) {
    const classes = useStyles();

    if (props.noMargins) {
        return (
            <div style={{backgroundColor: "color" in props ? props.color : "white"}} className={classes.fullWidthSectionSlim}>
                {props.children}
            </div>
        );
    } else {
        return (
            <div style={{backgroundColor: props.color}} className={classes.fullWidthSection}>
                <Container maxWidth="md">
                    {props.children}
                </Container>
            </div>
        );
    }
}


function ImageSection(props) {
    const classes = useStyles();

    const ImageElement = props => (
        <React.Fragment>
            <PixelImagePreview
                previewAppendix="-pixel-preview"
                className={classes.img}
                src={props.src}
                alt={props.alt}
            />
            <Typography
                variant="h6"
                className={classes.copyright}
            >© {props.copyright}</Typography>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Breakpoint small down>
                <div className={clsx(classes.fullWidthSectionSlim, classes.imageBoxMobile)}>
                    <ImageElement src={props.srcSmall} alt={props.alt} copyright={props.copyright}/>
                </div>
            </Breakpoint>
            <Breakpoint medium only>
                <div className={clsx(classes.fullWidthSectionSlim, classes.imageBoxTablet)}>
                    <ImageElement src={props.srcMedium} alt={props.alt} copyright={props.copyright}/>
                </div>
            </Breakpoint>
            <Breakpoint large up>
                <div className={clsx(classes.fullWidthSectionSlim, classes.imageBox)}>
                    <ImageElement src={props.srcLarge} alt={props.alt} copyright={props.copyright}/>
                </div>
            </Breakpoint>
        </React.Fragment>
    )
}



function EventPage () {

    return (
        <React.Fragment>
            <FullWidthSection color={"rgb(255, 255, 255)"} noMargins>
                <Section1Logo/>
            </FullWidthSection>
            <FullWidthSection color={"rgb(255, 255, 255)"}>
                <Section2Slider/>
            </FullWidthSection>
            <ImageSection
                srcSmall="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-02-sm.jpg"
                srcMedium="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-02-md.jpg"
                srcLarge="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-02-lg.jpg"
                alt="Event Image 2"
                copyright="Sven Jürgenssen"
            />
            <FullWidthSection color={"rgb(255, 255, 255)"}>
                <Section3Map/>
            </FullWidthSection>
            <ImageSection
                srcSmall="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-03-sm.jpg"
                srcMedium="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-03-md.jpg"
                srcLarge="https://storage.googleapis.com/i14-worlds-2021-upload/static/event-images/img-03-lg.jpg"
                alt="Event Image 3"
                copyright="Sven Jürgenssen"
            />
        </React.Fragment>
    );
}

export default EventPage;
