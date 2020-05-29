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
import EVENT_LOGO from './images/EventLogo.svg';

/* Component --------------------------------------------------------------------- */


class IndexPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mounted: false,
			overlay: true
		}
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
						<img src={EVENT_LOGO} alt="Event Logo"/>
					</div>
					<Link to={"/event"}>
						<Button className="Element" variant="contained" color="secondary">
							<div style={{backgroundColor: "inherit"}}>Event Page</div>
						</Button>
					</Link>
				</div>
			</div>
		);

	}
}

export default IndexPage;
