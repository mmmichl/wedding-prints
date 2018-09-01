import React, {Component} from 'react';
import './NameTags.css';
import clownHat from '../clownhat_petrol.png'



export default class NameTags extends Component {

  getIntolerances = (int) => {
    if (!int || int.includes("Gluten") || int.includes("kranke Menschen")) {
      return '';
    }

    return int;
  };

  getGroupedParticipants() {
    const groupedParticipants = this.props.participants.reduce((acc, next) => {
      const lastBlock = acc[acc.length - 1];
      if (lastBlock.length < 27) {
        lastBlock.push(next);
      } else {
        acc.push([next]);
      }

      return acc;
    }, [[]]);

    // fill up the last page so the table will render correctly
    while (groupedParticipants[groupedParticipants.length-1].length < 27) {
      groupedParticipants[groupedParticipants.length-1].push({});
    }
    return groupedParticipants;
  }

  render() {
    const hasClownhat = (name) => name === 'Was i net' || name === 'Doktor';

    return this.getGroupedParticipants().map((group, idx) => <div className='name-tag--a4' key={idx}>
      {group.map((p, idxp) =>
        <div className="name-tag--wrapper" key={idx + '-' + idxp}>
          <div className="bigger">{p.firstName}{hasClownhat(p.firstName) ?
            <img src={clownHat} className="clown-hat" alt="hat"/> : null}</div>
          <div>{p.corner}</div>
          {this.getIntolerances(p.intolerances) ?
            <div className="menu">Unverträglichkeit: {p.intolerances}</div> : null}
        </div>)}
    </div>);
  }
}
