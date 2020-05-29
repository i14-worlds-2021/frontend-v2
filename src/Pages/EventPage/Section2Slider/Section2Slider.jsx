/* General Imports --------------------------------------------------------------- */
import React, {useState} from "react";


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';


/* Hook Linking Imports --------------------------------------------------------------- */
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {makeStyles} from "@material-ui/core/styles";

import {openImageSlider, setImageSliderIndex} from '../../../Wrappers/ReduxActions';
import {connect} from "react-redux";
import PixelImagePreview, {insertAppendix} from "../../../Components/PixelImagePreview/PixelImagePreview";
import CircularProgress from "@material-ui/core/CircularProgress";

/* Data -------------------------------------------------------------------------- */



/* Styles ------------------------------------------------------------------------ */
const useStyles = makeStyles((theme) => ({
	card: {
		position: "relative"
	},
	cardMedia: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	icon: {
		position: "absolute",
		color: "white",
		zIndex: 3000,
		cursor: "pointer",
	},
	prevIcon: {
		left: theme.spacing(1),
		top: theme.spacing(1),
		zIndex: "200",
	},
	nextIcon: {
		right: theme.spacing(1),
		top: theme.spacing(1),
		zIndex: "200",
	},
	card_media: {
		display: "block",
		width: "100%",
		height: 0,
		zIndex: "200",
		paddingTop: '56.25%', // 16:9

		"& img, & video": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
		}
	},
	card_media_loading_box: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	brightColor: {
		color: theme.palette.white.main,
	},
	darkColor: {
		color: theme.palette.primary.main,
	},
	brightBackgroundColor: {
		backgroundColor: theme.palette.white.transparent40,
		"&:hover": {
			backgroundColor: theme.palette.white.transparent40,
		}
	},
	darkBackgroundColor: {
		backgroundColor: theme.palette.primary.transparent40,
		"&:hover": {
			backgroundColor: theme.palette.primary.transparent40,
		}
	},
}))


/* Component --------------------------------------------------------------------- */


function Section2SliderComponent(props) {

	const classes = useStyles();

	function handleLeftClick() {
		let newIndex = props.imageSlider.index - 1;
		if (newIndex < 0) {
			newIndex += props.invitationSlides.data["slides"].length;
		}
		props.setImageSliderIndex(newIndex);
	}

	function handleRightClick() {
		let newIndex = (props.imageSlider.index + 1) % props.invitationSlides.data["slides"].length;
		props.setImageSliderIndex(newIndex);
	}

	let media, brightSlide;

	if (!props.invitationSlides.loading) {
		brightSlide = !props.invitationSlides.data["slides"][props.imageSlider.index]["darkBackground"];

		if (props.invitationSlides.data["slides"][props.imageSlider.index]["image"]["mime"].startsWith("video")) {
			media = (
				<div className={classes.card_media}>
					<video controls>
						<source
							style={{zIndex: "200"}}
							src={props.invitationSlides.data["slides"][props.imageSlider.index]["image"]["url"]}
							type={props.invitationSlides.data["slides"][props.imageSlider.index]["image"]["mime"]}/>
					</video>
				</div>
			);
		} else {
			media = (
				<div
					className={classes.card_media}
					onClick={() => props.openImageSlider(props.invitationSlides.data["slides"], props.imageSlider.index, true)}
				>
					<PixelImagePreview
						src={props.invitationSlides.data["slides"][props.imageSlider.index]["image"]["url"]}
						previewAppendix="-pixel-preview"
						alt="Invitation Slide"
						noDelay
					/>
				</div>
			);
		}
	}

	return (
		<React.Fragment>
			{props.invitationSlides.loading && (
				<Card elevation={3}
					  className={classes.card}>
					<div className={classes.card_media}>
						<div className={classes.card_media_loading_box}>
							<CircularProgress color="secondary"/>
						</div>
					</div>
				</Card>
			)}
			{!props.invitationSlides.loading && (
				<Card elevation={3}
					  className={classes.card}>
					{media}
					<IconButton
						className={clsx(
							classes.icon, classes.prevIcon,
							brightSlide ? classes.brightColor : classes.darkColor,
							brightSlide ? classes.darkBackgroundColor : classes.brightBackgroundColor
						)}
						size="small"
						onClick={handleLeftClick}>
						<ChevronLeftIcon/>
					</IconButton>
					<IconButton
						className={clsx(
							classes.icon, classes.nextIcon,
							brightSlide ? classes.brightColor : classes.darkColor,
							brightSlide ? classes.darkBackgroundColor : classes.brightBackgroundColor
						)}
						size="small"
						onClick={handleRightClick}>
						<ChevronRightIcon/>
					</IconButton>
				</Card>
			)}
		</React.Fragment>
	);
}

const mapStateToProps = state => ({
	imageSlider: state.imageSlider,
	invitationSlides: state.invitationSlides
});

const mapDispatchToProps = dispatch => ({
	openImageSlider: (images, index, noDelay) => dispatch(openImageSlider(images, index, noDelay)),
	setImageSliderIndex: (index) => dispatch(setImageSliderIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Section2SliderComponent);
