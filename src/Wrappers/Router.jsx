/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';


/* Routing Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {Switch, Route, BrowserRouter} from 'react-router-dom';


/* Component Imports ------------------------------------------------------------- */
import {Breakpoint} from "react-socks";
import {CMS_URL} from "../constants";
import IndexPage from "../Pages/IndexPage/IndexPage";
import EventPage from "../Pages/EventPage/EventPage";
import NewsPage from "../Pages/NewsPage/NewsPage";
import ArticlePage from "../Pages/ArticlePage/ArticlePage";
import GuidePage from "../Pages/GuidePage/GuidePage";
import GalleryPage from "../Pages/GalleryPage/GalleryPage";
import AlbumPage from "../Pages/AlbumPage/AlbumPage";
import ContactPage from "../Pages/ContactPage/ContactPage";
import NavBar from "../Components/NavBar/NavBar";


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
                    <IndexPage/>
                </Route>

                <Route exact strict path="/event">
                    <NavBar loggedIn={false}/>
                    <EventPage/>
                    footer
                </Route>

                <Route exact strict path="/news">
                    content(<NewsPage/>)
                </Route>

                <Route exact strict path="/news/:id">
                    content(<ArticlePage/>)
                </Route>

                <Route exact strict path="/sailors-guide">
                    content(<GuidePage/>)
                </Route>

                <Route exact strict path="/gallery">
                    content(<GalleryPage/>)
                </Route>

                <Route exact strict path="/gallery/:id">
                    content(<AlbumPage/>)
                </Route>

                <Route exact strict path="/contact-us">
                    content(<ContactPage/>)
                </Route>

                <Route exact strict path="/login" render={() => {
                    window.location.href = CMS_URL + "admin";
                    return null;
                }}/>

                <Route>
                    content(404 -> index)
                </Route>
            </Switch>
        </Route>
    </BrowserRouter>
);
