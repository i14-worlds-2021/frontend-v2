
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Section2Slider from "./Section2Slider/Section2Slider";

const useStyles = makeStyles(theme => ({
    fullWidthSection: {
        width: "100vw",
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    }
}));



function FullWidthSection(props) {

    const classes = useStyles();

    return (
        <div style={{backgroundColor: props.color}} className={classes.fullWidthSection}>
            <Container maxWidth="md">
                {props.children}
            </Container>
        </div>
    );
}


function EventPage (props) {

    return (
        <React.Fragment>
            <FullWidthSection color={"rgb(200, 50, 50)"}>
                Logo
            </FullWidthSection>
            <FullWidthSection color={"rgb(200, 200, 50)"}>
                <Section2Slider/>
            </FullWidthSection>
            <FullWidthSection color={"rgb(200, 200, 200)"}>
                Image 1: Lazy loading image! -> pixeled out :D (incl. optional copyright overlay)
            </FullWidthSection>
            <FullWidthSection color={"rgb(50, 200, 50)"}>
                Map
            </FullWidthSection>
            <FullWidthSection color={"rgb(50, 50, 200)"}>
                Image 2: Lazy loading image! -> pixeled out :D (incl. optional copyright overlay)
            </FullWidthSection>
        </React.Fragment>
    );
}

export default EventPage;
