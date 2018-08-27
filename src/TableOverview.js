import React, {Component} from 'react';
import './TableOverview.css';


export default class TableOverview extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: {}
    };
  }

  componentWillMount() {
    const collapsed = {};
    this.getTablePairs().forEach(p => collapsed[p[0]] = this.isJustRightQuota(p[1]));
    this.setState({collapsed});
  }

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

  getTablePairs() {
    return Object.entries(this.tableMap()).sort((pa, pb) => pa[0].localeCompare(pb[0]));
  }

  unassigned() {
    return this.props.participants.filter(p => !p.tableNr)
  }

  isOverCountQuota = (participants) => {
    return participants.length > 8;
  };

  isJustRightQuota = (participants) => {
    return participants.length === 8 || participants.length === 7
      || (participants.length === 9 && this.kidsCount(participants) === 1);
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

  toggleShow(p) {
    const collapsed = this.state.collapsed;
    collapsed[p] = !collapsed[p];
    this.setState({collapsed});
  }

  getInfoClass(p) {
    if (this.isJustRightQuota(p)) {
      return 'just-right';
    }
    if (this.isOverCountQuota(p)) {
      return 'alert';
    }
    return '';
  }

  render() {
    return <div>
      <h3>Tische: {Object.keys(this.tableMap()).length}</h3>

      {this.getTablePairs().map(pair => [
        <h2 key={pair[0]} onClick={() => this.toggleShow(pair[0])}>Tisch {pair[0]}
          <small>
            <span className={this.getInfoClass(pair[1])}> Anz: {pair[1].length}, Kids: {this.kidsCount(pair[1])}</span>
          </small>
        </h2>,
        !this.state.collapsed[pair[0]] ? <ul key={"l" + pair[0]}>
          {pair[1].map((p, idx) => <li key={pair[0] + ":" + idx}>{p.firstName} {p.lastName} ({p.corner})
            {this.getKidIcon(p)}</li>)}
        </ul> : null
      ])}

      <div>
        <h2>Unassigned: {this.unassigned().length}</h2>
      </div>
    </div>
  }
}
