import React from 'react'
import './Snippet.css'

class Snippet extends React.Component {
  render() {
    return <div className="c-snippet">{this.props.children}</div>;
  }
}

export default Snippet;
