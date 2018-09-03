import React, {Component} from 'react';
import NameClamp from "./NameClamp";
import NamePlate from "./NamePlate";
import RoomSigns from "./RoomSigns";
import TableSigns from "./TableSigns";
import TableOverview from "./TableOverview";
import {loadGapi} from "./gauth-service";
import './App.css';
import NameTags from "./name-tags/NameTags";
// import namePlateImg from './Namensschilder_Tisch_59,2x63,5mm_A-Falt_blanko.svg';

const VIEWS = {
  none: 0,
  clamps: 1,
  clampsOutline: 3,
  namePlate: 2,
  tableOverview: 4,
  roomSigns: 5,
  tableSigns: 6,
  nameTag: 7,
  error: 8,
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
        [1,  'Die Ja Sager', 'Harlem Shake', []],
        [7,  'Team Fuigas', 'EAV - Märchenprinz', [2]],
        [2,  'Tratschonkeln', 'EAV - Märchenprinz', [7]],
        [15, 'Der Bäcker und die Gang', 'The darkness - I Believe In A Thing Called Love', [16]],
        [16, 'Der Bäcker und die Gang', 'The darkness - I Believe In A Thing Called Love', [15]],
        [17, 'Die Steuerzahler von morgen', 'Maklermore - Can\'t Hold Us', [18]],
        [18, 'Lego Meister', 'Maklermore - Can\'t Hold Us', [17]],
        [3,  'Prägende Elemente', 'The Who - My Generation', [4]],
        [4,  'Family Croissant', 'The Who - My Generation', [3]],
        [6,  'Team Fuigas', 'Deichkind - Bück Dich Hoch', [8]],
        [8,  'Team Fuigas', 'Deichkind - Bück Dich Hoch', [6]],
        [11, 'Fiaker Extended', 'Limahl - Neverending Story', [10]],
        [10, 'Monokel Monokel', 'Limahl - Neverending Story', [11]],
        [12, 'Familie plus', 'Bonnie Tyler - I Need A Hero', [13, 14]],
        [13, 'Oachkazalschwoaf', 'Bonnie Tyler - I Need A Hero', [12, 14]],
        [14, 'Tosca(U)nis', 'Bonnie Tyler - I Need A Hero', [13, 14]],
        [5,  'FCM uni(ted)', 'Spice Girls - Wanna Be', [9]],
        [9,  'FCM uni(ted)', 'Spice Girls - Wanna Be', [5]],
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
          <label><input type="radio" name="view" value={VIEWS.nameTag}
                        checked={this.state.view === VIEWS.nameTag}
                        onChange={evt => this.viewChanged(evt)}/>Name Tags</label>
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
            case VIEWS.error:
              return <div style={{border: 'red 1px solid', padding: "1em"}}>
                Error from Google Drive:<br/>
                {JSON.stringify(this.state.error)}</div>;
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
            case VIEWS.nameTag:
              return this.state.participants &&
                <NameTags participants={this.mapParticipants(this.state.participants.concat([[], [], [], [], []]))}/>;
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
                              commonTable={part[3]}
                              key={idx}/>
                ]);
            case VIEWS.tableOverview:
              return this.state.participants &&
                <TableOverview participants={this.mapParticipants(this.state.participants)}/>;
            default:
              return <span>default: not jet impleneted</span>;
          }
        })()}
      </div>
    );
  }

  componentDidMount() {
    loadGapi((error, participants, roomList) => !error ? this.setState({participants, roomList}) : this.setState({
      error,
      view: VIEWS.error
    }));
  }

  mapParticipants(rawParticipants) {
    return rawParticipants.map(p => ({
      firstName: p[0],
      lastName: p[1],
      kidChair: p[2],
      corner: p[3],
      intolerances: p[4],
      tableNr: p[5],
      dinner: p[6],
    }));
  }
}

export default App;
