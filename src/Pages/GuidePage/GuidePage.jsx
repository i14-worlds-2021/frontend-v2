
import React from 'react';
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    headline: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(4)
    },
    linearProgress: {
        borderRadius: "2px"
    },
}));

function GuidePageComponent (props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h4" className={classes.headline}>Sailors Guide</Typography>
            {(props.scheduleDays.loading) && (
                <LinearProgress className={classes.linearProgress} color="secondary"/>
            )}

            {!(props.scheduleDays.loading) && (
                <React.Fragment>
                    {props.scheduleDays.data.map((contact, index) => (
                        "day"
                    ))}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    scheduleDays: state.scheduleDays,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GuidePageComponent);

