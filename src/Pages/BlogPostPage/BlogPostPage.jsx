
import React from 'react';
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    headline: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(4)
    },
    linearProgress: {
        borderRadius: "2px"
    },
}))

function BlogPostPageComponent (props) {

    const classes = useStyles();

    const blogPostIdentifier = props.match.params.identifier;
    const reducedArticles = props.articles.data.filter(article => (
        article.identifier === blogPostIdentifier && article.visible
    ));

    return (
        <React.Fragment>
            {(props.articles.loading) && (
                <LinearProgress className={classes.linearProgress} color="secondary"/>
            )}

            {!(props.articles.loading) && (
                <React.Fragment>
                    {(reducedArticles.length === 0) && (
                        "404"
                    )}
                    {(reducedArticles.length > 0) && (
                        "article"
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogPostPageComponent));
