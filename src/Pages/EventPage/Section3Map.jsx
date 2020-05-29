
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

    return (
        <React.Fragment>
            <Breakpoint small down>
                <Paper elevation={3} className={classes.mapPaperMobile}>
                    <Map google={props.google}
                         zoom={5}
                         initialCenter={{lat: 54.836947, lng: 9.525610}}
                         style={{width: '100%', height: '75vh', borderRadius: 'inherit', overflow: "hidden"}}>
                        <Marker/>
                    </Map>
                </Paper>
            </Breakpoint>
            <Breakpoint medium only>
                <Paper elevation={3} className={classes.mapPaperTablet}>
                    <Map google={props.google}
                         zoom={5}
                         initialCenter={{lat: 54.836947, lng: 9.525610}}
                         style={{width: '100%', height: '60vh', borderRadius: 'inherit', overflow: "hidden"}}>
                        <Marker/>
                    </Map>
                </Paper>
            </Breakpoint>
            <Breakpoint large up>
                <Paper elevation={3} className={classes.mapPaper}>
                    <Map google={props.google}
                         zoom={5}
                         initialCenter={{lat: 54.836947, lng: 9.525610}}
                         style={{width: '100%', height: '50vh', borderRadius: 'inherit', overflow: "hidden"}}>
                        <Marker/>
                    </Map>
                </Paper>
            </Breakpoint>
        </React.Fragment>
    );
}

export default GoogleApiWrapper({
    apiKey: (GoogleMapsAPIKey)
})(Section3Map);
