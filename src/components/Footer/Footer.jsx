import React from 'react';
import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faWhatsapp, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons"

const Twitter = 'https://www.Twitter.com/';
const Whatsapp = 'https://www.Whatsapp.com/';
const Youtube = 'https://www.Youtube.com/';
const Github = 'https://github.com/AlexanderAlvarez9/React-Template-Formatted';
class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Footer">
          <div className="Footer--social-networks">
            <a href={Twitter} target="_blank" className="socialIcon"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href={Whatsapp} target="_blank" className="socialIcon"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href={Youtube} target="_blank" className="socialIcon"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href={Github} target="_blank" className="socialIcon"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Footer;