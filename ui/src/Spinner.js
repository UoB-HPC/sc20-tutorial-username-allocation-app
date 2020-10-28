import React from 'react';
import logo from './sc20logo.png';


class Spinner extends React.Component {

    render() {
        return             (<div className="spinner-container"><img  alt="submitting..." src={logo} className="spinner App-logo"/></div>);
    }
    
}

export default Spinner;
