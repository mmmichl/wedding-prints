import React, {Component} from 'react';
import './NamePlate.css';

export default class NamePlate extends Component {
  render() {
    return <div className="name-plate--wrapper">
      <div className="name-plate--horizontal-cut-indicator"></div>
      <div className="name-plate--both-sides">

        <div className="name-plate--one-side top">
        </div>
        <div className="name-plate--bend-line"></div>
        <div className="name-plate--one-side bottom">
          <span className="bigger">{this.props.name}</span>
          <div>{this.props.corner}</div>
        </div>
      </div>
      <div className="name-plate--horizontal-cut-indicator"></div>
    </div>
  }
}
