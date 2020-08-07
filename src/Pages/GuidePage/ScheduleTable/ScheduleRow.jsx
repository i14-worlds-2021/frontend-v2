import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import clsx from 'clsx';

import Breakpoint from 'react-socks';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	coloredRow: {
		borderLeftColor: theme.palette.primary.main,
		borderLeft: "3px solid",
		paddingLeft: "-3px"
	},
	notColoredRow: {
		borderLeftColor: "transparent",
		borderLeft: "3px solid",
		paddingLeft: "-3px"
	},
	weekendRow: {
		backgroundColor: theme.palette.primary.transparent03
	},
	gridItem: {
		display: "flex",
		alignItems: "center",
		justifyContent: "left",
		whiteSpace: "pre-line",
	},
	detailsBlock: {
		marginRight: theme.spacing(4),
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	mobileDetailLabel: {
		paddingBottom: theme.spacing(1),
	},
}));

export default function ScheduleRow(props) {
	const classes = useStyles();

	let detailRows = props.day.events.map((event, index) => {
		return (
			<React.Fragment key={index}>
				{index !== 0 && (
					<Grid item xs={12}>
						<Divider className={classes.divider}/>
					</Grid>
				)}
				<Grid item xs={12}>
					<Breakpoint small down>
						<Grid container justify="flex-start">
							<Grid item xs={12} md={2} className={clsx(classes.gridItem, classes.mobileDetailLabel)}>
								<Typography variant="body1" style={{fontWeight: 500}}>{event.label}</Typography>
							</Grid>
							<Grid item xs={12} md={10} className={classes.gridItem}>
								<Typography variant="body1">{event.description}</Typography>
							</Grid>
						</Grid>
					</Breakpoint>
					<Breakpoint medium up>
						<Grid container justify="flex-start">
							<Grid item xs={12} md={2} className={classes.gridItem}>
								<Typography variant="body1" style={{fontWeight: 500}}>{event.label}</Typography>
							</Grid>
							<Grid item xs={12} md={10} className={classes.gridItem}>
								<Typography variant="body1">{event.description}</Typography>
							</Grid>
						</Grid>
					</Breakpoint>
				</Grid>
			</React.Fragment>
		);
	});

	// I did this date-label conversion myself because I did
	// not want any unncessary library (e.g. date-fns has a pretty
	// hefty bundle for what I would use it for)

	const day = parseInt(props.day.date.slice(8,10));
	const month = parseInt(props.day.date.slice(5,7));

	let dayLabel = day.toString();

	/*
	// looks nicer without!
	if (day > 20) {
		if (day % 10 === 1) {
			dayLabel += "st";
		} else if (day % 10 === 2) {
			dayLabel += "nd";
		} else if (day % 10 === 3) {
			dayLabel += "rd";
		} else {
			dayLabel += "th";
		}
	} else {
		dayLabel += "th";
	}
	*/


	let monthLabel = "";
	switch (month) {
		case 6:
			monthLabel = "Jun";
			break;
		case 7:
			monthLabel = "Jul";
			break;
		case 8:
			monthLabel = "Aug";
			break;
		case 9:
			monthLabel = "Sep";
			break;
		case 10:
			monthLabel = "Oct";
			break;
		default:
			dayLabel = monthLabel = "";
			break;
	}

	const dateLabel = monthLabel + " " + dayLabel + " ";

	return (
		<ExpansionPanel elevation={3}>
			<ExpansionPanelSummary
				expandIcon={<ExpandMoreIcon/>}
				aria-controls="panel1a-content"
				id="panel1a-header"
				className={clsx(
					props.day.color === 1 ? classes.coloredRow : classes.notColoredRow,
					props.day.weekday[0] === 'S' ? classes.weekendRow : ""
				)}
			>
				<Breakpoint small down>
					<Grid container justify="flex-start">
						<Grid item xs={12} className={classes.gridItem}>
							<Typography variant="subtitle1">{dateLabel} ({props.day.weekday})</Typography>
						</Grid>
						<Grid item xs={12} className={classes.gridItem}>
							<Typography variant="subtitle1"><strong>{props.day.tag}</strong></Typography>
						</Grid>
					</Grid>
				</Breakpoint>
				<Breakpoint medium up style={{width: "100%"}}>
					<Grid container justify="flex-start">
						<Grid item xs={2} className={classes.gridItem}>
							<Typography variant="subtitle1">{dateLabel}</Typography>
						</Grid>
						<Grid item xs={2} className={classes.gridItem}>
							<Typography variant="subtitle1">{props.day.weekday}</Typography>
						</Grid>

						<Grid item xs={2} className={classes.gridItem}>
							<Typography variant="subtitle1">{props.day.tag}</Typography>
						</Grid>
					</Grid>
				</Breakpoint>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails
				className={clsx(
					props.day.color === 1 ? classes.coloredRow : classes.notColoredRow,
					props.day.weekday[0] === 'S' ? classes.weekendRow : ""
				)}
			>
				<Breakpoint small down style={{width: "100%"}}>
					<Grid container justify="flex-start">
						{detailRows}
					</Grid>
				</Breakpoint>
				<Breakpoint medium up style={{width: "100%"}}>
					<div className={classes.detailsBlock}>
						<Grid container justify="flex-start">
							{detailRows}
						</Grid>
					</div>
				</Breakpoint>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
}