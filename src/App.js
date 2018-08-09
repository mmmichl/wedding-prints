import React, {Component} from 'react';
import NameClamp from "./NameClamp";
import NamePlate from "./NamePlate";
import {loadGapi} from "./gauth-service";
import './App.css';


const VIEWS = {
  none: 0,
  clamps: 1,
  clampsOutline: 3,
  namePlate: 2,
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      view: VIEWS.none,
      debugOutline: false,
      participants: null
    };
  }

  logState() {
    console.log(this.state.participants);
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
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          participents length: {JSON.stringify(this.state.participants && this.state.participants.length)}
        </div>

        {(() => {
          switch (this.state.view) {
            case VIEWS.none:
              return <span>Select a view</span>;
            case (VIEWS.clamps):
              return this.state.participants && this.state.participants.map((part, idx) =>
                <NameClamp name={part[0]} outline={false} key={idx}/>);
            case (VIEWS.clampsOutline):
              return this.state.participants && this.state.participants.map((part, idx) =>
                <NameClamp name={part[0]} outline={true} debugOutline={this.state.debugOutline} key={idx}/>);
            case VIEWS.namePlate:
              return this.state.participants && this.state.participants.map((part, idx) =>
                [
                  <NamePlate name={part[0]}
                             corner={part[3]}
                             key={idx}/>
                ]);
            default:
              return <span>default: not jet impleneted</span>;
          }
        })()}
      </div>
    )
      ;
  }

  componentDidMount() {
    loadGapi(participants => this.setState({participants: participants}));
  }
}

export default App;
