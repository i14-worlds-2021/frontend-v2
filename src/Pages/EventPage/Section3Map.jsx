
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import {GoogleMapsAPIKey} from "../../constants";
import {Breakpoint} from "react-socks";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    mapPaper: {
        position: "relative",
        diplay: "block",
        height: "50vh",
        width: "100%",
        overflow: "hidden"
    },
    mapPaperTablet: {
        position: "relative",
        diplay: "block",
        height: "60vh",
        width: "100%",
        overflow: "hidden"
    },
    mapPaperMobile: {
        position: "relative",
        diplay: "block",
        height: "75vh",
        width: "100%",
        overflow: "hidden"
    }
}));


function Section3Map (props) {

    const classes = useStyles();
    const google = props.google;

    const MapComponent = (props) => (
        <Map google={google}
             zoom={5}
             initialCenter={{lat: 54.836947, lng: 9.525610}}
             style={{width: '100%', height: props.height, borderRadius: 'inherit', overflow: "hidden"}}>
            <Marker/>
        </Map>
    );

    return (
        <React.Fragment>
            <Breakpoint small down>
                <Paper elevation={3} className={classes.mapPaperMobile}>
                    <MapComponent height="75vh"/>
                </Paper>
            </Breakpoint>
            <Breakpoint medium only>
                <Paper elevation={3} className={classes.mapPaperTablet}>
                    <MapComponent height="60vh"/>
                </Paper>
            </Breakpoint>
            <Breakpoint large up>
                <Paper elevation={3} className={classes.mapPaper}>
                    <MapComponent height="50vh"/>
                </Paper>
            </Breakpoint>
        </React.Fragment>
    );
}

export default GoogleApiWrapper({
    apiKey: (GoogleMapsAPIKey)
})(Section3Map);
