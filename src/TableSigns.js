import React, {Component} from 'react';
import './TableSigns.css';
import a5Background from './A5_Infotafel_blanko.svg';


export default class TableSigns extends Component {

  render() {
    const names = this.props.names;

    return [
      <div>
        <div className="a4-wrapper table-sign">
          {this.renderCover()}
          {this.renderCover()}
        </div>
      </div>,
      <div>
        <div className="a4-wrapper table-sign content">
          <div className="page-wrapper">
            <div style={{'margin-left': '5mm'}}>
              <h2>Danke</h2>
              an alle, die mitgeholfen haben, diesen Abend zu gestalten <br/>und an alle, die ihn unvergesslich machen werden!
              <h2>Euer Lied</h2>
              <strong>{this.props.song}</strong>
              <p>
              Bitte überlegt euch gemeinsam eine kleine Choreographie passend zu eurem Lied,
              ihr werdet sie nach der Hauptspeise brauchen.
              </p>
              <h2>Grober Ablauf</h2>
              <ul>
                <li>18:00: Vorspeisenbuffet</li>
                <li>19:30: Hauptspeisen</li>
                <li>21:00: Nachspeisenbuffet</li>
                <li>21:30: Partyeröffnung</li>
              </ul>
            </div>
          </div>
          <div className="page-wrapper">
            <div className="schedule">
              <h2>Getränke</h2>
              <small>bitte mit euren Kluppen markieren zum Wiederfinden</small>
              <h3>Weine am Tisch</h3>
              <table>
                <tr>
                  <td>Weißwein</td>
                  <td>
                    Welschriesling<br/>
                    <div className="small">Weingut Schauer, Kitzeckl-Südsteiermark</div>
                  </td>
                </tr>
                <tr>
                  <td>Rotwein</td>
                  <td>
                    Blaufränkisch Eisenberg
                    <div className="small">Weingut Kopfensteiner, Deutsch-Schützen – Burgenland</div>
                  </td>
                </tr>
              </table>

              <h3>Bestellbar</h3>
              <small className="hint">
                direkt bei Kellnern oder an der Bar bestellen
              </small><br/>
              Bier, Spritzer, Antialkoholika, Kaffee<br/>
              Grüner Veltliner Terrassen
              <div className="small">Weingut Jurtschitsch, Langenlois – Kamptal</div>
              Gelber Muskateller
              <div className="small">Weingut Stefan Potzinger, Gabersdorf-Südsteiermark</div>

              <h2>Gastgeschenk</h2>
              Vergesst nicht eure Blumen mitzunehmen!
            </div>
          </div>
        </div>
      </div>
    ];
  }

  renderCover() {
    return <div className="page-wrapper">
      <div className="number">#{this.props.number}</div>
      <div className="logo">
        Anna + Michael<br/>
        7.9.2018
      </div>
      <div className="table-name">
        Tisch<br/> <strong>{this.props.name}</strong>
      </div>
    </div>
  }
}
