/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';


/* Component Imports ------------------------------------------------------------- */
import {Breakpoint} from "react-socks";
import {CMS_URL} from "../constants";


/* Component --------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingLeft: 240,
        width: "100vw",
    },
    contentMobile: {
        flexGrow: 1,
        width: "100vw",
    },
    fullHeightContainer: {
        minHeight: "100vh",
    },
    children: {
        padding: theme.spacing(0),
    },
    toolbar: theme.mixins.toolbar,
}));

const Content = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Breakpoint small down>
                <main className={classes.contentMobile}>
                    <div className={classes.fullHeightContainer}>
                        <div className={classes.children}>
                            {props.children}
                        </div>
                    </div>
                    footer
                </main>
            </Breakpoint>
            <Breakpoint medium up>
                <main className={classes.content}>
                    <div className={classes.fullHeightContainer}>
                        <div className={classes.children}>
                            {props.children}
                        </div>
                    </div>
                    footer
                </main>
            </Breakpoint>
        </React.Fragment>
    );
};


export const Router = () => (
    <BrowserRouter>
        <Route>
            <Switch>
                <Route exact strict path="/">
                    index
                </Route>

                <Route exact strict path="/event">
                    navbar
                    content(event)
                    footer
                </Route>

                <Route exact strict path="/news">
                    navbar
                    content(news)
                    footer
                </Route>

                <Route exact strict path="/news/:id">
                    navbar
                    content(news-article)
                    footer
                </Route>

                <Route exact strict path="/sailors-guide">
                    navbar
                    content(sailors-guide)
                    footer
                </Route>

                <Route exact strict path="/gallery">
                    navbar
                    content(gallery)
                    footer
                </Route>

                <Route exact strict path="/gallery/:id">
                    navbar
                    content(gallery-album)
                    footer
                </Route>

                <Route exact strict path="/contact-us">
                    navbar
                    content(contact-us)
                    footer
                </Route>

                <Route exact strict path="/login" render={() => {
                    window.location.href = CMS_URL + "admin";
                    return null;
                }}/>

                <Route>
                    content(404 -> index)
                    footer
                </Route>
            </Switch>
        </Route>
    </BrowserRouter>
);
