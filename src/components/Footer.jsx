import { Link } from "react-router-dom";
import "../components-CSS/FooterCSS.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookF,faInstagram,faLinkedin,faTwitter,faYoutube,faCcVisa, faCcMastercard, faCcPaypal,} from "@fortawesome/free-brands-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <>
        {/* Blocco superiore del footer */}
        <div className="footer-blockUp">
            
            {/* Sezione contatti */}
            <div className="footer-contatti">
                <ul>
                    <li><h4>CONTATTO</h4></li>
                    <li>LUN - VEN: 08:30 - 16:30H</li>
                    <li>info@hygge.com</li>
                    <li>+34 932 20 38 58</li>
                </ul>
            </div>

            {/* Sezione informazioni */}
            <div className="footer-informazioni">
                <ul>
                    <li><h4>INFORMAZIONI</h4></li>
                    <li>Domande frequenti (FAQ)</li>
                    <li>Pagamenti</li>
                    <li>Spedizione</li>
                    <li>Incidenti nelle spedizioni</li>
                    <li>Resi e cambi</li>
                    <li>Blog</li>
                </ul>
            </div>

            {/* Sezione legale */}
            <div className="footer-legale">
                <ul>
                    <li><h4>LEGALE</h4></li>
                    <li>Note Legali</li>
                    <li>Condizioni generali</li>
                    <li>Privacy Policy</li>
                    <li>Politica dei Cookies</li>
                    <li>Garanzia</li>
                </ul>
            </div>

            {/* Sezione social e link "About Us" */}
            <div className="footer-newsletter">
                <Link to="/about-us" className="about"><h4>ABOUT US</h4></Link>
                <div className="social">
                    {/* Icone social */}
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
                
            </div>
        </div>
        
        {/* Sezione pagamento sicuro */}
        <div className="payment">
            <p><span><FontAwesomeIcon icon={faLock} /></span>Pagamento sicuro garantito</p>
            <ul>
                {/* Icone dei metodi di pagamento */}
                <li><a href="#" target="_blank" rel="noreferrer">
                    <img src="../../public/svg-icons/maestro.svg" alt="" />
                </a></li>
                <li><a href="#" target="_blank" rel="noreferrer">
                    <img src="../../public/svg-icons/apple-pay.svg" alt="" />
                </a></li>
                <li><a href="#" target="_blank" rel="noreferrer">
                    <img src="../../public/svg-icons/mastercard.svg" alt="" />
                </a></li>
                <li><a href="#" target="_blank" rel="noreferrer">
                    <img src="../../public/svg-icons/visa-logo.svg" alt="" />
                </a></li>
                <li><a href="#" target="_blank" rel="noreferrer">
                    <img src="../../public/svg-icons/google-pay.svg" alt="" />
                </a></li>       
            </ul>
        </div>
        
        {/* Copyright */}
        <p className="copyright">© 2025, HYGGE. ALL RIGHTS RESERVED</p>
    </>
  );
}
