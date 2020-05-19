/* General Imports --------------------------------------------------------------- */
import React from 'react'
import {animateScroll as scroll} from 'react-scroll';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Hook Linking Imports --------------------------------------------------------------- */
// noinspection ES6CheckImport
import {openImageSlider, setImageSliderIndex} from "../../Wrappers/ReduxActions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

/* ------------------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
	backIcon: {
		position: "absolute",
		top: theme.spacing(1),
		left: theme.spacing(1),
	},
	headline: {
		paddingLeft: theme.spacing(5),
		paddingRight: theme.spacing(5),
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
	},
	root: {
		flexGrow: 1,
	},
	card: {
		position: "relative",
		cursor: "pointer"
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
	},
	galleryPage: {
		position: "relative",
	},
}));


function Image(props) {

	const classes = useStyles();

	return (
		<Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
			<Card elevation={3} className={classes.card} onClick={props.openImageSlider}>
				<CardMedia
					className={classes.cardMedia}
					image={props.image.image.formats.medium.url}
				/>
			</Card>
		</Grid>
	);
}

function AlbumComponent(props) {

	const classes = useStyles();

	let imageList = props.album.images.map((image, index) => (
		<Image image={image} index={index} key={index}
			   openImageSlider={() => props.openImageSlider(props.album.images, index)}/>
	));

	return (
		<React.Fragment>
			<div className={classes.galleryPage}>
				<Link to="/gallery"
					  onClick={() => scroll.scrollToTop({duration: 300})}>
					<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
				</Link>
				<Typography variant="h4" className={classes.headline}>{props.album.name}</Typography>
				<Grid container spacing={2}>
					{imageList}
				</Grid>
			</div>
		</React.Fragment>
	);
}


const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	openImageSlider: (images, index) => dispatch(openImageSlider(images, index))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumComponent);
