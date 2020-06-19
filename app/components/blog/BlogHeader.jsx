import React from 'react'
import '../Header.css'
import {Link} from 'react-router-dom';
//import sphereVG48 from '../images/SphereVG48.png';

class BlogHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let vorb = (
      <div className="header vorb-container">
        <div className="header vorb"></div>
      </div>
    );
    let title = (
      <div className="header title"><span className="header explorations">Explorations</span> in <span className="header vale">Vale</span></div>
    )
    let links = (
      <div className="header links">
        <Link to="/ref">Vale</Link>
        <a href="https://github.com/Verdagon/Vale">Github Repository</a>
      </div>
    )
    if (!this.props.links) {
      links = "";
    }
    return (
        <div className={"header root" + (this.props.small ? " small" : "")}>
          <div className="header contents">
            <Link to="/">{vorb}</Link>
            <div className="header text">
              <Link to="/">{title}</Link>
            </div>

            {links}
          </div>
        </div>
    );
  }
}

export default BlogHeader;