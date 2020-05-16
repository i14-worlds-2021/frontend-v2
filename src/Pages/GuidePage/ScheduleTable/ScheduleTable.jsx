import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ScheduleRow from './ScheduleRow';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	gridItem: {
		display: "flex",
		alignItems: "center",
		justifyContent: "left",
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

function ScheduleTable(props) {
	const classes = useStyles();

	let scheduleRows = props.days.map((day, index) => {
		return (
			<ScheduleRow day={day} key={index}/>
		);
	});
	return (
		<div className={classes.root}>
			{scheduleRows}
		</div>
	);
}

export default ScheduleTable;
