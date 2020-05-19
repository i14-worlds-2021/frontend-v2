
import React from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
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

function AlbumPageComponent (props) {

    const classes = useStyles();

    const blogPostIdentifier = props.match.params.identifier;
    const reducedArticles = props.albums.data.filter(album => (
        (album.identifier === blogPostIdentifier) && album.visible
    ));

    return (
        <React.Fragment>
            {(props.albums.loading) && (
                <LinearProgress className={classes.linearProgress} color="secondary"/>
            )}

            {!(props.albums.loading) && (
                <React.Fragment>
                    {(reducedArticles.length === 0) && (
                        "404"
                    )}
                    {(reducedArticles.length > 0) && (
                        "album"
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlbumPageComponent));
