
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

var remark = require('remark');
var strip = require('strip-markdown');

const useStyles = makeStyles(theme => ({
    headline: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(4)
    },
    linearProgress: {
        borderRadius: "2px"
    },
    card: {
        display: 'flex',
        cursor: "pointer",
    },
    cardContentRight: {
        position: "relative",
        height: theme.spacing(16),
        marginBottom: theme.spacing(2),
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "no-wrap",
        maxWidth: `calc(100% - ${theme.spacing(32)}px)`,
    },
    cardContentBottom: {
        position: "relative",
        minHeight: theme.spacing(10),
        maxHeight: theme.spacing(18),
        marginBottom: theme.spacing(2),
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "no-wrap",
        maxWidth: `100%`,
    },
    cardContent: {
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        margin: 0,
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
    },
    cardContentOverlay: {
        position: "absolute",
        left: 0,
        bottom: "-1px",
        width: "100%",
        height: theme.spacing(4),
        background: "linear-gradient(0deg, rgba(255,255,255,1.0), rgba(255,255,255,0.0))",
    },
    cardImageLeft: {
        height: theme.spacing(18),
        width: theme.spacing(32),
    },
    cardImageTop: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

function ArticlePreview (props) {

    const classes = useStyles();

    let imageSrcMobile = "";
    let imageSrcDesktop = "";

    if (props.blogPost.images.length === 0) {
        imageSrcMobile = imageSrcDesktop = "https://wallpaperaccess.com/full/25637.jpg";
    } else {
        imageSrcMobile = props.blogPost.images[0].image.formats.medium.url;
        imageSrcDesktop = props.blogPost.images[0].image.formats.small.url;
    }

    let previewText = "";

    remark().use(strip).process(props.blogPost.text, function(err, file) {
        previewText = String(file)
    });

    console.log({raw: props.blogPost.text, processed: previewText})
    return (
        <Grid item xs={12} sm={8} md={12}>
            <Link to={"/news-feed/" + props.blogPost.identifier} style={{textDecoration: "none"}}>
                <Breakpoint small down>
                    <Card elevation={3}>
                        <CardMedia
                            className={classes.cardImageTop}
                            image={imageSrcMobile}
                        />
                        <div className={classes.cardContentBottom}>
                            <div className={classes.cardContentOverlay}/>
                            <CardContent className={classes.cardContent}>
                                <Typography component="h5" variant="h5">
                                    {props.blogPost.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {previewText}
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </Breakpoint>
                <Breakpoint medium up>
                    <Card className={classes.card} elevation={3}>
                        <CardMedia
                            className={classes.cardImageLeft}
                            image={imageSrcDesktop}
                        />
                        <div className={classes.cardContentRight}>
                            <div className={classes.cardContentOverlay}/>
                            <CardContent className={classes.cardContent}>
                                <Typography component="h5" variant="h5">
                                    {props.blogPost.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {previewText}
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </Breakpoint>
            </Link>
        </Grid>
    );
}


function NewsPageComponent (props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h4" className={classes.headline}>News Feed</Typography>
            {(props.articles.loading) && (
                <LinearProgress className={classes.linearProgress} color="secondary"/>
            )}

            {!(props.articles.loading) && (
                <React.Fragment>
                    {(props.articles.data.filter(article => article.visible).length === 0) && (
                        <Typography variant="subtitle1" style={{textAlign: "center"}}>No posts yet ...</Typography>
                    )}
                    {(props.articles.data.filter(article => article.visible).length > 0) && (
                        <Grid container spacing={2} justify="center">
                            {props.articles.data.filter(article => article.visible).map((article, index) => (
                                <ArticlePreview blogPost={article} key={index}/>
                            ))}
                        </Grid>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    articles: state.articles,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPageComponent);
