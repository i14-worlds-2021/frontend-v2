
import React from 'react';
import {connect} from 'react-redux';

import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import MailTwoToneIcon from '@material-ui/icons/MailTwoTone';
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
    headline2: {
        marginTop: theme.spacing(8)
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1)
    },
    contact_line: {
        display: "block",
        padding: theme.spacing(1),
    },
    country_line: {
        display: "block",
        padding: 0,
    },
    contact_icon: {
        display: "inline-flex",
        verticalAlign: "top"
    },
    contact_label: {
        display: "inline-flex",
        verticalAlign: "top",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: theme.spacing(1),
        marginRight: 0,
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    card: {
        position: "relative",
        padding: 0
    },
    cardMedia: {
        height: 0,
        paddingTop: '50%', // 2:1
    },
    cardContent: {
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        margin: 0,
        "&:last-child": {
            paddingBottom: theme.spacing(2),
        }
    },
    countryLinePadding: {
        paddingBottom: theme.spacing(2),
    }
}));



function ContactCard (props) {

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
            <Card className={classes.paper} elevation={3}>

                {!props.countryHost && (
                    <div className={classes.contact_line}>
                        <AssignmentTwoToneIcon className={classes.contact_icon}/>
                        <Typography variant="body1" className={classes.contact_label}>{props.contact.role}</Typography>
                    </div>
                )}

                <div className={classes.contact_line}>
                    <PersonOutlineTwoToneIcon className={classes.contact_icon}/>
                    <Typography variant="body1" className={classes.contact_label}>{props.contact.name}</Typography>
                </div>

                <div className={classes.contact_line}>
                    <MailTwoToneIcon className={classes.contact_icon}/>
                    <Typography variant="body1" className={classes.contact_label}>{props.contact.email}</Typography>
                </div>

            </Card>
        </Grid>
    )
}

function ContactPageComponent (props) {

    const classes = useStyles();

    console.log(props);

    return (
        <React.Fragment>
            <Typography variant="h4" className={classes.headline}>Contact Us</Typography>
            {props.loading && <LinearProgress className={classes.linearProgress} color="secondary"/>}

            {!props.loading && (
                <React.Fragment>
                    contact list
                    <Typography variant="h4" className={clsx(classes.headline, classes.headline2)}>Country Hosts</Typography>
                    country host list
                </React.Fragment>
            )}
        </React.Fragment>
    );
}


const mapStateToProps = state => ({
    loading: state.loading,
    contacts: state.contacts,
    countryHosts: state.countryHosts,
});

const mapDispatchToProps = () => ({
});

const ContactPage = connect(mapStateToProps, mapDispatchToProps)(ContactPageComponent);

export default ContactPage;