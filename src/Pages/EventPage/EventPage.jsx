
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Section2Slider from "./Section2Slider";
import Section3Map from "./Section3Map";
import Section1Logo from "./Section1Logo";
import PixelImagePreview from "../../Components/PixelImagePreview/PixelImagePreview";
import clsx from "clsx";
import {Breakpoint} from "react-socks";


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
        height: "80vh",
        position: "relative",
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 110
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

    const imgComponent = (
        <PixelImagePreview
            previewAppendix="-pixel-preview"
            className={classes.img}
            src={props.src}
            alt={props.alt}
        />
    );

    return (
        <React.Fragment>
            <Breakpoint small down>
                <div className={clsx(classes.fullWidthSectionSlim, classes.imageBoxMobile)}>
                    {imgComponent}
                </div>
            </Breakpoint>
            <Breakpoint medium only>
                <div className={clsx(classes.fullWidthSectionSlim, classes.imageBoxTablet)}>
                    {imgComponent}
                </div>
            </Breakpoint>
            <Breakpoint large up>
                <div className={clsx(classes.fullWidthSectionSlim, classes.imageBox)}>
                    {imgComponent}
                </div>
            </Breakpoint>
        </React.Fragment>
    )
}



function EventPage () {

    return (
        <React.Fragment>
            <FullWidthSection color={"rgb(200, 50, 50)"} noMargins>
                <Section1Logo/>
            </FullWidthSection>
            <FullWidthSection color={"rgb(255, 255, 255)"}>
                <Section2Slider/>
            </FullWidthSection>
            <ImageSection
                src="https://storage.googleapis.com/i14-worlds-2021-upload/DSC2737_2cab11f170/_DSC2737_DSC2737_2cab11f170.jpeg"
                alt="Event Image 2"
            />
            <FullWidthSection color={"rgb(50, 200, 50)"}>
                <Section3Map/>
            </FullWidthSection>
            <ImageSection
                src="https://storage.googleapis.com/i14-worlds-2021-upload/DSC2737_2cab11f170/_DSC2737_DSC2737_2cab11f170.jpeg"
                alt="Event Image 3"
            />
        </React.Fragment>
    );
}

export default EventPage;
