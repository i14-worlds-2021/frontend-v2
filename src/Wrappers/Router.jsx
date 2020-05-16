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
import Container from "@material-ui/core/Container";
import Footer from "../Components/Footer/Footer";


/* Component --------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
    contentContainer: {
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        display: "block"
    },
    contentMobile: {
        position: "relative",
        marginTop: theme.spacing(0.65),
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    content: {
        position: "relative",
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    toolbar: theme.mixins.toolbar,
}));

const Content = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <NavBar/>
            <Breakpoint small down>
                <div className={classes.contentContainer}>
                    <div className={classes.toolbar}/>
                    <div className={classes.contentMobile}>
                        <Container maxWidth="md">
                            {props.children}
                        </Container>
                    </div>
                </div>
            </Breakpoint>
            <Breakpoint medium up>
                <div className={classes.contentContainer}>
                    <div className={classes.toolbar}/>
                    <div className={classes.content}>
                        <Container maxWidth="md">
                            {props.children}
                        </Container>
                    </div>
                </div>
            </Breakpoint>
            <Footer/>
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
                    <NavBar/>
                    <EventPage/>
                    <Footer/>
                </Route>

                <Route exact strict path="/news-feed">
                    <Content>
                        <NewsPage/>
                    </Content>
                </Route>

                <Route exact strict path="/news-feed/:id">
                    <Content>
                        <ArticlePage/>
                    </Content>
                </Route>

                <Route exact strict path="/sailors-guide">
                    <Content>
                        <GuidePage/>
                    </Content>
                </Route>

                <Route exact strict path="/gallery">
                    <Content>
                        <GalleryPage/>
                    </Content>
                </Route>

                <Route exact strict path="/gallery/:id">
                    <Content>
                        <AlbumPage/>
                    </Content>
                </Route>

                <Route exact strict path="/contact-us">
                    <Content>
                        <ContactPage/>
                    </Content>
                </Route>

                <Route exact strict path="/login" render={() => {
                    window.location.href = CMS_URL + "admin";
                    return null;
                }}/>

                <Route>
                    <Content>
                        404 -> index
                    </Content>
                </Route>
            </Switch>
        </Route>
    </BrowserRouter>
);
