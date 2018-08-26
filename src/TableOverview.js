import React, {Component} from 'react';
import './TableOverview.css';


export default class TableOverview extends Component {

  tableMap() {
    const tableMap = {};
    for (const p of this.props.participants.filter(x => x.tableNr)) {
      if (tableMap[p.tableNr]) {
        tableMap[p.tableNr].push(p);
      } else {
        tableMap[p.tableNr] = [p];
      }
    }
    return tableMap;
  };

  unassigned() {
    return this.props.participants.filter(p => !p.tableNr)
  }

  isOverCountQuota = (participants) => {
    return participants.length > 8;
  };

  isKid = (p) => !!p.kidChair;

  kidsCount = (participants) => {
      return participants.map(this.isKid).reduce((acc, val) => acc + val, 0);
  };

  getKidIcon = (p) => {
    if (p.kidChair.includes('Hochstuhl wenn es')) {
      return p.kidChair;
    } else if (p.kidChair.includes('Hochstuhl')) {
      return '🔝💺';
    } else if (p.kidChair.includes('Kinderwagen')) {
      return '🛒';
    } else if (p.kidChair.includes('normalen Sessel bei')) {
      return '💺 => Eltern';
    } else if (p.kidChair.includes('normalen Sessel nicht unbedingt')) {
      return '💺 =/=> Eltern!';
    } else if (p.kidChair) {
      return <strong>?!? {p.kidChair}</strong>;
    }
  };

  render() {
    return <div>
      {Object.entries(this.tableMap()).map(pair => [
        <h2 key={pair[0]}>Tisch {pair[0]} <small>
          <span className={this.isOverCountQuota(pair[1]) ? 'alert' : ''}>Anz: {pair[1].length}, Kids: {this.kidsCount(pair[1])}</span>
        </small></h2>,
        <ul key={"l" + pair[0]}>
          {pair[1].map((p, idx) => <li key={pair[0] + ":" + idx}>{p.firstName} {p.lastName} ({p.corner})
            {this.getKidIcon(p)}</li>)}
          </ul>
      ])}

      <div>
        <h2>Unassigned: {this.unassigned().length}</h2>
      </div>
    </div>
  }
}
