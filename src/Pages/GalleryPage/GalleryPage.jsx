
import React from 'react';
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Link} from "react-router-dom";
import {Breakpoint} from "react-socks";


const useStyles = makeStyles(theme => ({
    headline: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(4)
    },
    linearProgress: {
        borderRadius: "2px"
    },
    root: {
        flexGrow: 1,
    },
    card: {
        position: "relative",
        cursor: "pointer",
        minWidth: 250
    },
    cardMedia: {
        height: 0,
        paddingTop: '66.666%', // 3:2
    },
    cardContent: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
        height: "100%",
        left: 0,
        bottom: 0,

        paddingTop: 0,
        margin: 0,
        "&:last-child": {
            padding: 0
        },

        backgroundColor: "hsla(0, 0%, 100%, 0.75)",
        color: "black",

        textAlign: "center",
    }
}));

// noinspection DuplicatedCode
function AlbumPreview (props) {

    const classes = useStyles();

    let imageSrcMobile = "";
    let imageSrcDesktop = "";

    if (props.album.images.length === 0) {
        // TODO: Add proper placeholder image
        imageSrcMobile = "https://www.sail-world.com/photos/international14/yysw256218.jpg";
        imageSrcDesktop = "https://www.sail-world.com/photos/international14/yysw256218.jpg";
    } else {
        imageSrcMobile = props.album.images[0].image.formats.medium.url;
        imageSrcDesktop = props.album.images[0].image.formats.small.url;
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Link to={"gallery/" + props.album.identifier}>
                <Card elevation={3} className={classes.card}>
                    <Breakpoint small down>
                        <CardMedia
                            className={classes.cardMedia}
                            image={imageSrcMobile}
                            alt={"Images inside " + props.album.name}
                        />
                    </Breakpoint>
                    <Breakpoint medium up>
                        <CardMedia
                            className={classes.cardMedia}
                            image={imageSrcDesktop}
                            alt={"Images inside " + props.album.name}
                        />
                    </Breakpoint>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6">
                            {props.album.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
}


function GalleryPageComponent (props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h4" className={classes.headline}>Image Gallery</Typography>
            {(props.albums.loading) && (
                <LinearProgress className={classes.linearProgress} color="secondary"/>
            )}

            {!(props.albums.loading) && (
                <React.Fragment>
                    {(props.albums.data.filter(article => article.visible).length === 0) && (
                        <Typography variant="subtitle1" style={{textAlign: "center"}}>No posts yet ...</Typography>
                    )}
                    {(props.albums.data.filter(article => article.visible).length > 0) && (
                        <Grid container spacing={2}>
                            {props.albums.data.filter(album => album.visible).map((album, index) => (
                                <AlbumPreview album={album} key={index}/>
                            ))}
                        </Grid>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    albums: state.albums,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPageComponent);
