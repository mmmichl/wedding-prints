import React, {Component} from 'react';
import './RoomSigns.css';
import sleepingBaby from './sleeping-baby.png';


export default class RoomSigns extends Component {

  getResidentText() {
    const names =  this.props.names;

    if (names.length <= 1) {
      return names[0];
    }

    return names.splice(0, names.length - 1).join(', ') + " &&nbsp;" + names[names.length-1]
  }

  render() {
    const names =  this.props.names;
    const singleRoom = names.length <= 1;
    const bridalPair = names.length === 2 && names[0] === 'Anna' && names[1] === 'Michl';
    // const hasClownhat = name === 'Was i net' || name === 'Doktor';

    return <div className="page-wrapper room-sign">
      {/*<img src={circle} alt="bla"/>*/}
      <div className="content">
        {bridalPair ? <div>👰🤵</div> : null}
        {singleRoom ?
          <div>Hier schläft:<br/>{names[0]}</div> :
          <div>Hier schlafen:<br/>
            {names.splice(0, names.length - 1).join(', ')} &&nbsp;{names[names.length-1]}
          </div>
        }
        {this.props.kid ? <img src={sleepingBaby} alt="👶"/> : null}
      </div>
    </div>
  }
}
