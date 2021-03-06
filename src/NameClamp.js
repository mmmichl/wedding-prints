import React, {Component} from 'react';
import './NameClamp.css';

class NameClamp extends Component {
  render() {
    let name = this.props.name;
    if (name === "Marian M. H.") {
      name = "Marian M.H."
    }
    // const smaller = name && name.length > 8 && name !== 'Julijana';
    const smaller = name === 'Marian M.H.' || name === 'Margareta' || name === 'Magdalena';

    return (
      <span className="name-clamp--wrapper">
        <span className="name-clamp">
          <svg viewBox="0 0 411.02 411.02">
            {this.props.outline ? <g id="Ebene_2">
              <polygon fill="#FFFFFF" style={{"stroke": "#FF0000"}}
                       strokeLinejoin="round"
                       strokeWidth="0.1"
                       transform="scale(1.115 1.115) translate(-21.5 -20)"
                       points="135.329,31.085 76.495,60.506 24.995,163.506 40.495,209.673 21.496,286.335 78.162,320.001
		86.996,344.835 177.83,379.835 239.497,368.335 367.665,303.335 390.165,261.169 360.331,186.669 355.166,97.5 308.166,57.5
		267.334,51 232.834,32.667"/>
            </g> : null}
            {!this.props.outline || this.props.debugOutline ?
              <g id="Ebene_1">
                <path stroke="#045D74" fill="#045D74" d="M22.884,285.811L77.543,61.759l155.03-28.043l121.527,64.86l12.295,203.744l-188.578,75.898L22.884,285.811
		z M75.486,59.574L20.22,286.119l-0.22,0.9l157.601,94l191.415-77.039L356.528,97.02L232.985,31.085L75.486,59.574z"/>
                <path stroke="#D09A37" fill="#D09A37" d="M87.783,343.801L26.305,164.144L136.913,31.818l170.348,26.836l81.623,201.842L239.35,367.014
		L87.783,343.801z M135.896,29.111L23.92,163.073l-0.455,0.543l62.431,182.438l153.576,23.521l0.505,0.08l151.983-108.262
		L309.325,57.051l-0.266-0.659l-172.459-27.17L135.896,29.111z"/>
                <path stroke="#D09A37" fill="#D09A37" d="M87.838,343.963L26.246,163.972L77.452,61.603l59.24-29.874l95.761,1.924l35.137,18.752l40.023,6.306
		l46.479,39.697l5.394,89.39l29.549,73.07l-22.249,41.34l-127.528,64.924l-61.429,11.189L87.838,343.963z M75.575,59.732
		L23.524,163.789l62.317,182.104l91.747,35.029l62.301-11.352l0.183-0.031l128.206-65.268l0.351-0.178l23.183-43.072l-29.839-73.787
		l-5.4-89.513l-0.034-0.534l-47.83-40.853L268.4,49.986l-35.294-18.837l-96.989-1.948L75.575,59.732z"/>
                <text textAnchor="middle" className={smaller ? "smaller" : ''} x={411 / 2} y={411 / 2 + 20}>{name}</text>
              </g>
              : null}
          </svg>

        </span>
      </span>
    );
  }
}

export default NameClamp;
