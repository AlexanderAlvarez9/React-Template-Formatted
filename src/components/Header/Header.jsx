import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faFlag, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Header">
          <div className="Header--main">
            <span className="icon">{'\u2630'}</span>
          </div>

          <div className="Header--user">
            <Link to="/Mensaje" className="item icon"><FontAwesomeIcon title="Mensaje" className="faEnvelope" icon={faEnvelope} /></Link>
            <Link to="/Notificaciones" className="item icon"><FontAwesomeIcon title="Notificaciones" className="faBell" icon={faBell} /></Link>
            <Link to="/" className="item icon"><FontAwesomeIcon title="Config" className="faCog" icon={faCog} /></Link>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Header;