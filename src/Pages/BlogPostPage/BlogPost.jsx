/* General Imports --------------------------------------------------------------- */
import React, {useState} from "react";
import {animateScroll as scroll} from "react-scroll";


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Material UI Imports ----------------------------------------------------------- */
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';


/* Hook Linking Imports --------------------------------------------------------------- */
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {makeStyles} from "@material-ui/core/styles";


/* Data -------------------------------------------------------------------------- */


const contentReplacements = {
	"<h6>": "<h6 class='MuiTypography-root MuiTypography-h6'>",
	"<h5>": "<h5 class='MuiTypography-root MuiTypography-h5'>",
	"<h4>": "<h4 class='MuiTypography-root MuiTypography-h4'>",
	"<h3>": "<h3 class='MuiTypography-root MuiTypography-h3'>",
	"<h2>": "<h2 class='MuiTypography-root MuiTypography-h2'>",
	"<h1>": "<h1 class='MuiTypography-root MuiTypography-h1'>",
	"<p>": "<p class='MuiTypography-root MuiTypography-body1'>",
	"<a href=": "<strong><a href=",
	"<a target=": "<strong><a target=",
	"</a>": "</a></strong>",
};


/* Styles ------------------------------------------------------------------------ */
const useStyles = makeStyles(theme => ({
	relativeContainer: {
		position: "relative",
	},
	backIcon: {
		position: "absolute",
		top: theme.spacing(1),
		left: theme.spacing(1),
	},
	headline: {
		marginLeft: theme.spacing(5),
		marginRight: theme.spacing(5),
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(2)
	},
	card: {
		position: "relative",
		cursor: "pointer"
	},
	cardMedia: {
		height: 0,
		paddingTop: '66.666%', // 3:2
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
	articleContent: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(8),
	},
	articleCredit: {
		textAlign: "center"
	}
}))


/* Component --------------------------------------------------------------------- */


function BlogPost(props) {

	let [imageSliderOpen, setImageSliderOpen] = useState(false);
	let [imageSliderIndex, setImageSliderIndex] = useState(0);

	const classes = useStyles();

	function handleLeftClick() {
		let newIndex = imageSliderIndex - 1;
		if (newIndex < 0) {
			newIndex += props.blogPost.images.length;
		}
		setImageSliderIndex(newIndex);
	}

	function handleRightClick() {
		let newIndex = (imageSliderIndex + 1) % props.blogPost.images.length;
		setImageSliderIndex(newIndex);
	}

	let blogPostContent = (
		<div className="ArticleView">
			<Link to="/news-feed"
				  className={classes.relativeContainer}
				  onClick={() => scroll.scrollToTop({duration: 300})}>
				<ArrowBackIosTwoToneIcon className={classes.backIcon} color="secondary"/>
			</Link>
			<Typography variant="h4" className={classes.headline}>{props.blogPost.title}</Typography>
			<Container maxWidth="sm">
				<Card elevation={3}
					  className={classes.card}>
					<CardMedia
						className={classes.cardMedia}
						image={props.blogPost.images[imageSliderIndex].image.formats.large.url}
						alt={""}
						onClick={() => setImageSliderOpen(true)}
					/>
					{props.blogPost.images.length > 1 && (
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
			<div className={classes.articleContent + " ArticleContent"}
				 dangerouslySetInnerHTML={{__html: props.blogPost.text}}/>
			<div className={classes.articleCredit}>
				<Typography variant="subtitle2"
							className={classes.articleCredit}>By {props.blogPost.author}</Typography>
			</div>
		</div>

	);

	return (
		<React.Fragment>
			{!imageSliderOpen && (
				<div className="NewsFeedPage">
					{blogPostContent}
				</div>
			)}
			{imageSliderOpen && (
				<ImageSlider images={props.blogPost.images}
							 index={imageSliderIndex}
							 setIndex={newIndex => setImageSliderIndex(newIndex)}
							 handleClose={() => setImageSliderOpen(false)}/>
			)}
		</React.Fragment>
	);
}

export default BlogPost;
