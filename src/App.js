import React, {Component} from 'react';
import NameClamp from "./NameClamp";
import NamePlate from "./NamePlate";
import RoomSigns from "./RoomSigns";
import TableSigns from "./TableSigns";
import TableOverview from "./TableOverview";
import {loadGapi} from "./gauth-service";
import './App.css';
// import namePlateImg from './Namensschilder_Tisch_59,2x63,5mm_A-Falt_blanko.svg';

const VIEWS = {
  none: 0,
  clamps: 1,
  clampsOutline: 3,
  namePlate: 2,
  tableOverview: 4,
  roomSigns: 5,
  tableSigns: 6,
};

// interface Participant
// {
//   firstName: string;
//   lastName: string;
//   kidChair: string;
//   corner: string;
//   tableNr: string;
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: VIEWS.tableSigns,
      debugOutline: false,
      participants: null,
      tables: [
        ['1', 'Super Awesome', 'Blur - Song 2'],
        ['2', 'Mega geil', 'Baywatch Theme'],
        ['3', 'Team Fuigas', 'Limp Bizkit - My Way'],
        ['4', 'table name 4', 'Smash Mouth - All Star'],
      ]
    };

    setInterval(() => this.state.view === VIEWS.tableOverview ? this.componentDidMount() : null, 10000);
  }

  viewChanged(e) {
    this.setState({
      view: parseInt(e.currentTarget.value, 10)
    });
  };

  render() {
    return (
      <div className="App">
        <div className="no-print">
          <label><input type="radio" name="view" value={VIEWS.clamps}
                        checked={this.state.view === VIEWS.clamps}
                        onChange={evt => this.viewChanged(evt)}/>Clamps</label>
          <label><input type="radio" name="view" value={VIEWS.clampsOutline}
                        checked={this.state.view === VIEWS.clampsOutline}
                        onChange={evt => this.viewChanged(evt)}/>Clamps Outline</label>
          {this.state.view === VIEWS.clampsOutline ? <label><input type="checkbox" checked={this.state.debugOutline}
                                                                   onChange={evt => this.setState({debugOutline: evt.target.checked})}/>
            Debug Outline</label> : null}
          <label><input type="radio" name="view" value={VIEWS.namePlate}
                        checked={this.state.view === VIEWS.namePlate}
                        onChange={evt => this.viewChanged(evt)}/>Name Plates</label>
          <label><input type="radio" name="view" value={VIEWS.roomSigns}
                        checked={this.state.view === VIEWS.roomSigns}
                        onChange={evt => this.viewChanged(evt)}/>Room Signs</label>
          <label><input type="radio" name="view" value={VIEWS.tableSigns}
                        checked={this.state.view === VIEWS.tableSigns}
                        onChange={evt => this.viewChanged(evt)}/>Table Signs</label>
          <label><input type="radio" name="view" value={VIEWS.tableOverview}
                        checked={this.state.view === VIEWS.tableOverview}
                        onChange={evt => this.viewChanged(evt)}/>Table Overview</label>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          participents length: {JSON.stringify(this.state.participants && this.state.participants.length)}
        </div>

        {/*<img src={namePlateImg} style={{border: "1px solid black", padding: "1px"}}/>*/}

        {(() => {
          switch (this.state.view) {
            case VIEWS.none:
              return <span>Select a view</span>;
            case (VIEWS.clamps):
              return this.state.participants && this.state.participants.concat([[], [], [], []], []).map((part, idx) =>
                <NameClamp name={part[0]} outline={false} key={idx}/>);
            case (VIEWS.clampsOutline):
              return this.state.participants && this.state.participants.concat([[], [], [], [], []]).map((part, idx) =>
                <NameClamp name={part[0]} outline={true} debugOutline={this.state.debugOutline} key={idx}/>);
            case VIEWS.namePlate:
              return this.state.participants && this.state.participants.concat([[], [], [], [], []]).map((part, idx) =>
                [
                  <NamePlate name={part[0]}
                             corner={part[3]}
                             menu={part[6]}
                             key={idx}/>
                ]);
            case VIEWS.roomSigns:
              return this.state.roomList && this.state.roomList.concat([[], []]).map((part, idx) =>
                [
                  <RoomSigns kid={!!part[0]}
                             names={part.splice(1)}
                             key={idx}/>
                ]);
            case VIEWS.tableSigns:
              return this.state.tables && this.state.tables.concat([[], []]).map((part, idx) =>
                [
                  <TableSigns number={part[0]}
                              name={part[1]}
                              song={part[2]}
                              key={idx}/>
                ]);
            case VIEWS.tableOverview:
              return this.state.participants &&
                <TableOverview participants={this.mapParticipants(this.state.participants)}/>
            default:
              return <span>default: not jet impleneted</span>;
          }
        })()}
      </div>
    );
  }

  componentDidMount() {
    loadGapi((participants, roomList) => this.setState({participants, roomList}));
  }

  mapParticipants(rawParticipants) {
    return rawParticipants.map(p => ({
      firstName: p[0],
      lastName: p[1],
      kidChair: p[2],
      corner: p[3],
      tableNr: p[5]
    }));
  }
}

export default App;
