/* General Imports --------------------------------------------------------------- */
import React, {useState} from 'react';
import {animateScroll as scroll} from 'react-scroll';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Styling Imports --------------------------------------------------------------- */
import {makeStyles} from "@material-ui/core/styles";
import './NavBar.scss';
import clsx from 'clsx';


/* Material UI Imports ----------------------------------------------------------- */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import MenuIcon from '@material-ui/icons/Menu';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import PermMediaTwoToneIcon from '@material-ui/icons/PermMediaTwoTone';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import ContactMailTwoToneIcon from '@material-ui/icons/ContactMailTwoTone';


/* Asset Imports ----------------------------------------------------------- */
import {setImageSliderIndex} from "../../Wrappers/ReduxActions";
import {connect} from "react-redux";


/* Component --------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
	navBar: {
		backgroundColor: theme.palette.primary.main,
	},
	fixedBadge: {
		position: "fixed",
		margin: theme.spacing(2),
		top: "0px",
		backgroundColor: "white",
		borderRadius: "4px",
	},
	menuBadge: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		left: "0px",
		zIndex: "1100",
	},
	menuBadgeTitle: {
		padding: theme.spacing(0.5),
		paddingRight: theme.spacing(2),
	},
	logoBadge: {
		paddingLeft: theme.spacing(1.3),
		paddingRight: theme.spacing(1.3),
		right: "0px",
		zIndex: "1500",
	},
	badgeElement: {
		margin: theme.spacing(0.5),
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	title: {
		flexGrow: 1,
	},
	I14Button: {
		marginTop: 4,
		backgroundColor: "transparent !important",
		overflow: "visible",
		borderRadius: "0",
	},
	I14Icon: {
		backgroundColor: "transparent !important",
		height: theme.spacing(5),
		margin: "-6px",
	},
	button: {
		margin: theme.spacing(1),
		marginBottom: 0,
		padding: theme.spacing(1),
		width: "225px",
		alignItems: "flex-start",
		justifyContent: "left",
		textTransform: "capitalize",
		transitionDelay: 0,
		transitionDuration: 0
	},
	topButton: {
		marginTop: theme.spacing(1)
	},
	link: {
		textDecoration: "none",
		display: "block"
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
	drawerBox: {
		height: "100vh",
		position: "relative",
	},
	drawerScrollBox: {
		paddingBottom: theme.spacing(10),
	},
	loginButtonBox: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		position: "fixed",
		left: 0,
		bottom: 0,
		backgroundColor: "white",
	},
	loginButton: {
		padding: theme.spacing(1),
		width: "225px",
		textTransform: "capitalize",
	},
}));

function NavBarComponent(props) {

	const [drawerIsOpen, toggleDrawer] = useState(false);
	const path = window.location.pathname;

	const classes = useStyles();

	let pageTitle = "";

	switch (path.split("/")[1]) {
		case "event":
			pageTitle = "Event";
			break;
		case "news-feed":
			pageTitle = "News Feed";
			break;
		case "gallery":
			pageTitle = "Gallery";
			break;
		case "sailors-guide":
			pageTitle = "Sailors Guide";
			break;
		case "contact-us":
			pageTitle = "Contact Us";
			break;
		default:
			break;
	}

	const handleClick = () => {
		scroll.scrollToTop({duration: 300});
		props.setImageSliderIndex(0);
	};

	const userPages = (
		<React.Fragment>
			<Link to="/event"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/event") ? "secondary" : "primary"}
				        startIcon={<EmojiEventsTwoToneIcon alt="Event Icon"/>}
				        className={clsx(classes.button, classes.topButton)}>Event</Button>
			</Link>
			<Link to="/news-feed"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/news-feed") ? "secondary" : "primary"}
				        startIcon={<ChatTwoToneIcon alt="News Feed Icon"/>}
				        className={classes.button}>News Feed</Button>
			</Link>
			<Link to="/gallery"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/gallery") ? "secondary" : "primary"}
				        startIcon={<PermMediaTwoToneIcon alt="Gallery Icon"/>}
				        className={classes.button}>Gallery</Button>
			</Link>
			<Link to="/sailors-guide"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/sailors-guide") ? "secondary" : "primary"}
				        startIcon={<AssignmentTurnedInTwoToneIcon alt="Sailors Guide Icon"/>}
				        className={classes.button}>Sailors Guide</Button>
			</Link>
			<Link to="/contact-us"
			      className={classes.link}
			      onClick={handleClick}>
				<Button size="large"
				        color={path.startsWith("/contact-us") ? "secondary" : "primary"}
				        startIcon={<ContactMailTwoToneIcon alt="Contact Us Icon"/>}
				        className={classes.button}>Contact Us</Button>
			</Link>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<div className={clsx(classes.fixedBadge, classes.menuBadge)}>
				<IconButton edge="start"
							color="inherit"
							aria-label="menu"
							className={classes.badgeElement}
							onClick={() => toggleDrawer(true)}>
					<MenuIcon alt="Menu Icon"/>
				</IconButton>
				<Typography variant="h6" className={classes.menuBadgeTitle}>{pageTitle}</Typography>
			</div>
			<div className={clsx(classes.fixedBadge, classes.logoBadge)}>
				<IconButton className={classes.I14Button} disableRipple={true}>
					<Link to="/">
						<img
							src="https://storage.googleapis.com/i14-worlds-2021-upload/static/logo-versions/compact-logo-blue.svg"
							className={classes.I14Icon} alt="I14 Icon"
						/>
					</Link>
				</IconButton>
			</div>
			{/*
			<AppBar position="fixed" className={classes.navBar}>
				<Toolbar>
					<IconButton edge="start"
					            color="inherit"
					            aria-label="menu"
					            className={classes.menuButton}
					            onClick={() => toggleDrawer(true)}>
						<MenuIcon alt="Menu Icon"/>
					</IconButton>
					<Typography variant="h6" className={classes.title}>{pageTitle}</Typography>
					<IconButton edge="end"
					            aria-label="index"
					            className={classes.I14Button}
					            disableRipple={true}>
						<Link to="/">
							<img src={HeaderLogo} className={classes.I14Icon} alt="I14 Icon"/>
						</Link>
					</IconButton>
				</Toolbar>
			</AppBar>*/}
			<Drawer open={drawerIsOpen}
			        onClose={() => toggleDrawer(false)}
			        onClick={() => toggleDrawer(false)}
			        onKeyDown={() => toggleDrawer(false)}>
				<div role="presentation" className={classes.drawerBox}>
					<div className={classes.drawerScrollBox}>
						{userPages}
					</div>
				</div>
			</Drawer>
		</React.Fragment>
	);
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	setImageSliderIndex: (index) => dispatch(setImageSliderIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
