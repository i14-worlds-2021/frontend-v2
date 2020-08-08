import React, {useEffect} from 'react';
import './ImageSlider.scss';

import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {setImageSliderIndex, closeImageSlider} from "../../Wrappers/ReduxActions";
import PixelImagePreview from "../PixelImagePreview/PixelImagePreview";

const useStyles = makeStyles(theme => ({
	imageSlider: {
		backgroundColor: theme.palette.primary.main,
	},
	icon: {
		backgroundColor: theme.palette.primary.main,
		position: "fixed",
		color: "white",
		zIndex: 3000
	},
	closeIcon: {
		right: theme.spacing(2),
		top: theme.spacing(2),
	},
	prevIcon: {
		left: theme.spacing(2),
		bottom: theme.spacing(2),
	},
	nextIcon: {
		right: theme.spacing(2),
		bottom: theme.spacing(2),
	},
}))

function ImageSliderComponent (props) {

	const classes = useStyles();

	function handleKeydown (event) {
		if (event.key === "Escape") {
			props.closeImageSlider();
		} else if (props.imageSlider.images.length > 1) {
			if (event.key === "ArrowLeft") {
				handleLeftClick();
			} else if (event.key === "ArrowRight") {
				handleRightClick();
			}
		}
	}

	document.addEventListener("keydown", handleKeydown);

	// When useEffect returns a function this function will
	// be treated as the "componentWillUnmount" function
	useEffect(() => {
		return () => {
			document.removeEventListener("keydown", handleKeydown);
		}
	})

	function handleLeftClick() {
		let newIndex = props.imageSlider.index - 1;
		if (newIndex < 0) {
			newIndex += props.imageSlider.images.length;
		}
		props.setImageSliderIndex(newIndex);
	}

	function handleRightClick() {
		let newIndex = (props.imageSlider.index + 1) % props.imageSlider.images.length;
		props.setImageSliderIndex(newIndex);
	}

	let media;

	if (props.imageSlider.images[props.imageSlider.index].image.mime.startsWith("video")) {
		media = (
			<video controls>
				<source
					style={{zIndex: "200"}}
					src={props.imageSlider.images[props.imageSlider.index].image.url}
					type={props.imageSlider.images[props.imageSlider.index].image.mime}/>
			</video>
		);
	} else {
		media = (
			<PixelImagePreview
				src={props.imageSlider.images[props.imageSlider.index].image.url}
				previewAppendix="-pixel-preview"
				alt={props.imageSlider.images[props.imageSlider.index].identifier}
				noDelay={props.imageSlider.noDelay}
			/>
		);
	}

	return (
		<div className={clsx(classes.imageSlider, "ImageSlider")}>
			<div className="ImageContainer">
				{media}
			</div>
			<IconButton
				className={clsx(classes.icon, classes.closeIcon)}
				size="medium"
				onClick={props.closeImageSlider}>
				<CloseIcon/>
			</IconButton>
			{(props.imageSlider.images.length > 1) && (
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
		</div>
	);


}


const mapStateToProps = state => ({
	imageSlider: state.imageSlider,
});

const mapDispatchToProps = (dispatch) => ({
	setImageSliderIndex: (index) => dispatch(setImageSliderIndex(index)),
	closeImageSlider: () => dispatch(closeImageSlider()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageSliderComponent);
