import React, {useState} from 'react';
import './ImageSlider.scss';

import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	imageSlider: {
		backgroundColor: theme.palette.primary.main,
	},
	card: {
		margin: theme.spacing(2),
		maxWidth: `calc(100vw - ${theme.spacing(4)}px)`,
		maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
	},
	img: {
		maxWidth: `calc(100vw - ${theme.spacing(4)}px)`,
		maxHeight: `calc(100vh - ${theme.spacing(4)}px)`,
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

function ImageSlider (props) {

	const classes = useStyles();

	let [loading, setLoading] = useState(true);

	document.addEventListener("keydown", event => {
		if (event.key === "Escape") {
			props.close();
		} else if (props.images.length > 1) {
			if (event.key === "ArrowLeft") {
				handleLeftClick();
			} else if (event.key === "ArrowRight") {
				handleRightClick();
			}
		}
	});

	function handleLeftClick() {
		let newIndex = props.index - 1;
		if (newIndex < 0) {
			newIndex += props.images.length;
		}
		setLoading(true);
		props.setIndex(newIndex);
	}

	function handleRightClick() {
		let newIndex = (props.index + 1) % props.images.length;
		setLoading(true);
		props.setIndex(newIndex);
	}

	return (
		<div className={clsx(classes.imageSlider, "ImageSlider")}>
			<div className="Image">
				<CircularProgress style={{color: "white", display: loading ? "block" : "none"}}/>
				<Card className={classes.card}
					  elevation={3}
					  style={{display: loading ? "none" : "block"}}>
					<img className={classes.img}
						 src={props.images[props.index].image.url}
						 alt={"identifier"}
						 onLoad={() => setLoading(false)}
					/>
				</Card>
			</div>
			<IconButton
				className={clsx(classes.icon, classes.closeIcon)}
				size="medium"
				onClick={props.handleClose}>
				<CloseIcon/>
			</IconButton>
			{(props.images.length > 1) && (
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

export default ImageSlider;
