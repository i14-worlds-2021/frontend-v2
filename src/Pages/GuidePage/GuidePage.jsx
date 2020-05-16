
import React from 'react';
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import {makeStyles} from "@material-ui/core/styles";
import ScheduleTable from "./ScheduleTable/ScheduleTable";

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
                    <ScheduleTable days={props.scheduleDays.data}/>
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

