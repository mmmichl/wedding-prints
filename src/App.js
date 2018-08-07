import React, {Component} from 'react';
import NamePlate from "./NamePlate";
import {loadGapi} from "./gauth-service";
import './App.css';


const VIEWS = {
  none: 0,
  clamps: 1,
  namePlate: 2,
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      view: VIEWS.clamps,
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
                <NamePlate name={part[0]} outline={false} key={idx}/>);
            case VIEWS.namePlate:
              return <span>not jet impleneted</span>;
            default:
              return <span>default: not jet impleneted</span>;
          }
        })()}
      </div>
    );
  }

  componentDidMount() {
    loadGapi(participants => this.setState({participants: participants}));
  }
}

export default App;
