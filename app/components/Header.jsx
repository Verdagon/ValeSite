import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom';
//import sphereVG48 from '../images/SphereVG48.png';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickCount: 0
		};
	  this.onClickVOrb = this.onClickVOrb.bind(this);
	}
	incrementClickCount() {
	  this.setState((prevState) => {
	    return {clickCount: prevState.clickCount + 1};
	  });
	}
	onClickVOrb() {
		this.incrementClickCount();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.clickCount >= 5) {
			//window.location = sphereVG48;
		}
	}

  render() {
  	let vorb = (
			<div className="header vorb-container" onClick={this.onClickVOrb}>
				<div className="header vorb"></div>
			</div>
		);
		let title = (
			<div className="header title">The <span className="header vale">Vale</span> Programming Language</div>
		)
		if (!this.props.easterEgg) {
			vorb = <Link to="/" className="header">{vorb}</Link>;
			title = <Link to="/" className="header">{title}</Link>;
		}
		return (
				<div className={"header root" + (this.props.small ? " small" : "")}>
					<div className="header contents">
						{vorb}
						<div className="header text">
							{title}
						</div>
						<div className="header links">
							<Link to="/ref">Reference</Link>
							<a>Github Repository</a>
						</div>
					</div>
				</div>
		);
	}
}

export default Header;