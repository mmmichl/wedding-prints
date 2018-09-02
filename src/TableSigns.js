import React, {Component} from 'react';
import './TableSigns.css';
import a5Background from './A5_Infotafel_blanko.svg';


export default class TableSigns extends Component {

  commonSongTableText() {
    const otherTables = this.props.commonTable;
    if (!otherTables || otherTables.length === 0) return '';
    if (otherTables.length === 1) {
      return `Tisch #${otherTables[0]} hat das gleichen Lied wie ihr.`
    } else {
      return `Tische #${otherTables[0]} und #${otherTables[1]} haben das gleichen Lied wie ihr.`
    }
  }

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
              <h2>Euer Lied</h2>
              <strong>{this.props.song}</strong>
              <p>
                Bitte überlegt euch gemeinsam einen kleinen Tanz passend zu eurem Lied,<br/>
                ihr werdet ihn nach der Hauptspeise brauchen. {this.commonSongTableText()}
              </p>

              <h2>Grober Ablauf</h2>
              <ul>
                <li>18:00: Vorspeisenbuffet</li>
                <li>19:30: Hauptspeisen</li>
                <li>21:00: Nachspeisenbuffet</li>
                <li>21:30: Partyeröffnung</li>
              </ul>

              <h2>Vorspeisen Buffet</h2>
              <div>Steirische Kürbiscreme Suppe mit Schwarzbrot Croutons</div>
              <div>Avocado in drei Texturen (Vegan)</div>
              <div>Gratiniertes Ziegenfrischkäse Mousse mit geschmolzenen Paradeisern (Vegetarisch)</div>
              <div>Frischkäse Praline mit eigelegtem Muskatkürbis und Pumpernickel Türmchen an marinierten
                Radieschen (Vegetarisch)
              </div>

              <h2>Hauptspeisen</h2>
              <div>Tranche von der Rosa Flugentenbrust an pikantem Kürbis Ingwergemüse und überbackenem
                Süßkartoffelgratin mit Sternanisjus (Fleisch)
              </div>
              <div>Gebratenes Waller Filet in Kürbiskernen gebraten mit feinen Wurzelgemüse Streifen und Schnittlauch
                Kartoffeln an Krenschaum (Fisch)
              </div>
              <div>Geschwenkte Gnocchi mit feiner Kürbis Mandel Creme und steirischen Asmonte Käse an marinierten Spinat
                Schalotten Salat (Vegetarisch)
              </div>
              <div>Mediterran gefüllte Melanzani an feinem Rucola Pesto und lauwarmen Paradeiser Carpaccio mit
                Schalotten Vinaigrette (Vegan)
              </div>

              <h2>Nachspeisen Buffet</h2>
              Verschiedenste Köstlichkeiten von Michls Onkel und fleißigen Bäckerinnen aus der Familie

            </div>
          </div>
          <div className="page-wrapper">
            <div style={{'margin-right': '5mm'}}>

              <h2>Mitternachtssnack</h2>
              <div>Gulaschsuppe (Fleisch)</div>
              <div>Mozzarella & Tomaten (Vegetarisch)</div>
              <div>Käseplatte (Vegetarisch)</div>


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
              </small>
              <br/>
              Bier, Spritzer, Antialkoholika<br/>
              Grüner Veltliner Terrassen
              <div className="small">Weingut Jurtschitsch, Langenlois – Kamptal</div>
              Gelber Muskateller
              <div className="small">Weingut Stefan Potzinger, Gabersdorf-Südsteiermark</div>

              <h2>Gastgeschenk</h2>
              Vergesst nicht eure Blumen mitzunehmen!

              <h2>Danke</h2>
              an alle, die mitgeholfen haben, diesen Abend zu gestalten <br/>und an alle, die ihn unvergesslich machen
              werden!

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
