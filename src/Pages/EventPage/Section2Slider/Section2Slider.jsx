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

/* Data -------------------------------------------------------------------------- */



/* Styles ------------------------------------------------------------------------ */
const useStyles = makeStyles(theme => ({
	relativeContainer: {
		position: "relative",
	},
	card: {
		position: "relative",
		cursor: "pointer"
	},
	cardMedia: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	icon: {
		position: "absolute",
		color: "white",
		zIndex: 3000
	},
	prevIcon: {
		left: theme.spacing(1),
		bottom: theme.spacing(1),
		zIndex: "200",
	},
	nextIcon: {
		right: theme.spacing(1),
		bottom: theme.spacing(1),
		zIndex: "200",
	},
}))


/* Component --------------------------------------------------------------------- */


function Section2SliderComponent(props) {

	const classes = useStyles();

	function handleLeftClick() {
		let newIndex = props.imageSlider.index - 1;
		if (newIndex < 0) {
			newIndex += props.blogPost.images.length;
		}
		props.setImageSliderIndex(newIndex);
	}

	function handleRightClick() {
		let newIndex = (props.imageSlider.index + 1) % props.blogPost.images.length;
		props.setImageSliderIndex(newIndex);
	}

	return (
		<React.Fragment>
			<div className="NewsFeedPage">
				{props.invitationSlides.loading && (
					"loading ..."
				)}
				{!props.invitationSlides.loading && (
					<div className="ArticleView">
						<Container maxWidth="md">
							<Card elevation={3}
								  className={classes.card, classes.relativeContainer}>
								<CardMedia
									className={classes.cardMedia}
									image={props.invitationSlides.data.slides[props.imageSlider.index].image.url}
									alt={""}
									onClick={() => props.openImageSlider(props.invitationSlides.data.slides, props.imageSlider.index)}
								/>
								{props.invitationSlides.data.slides > 1 && (
									<React.Fragment>
										<IconButton
											className={clsx(classes.icon, classes.prevIcon)}
											size="medium"
											onClick={handleLeftClick}>
											<ChevronLeftIcon/>
										</IconButton>
										<IconButton
											className={clsx(classes.icon, classes.nextIcon)}
											size="medium"
											onClick={handleRightClick}>
											<ChevronRightIcon/>
										</IconButton>
									</React.Fragment>
								)}
							</Card>
						</Container>
					</div>
				)}
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = state => ({
	imageSlider: state.imageSlider,
	invitationSlides: state.invitationSlides
});

const mapDispatchToProps = dispatch => ({
	openImageSlider: (images, index) => dispatch(openImageSlider(images, index)),
	setImageSliderIndex: (index) => dispatch(setImageSliderIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Section2SliderComponent);
