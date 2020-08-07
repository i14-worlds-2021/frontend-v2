/* General Imports --------------------------------------------------------------- */
import React from "react";


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';


/* Hook Linking Imports --------------------------------------------------------------- */
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {makeStyles} from "@material-ui/core/styles";

import {openImageSlider, setImageSliderIndex} from '../../Wrappers/ReduxActions';
import {connect} from "react-redux";
import PixelImagePreview from "../../Components/PixelImagePreview/PixelImagePreview";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

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
	sliderControlBar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: theme.spacing(1),
		position: "relative",
		width: "100%",
	},
	icon: {
		color: theme.palette.primary.main,
		zIndex: 1250,
		cursor: "pointer",
	},
	slideNumber: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
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
	}
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

	let media;

	if (!props.invitationSlides.loading) {

		// Preload all invitation slider images
		props.invitationSlides.data["slides"].forEach(slide => {
			if (!slide["image"]["mime"].startsWith("video")) {
				let image = new Image();
				image.src = slide["image"]["url"];
			}
		})

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
			// No PixelPreview! Looks laggy ...
			media = (
				<div
					className={classes.card_media}
					onClick={() => props.openImageSlider(props.invitationSlides.data["slides"], props.imageSlider.index, true)}
				>
					<img
						src={props.invitationSlides.data["slides"][props.imageSlider.index]["image"]["url"]}
						alt="Invitation Slide"
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
					<div className={classes.sliderControlBar}>
						<IconButton
							className={classes.icon}
							onClick={handleLeftClick}>
							<ChevronLeftIcon/>
						</IconButton>
						<Typography variant="h6" className={classes.slideNumber}>
							{props.imageSlider.index+1} / {props.invitationSlides.data["slides"].length}</Typography>
						<IconButton
							className={classes.icon}
							onClick={handleRightClick}>
							<ChevronRightIcon/>
						</IconButton>
					</div>
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
