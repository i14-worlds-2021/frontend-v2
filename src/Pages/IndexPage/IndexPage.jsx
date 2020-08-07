/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Routing Imports --------------------------------------------------------------- */
import {Link} from 'react-router-dom';


/* Styling Imports --------------------------------------------------------------- */
import './IndexPage.scss';
import Breakpoint from 'react-socks';

/* Material UI Imports ----------------------------------------------------------- */
import Button from '@material-ui/core/Button';


/* Assets Imports ---------------------------------------------------------------- */
import {setImageSliderIndex} from "../../Wrappers/ReduxActions";
import {connect} from "react-redux";

/* Component --------------------------------------------------------------------- */


class IndexPageComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mounted: false,
			overlay: true
		}

		this.setImageSliderIndex = props.setImageSliderIndex;
	}

	componentDidMount() {
		if (!this.state.mounted) {
			setTimeout(() => {
				this.setState({mounted: true});
			}, 100)
			setTimeout(() => {
				this.setState({overlay: false});
			}, 400)
		}
	}

	render() {
		return (
			<div className="IndexPage">
				<Breakpoint small down>
					<div className={"ImageOverlay Overlay " + (this.state.overlay ? "" : "OverlayTransparent")}/>
					{this.state.mounted && (
						<div className="Image"/>
					)}
				</Breakpoint>
				<Breakpoint medium up>
					<div className={"VideoOverlay Overlay " + (this.state.overlay ? "" : "OverlayTransparent")}/>
					{this.state.mounted && (
						<video className="Video" autoPlay muted loop>
							<source id="mp4"
									src="https://storage.googleapis.com/i14-worlds-2021-gallery/default-images/GCA_Teaser_Cut.mp4"
									type="video/mp4"/>
						</video>
					)}
				</Breakpoint>
				<div className="CenterBox">
					<div className="Logo Element">
						<img src="https://storage.googleapis.com/i14-worlds-2021-upload/static/logo-versions/full-logo-white.svg" alt="Event Logo"/>
					</div>
					<Link to={"/event"} onClick={() => this.setImageSliderIndex(0)}>
						<Button className="Element" variant="contained" color="secondary">
							<div style={{backgroundColor: "inherit"}}>Event Page</div>
						</Button>
					</Link>
				</div>
			</div>
		);

	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	setImageSliderIndex: (index) => dispatch(setImageSliderIndex(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPageComponent);
