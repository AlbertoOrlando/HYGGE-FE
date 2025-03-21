import { Link } from "react-router-dom";
import "../components-CSS/FooterCSS.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookF,faInstagram,faLinkedin,faTwitter,faYoutube,faCcVisa, faCcMastercard, faCcPaypal,} from "@fortawesome/free-brands-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <>
        <div className="footer-blockUp">
            <div>
                
                <ul className="footer-contatti">
                    <li><h4>CONTATTO</h4></li>
                    <li>LUN - VEN: 08:30 - 16:30H</li>
                    <li>info@northdeco.com</li>
                    <li>+34 932 20 38 58</li>
                </ul>
            </div>
            <div className="footer-informazioni">
                <li><h4>INFORMAZIONI</h4></li>
                <li>Domande frequenti (FAQ)</li>
                <li>Pagamenti</li>
                <li>Spedizione</li>
                <li>Incidenti nelle spedizioni</li>
                <li>Resi e cambi</li>
                <li>Blog</li>
            </div>
            <div className="footer-legale">
                <li><h4>LEGALE</h4></li>
                <li>Note Legali</li>
                <li>Condizioni generali</li>
                <li>Privacy Policy</li>
                <li>Politica dei Cookies</li>
                <li>Garanzia</li>
            </div>

            <div></div>
        </div>
            
            <Link to="/about-us">About Us</Link>
            

        
        <div className="social">
          <a href="https://www.facebook.com/" target="_blank" rel="Facebook" className="facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="linkedin">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" className="twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
            
           

            <div className="payment">
            <p><span><FontAwesomeIcon icon={faLock} /></span>Pagamento sicuro garantito</p>
                <ul>
                    <li><a href="#" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faCcVisa} />
                    </a></li>
                    <li><a href="#" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faCcMastercard} />
                    </a></li>
                    <li><a href="#" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faCcPaypal} />
                    </a></li>  
                </ul>
            </div>
            
            <p>© 2025, Northdeco. ALL RIGHTS RESERVED</p>
    </>
  );
}
