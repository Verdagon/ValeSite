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
		let langTitle = (
			<div className="header title">The <span className="header vale">Vale</span> Programming Language</div>
		)
		let blogTitle = (
			<div className="header title"><span className="header explorations">Explorations</span> in <span className="header vale">Vale</span></div>
		)
		let title = this.props.blog ? blogTitle : langTitle;
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
							<a href="https://github.com/Verdagon/Vale">Github</a>
							<a href="https://discord.gg/SNB8yGH">Discord</a>
						</div>
					</div>
				</div>
		);
	}
}

export default Header;