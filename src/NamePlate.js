import React, {Component} from 'react';
import './NamePlate.css';
import clownHat from './clownhat_petrol.png'


const MENU = {
  unknown: 0,
  ente: 1,
  waller: 2,
  gnocci: 3,
  melanzani: 4,
  schnitzerl: 5,
  fischstaebchen: 6,
  nudeln: 7,
  nichts: 8,
  schnitzerlGross: 9,
};

const menuKeyWords = [
  '?!',
  'Flugentenbrust',
  'Waller Filet',
  'Gnocchi',
  'gefüllte Melanzani',
  'Kinderportion: Schnitzerl',
  'Fischstäbchen mit Pommes',
  'Nudeln mit Tomatensauce',
  'NICHTS!',
  'Erwachsenenportion: Schnitzerl'
];

const menuText = [
  '',
  'Flugentenbrust',
  'Wallerfilet',
  'Gnocchi',
  'Melanzani',
  '🐣 Schnitzerl 🐣',
  '🐣 Fischstäbchen 🐣',
  '🐣 Nudeln mit Tomatensauce',
  '🍼',
  'Schnitzerl',
];

export default class NamePlate extends Component {
  mapMenu = (menu) => {
    for (let i = 1; i < menuKeyWords.length; i += 1) {
      if (menu && menu.indexOf(menuKeyWords[i]) !== -1) return i;
    }

    console.log('unknown menu', menu);

    return 0;
  };

  menuText = (menu) => {
    return menuText[this.mapMenu(menu)];
  };

  render() {
    const hasClownhat = this.props.name === 'Was i net' || this.props.name === 'Doktor';

    return <div className="name-plate--wrapper">
      <div className="name-plate--horizontal-cut-indicator"></div>
      <div className="name-plate--both-sides">
        <div className="name-plate--one-side top"></div>
        <div className="name-plate--bend-line"></div>
        <div className="name-plate--one-side bottom">
          <span className="bigger">{this.props.name}{hasClownhat ? <img src={clownHat} className="clown-hat" alt="hat"/> : null}</span>
          <span>{this.props.corner}</span>
          <span className="menu">{this.menuText(this.props.menu)}</span>
        </div>
      </div>
      <div className="name-plate--horizontal-cut-indicator"></div>
    </div>
  }
}
