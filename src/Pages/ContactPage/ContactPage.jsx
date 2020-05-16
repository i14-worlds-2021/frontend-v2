
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
    contactLine: {
        display: "block",
        padding: theme.spacing(1),
    },
    contactIcon: {
        display: "inline-flex",
        verticalAlign: "top"
    },
    contactLabel: {
        display: "inline-flex",
        verticalAlign: "top",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: theme.spacing(1),
        marginRight: 0,
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    contactEmail: {
        color: "inherit",
        textDecoration: "none"
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
    contactLinePadding: {
        paddingBottom: theme.spacing(2),
    }
}));



function ContactCard (props) {

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
            <Card elevation={3}>
                <CardMedia
                    className={classes.cardMedia}
                    image={props.contact.image.url}
                />
                <CardContent className={classes.cardContent}>
                    {!props.countryHost && (
                        <div className={classes.contactLinePadding}>
                            <AssignmentTwoToneIcon className={classes.contactIcon}/>
                            <Typography variant="body1" className={classes.contactLabel}>{props.contact.role}</Typography>
                        </div>
                    )}

                    <div className={classes.contactLinePadding}>
                        <PersonOutlineTwoToneIcon className={classes.contactIcon}/>
                        <Typography variant="body1"
                                    className={classes.contactLabel}>{props.contact.name}</Typography>
                    </div>
                    <div>
                        <MailTwoToneIcon className={classes.contactIcon}/>
                        <Typography variant="body1"
                                    className={classes.contactLabel}>
                            <a className={classes.contactEmail}
                               href={"mailto:" + props.contact.email}
                               target="_blank">{props.contact.email}</a>
                        </Typography>
                    </div>
                </CardContent>

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
            {(props.contacts.loading || props.countryHosts.loading) && (
                <LinearProgress className={classes.linearProgress} color="secondary"/>
            )}

            {!(props.contacts.loading || props.countryHosts.loading) && (
                <React.Fragment>
                    <Grid container spacing={2} justify="center">
                        {props.contacts.data.map((contact, index) => (
                            <ContactCard contact={contact}/>
                        ))}
                    </Grid>
                    <Typography variant="h4" className={clsx(classes.headline, classes.headline2)}>Country Hosts</Typography>
                    <Grid container spacing={2} justify="center">
                        {props.countryHosts.data.map((contact, index) => (
                            <ContactCard contact={contact} countryHost/>
                        ))}
                    </Grid>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}


const mapStateToProps = state => ({
    contacts: state.contacts,
    countryHosts: state.countryHosts,
});

const mapDispatchToProps = () => ({
});

const ContactPage = connect(mapStateToProps, mapDispatchToProps)(ContactPageComponent);

export default ContactPage;