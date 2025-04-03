// Importa il componente Link da React Router per la navigazione interna
import { Link } from "react-router-dom";
// Importa gli stili CSS specifici per il footer
import "../components-CSS/FooterCSS.css";

// Importa il componente FontAwesome per l'utilizzo delle icone
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Importa le icone dei social media e dei metodi di pagamento da FontAwesome
import {
    faFacebookF,    // Icona di Facebook
    faInstagram,    // Icona di Instagram
    faLinkedin,     // Icona di LinkedIn
    faTwitter,      // Icona di Twitter
    faYoutube,      // Icona di YouTube
    faCcVisa,       // Icona carta Visa
    faCcMastercard, // Icona carta Mastercard
    faCcPaypal,     // Icona PayPal
} from "@fortawesome/free-brands-svg-icons";
// Importa l'icona del lucchetto per il pagamento sicuro
import { faLock } from "@fortawesome/free-solid-svg-icons";

// Componente principale del footer
export default function Footer() {
    return (
        <>
            {/* Contenitore principale della parte superiore del footer */}
            <div className="footer-blockUp">

                {/* Sezione dei contatti con orari e informazioni di contatto */}
                <div className="footer-contatti">
                    <ul>
                        <li><h4>CONTATTO</h4></li>
                        <li>LUN - VEN: 08:30 - 16:30H</li>
                        <li>info@hygge.com</li>
                        <li>+34 932 20 38 58</li>
                    </ul>
                </div>

                {/* Sezione delle informazioni utili per l'utente */}
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

                {/* Sezione delle informazioni legali e normative */}
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

                {/* Sezione newsletter con link "About Us" e icone social */}
                <div className="footer-newsletter">
                    {/* Link alla pagina About Us con scroll to top */}
                    <Link to="/about-us" className="about" onClick={() => window.scrollTo(0, 0)}>
                        <h4>ABOUT US</h4>
                    </Link>
                    {/* Container per le icone social */}
                    <div className="social">
                        {/* Link ai social network con apertura in nuova tab */}
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

            {/* Sezione dedicata ai metodi di pagamento con garanzia di sicurezza */}
            <div className="payment">
                {/* Messaggio di garanzia con icona lucchetto */}
                <p><span><FontAwesomeIcon icon={faLock} /></span>Pagamento sicuro garantito</p>
                {/* Lista dei metodi di pagamento supportati */}
                <ul>
                    {/* Icone dei diversi metodi di pagamento con link */}
                    <li><a href="#" target="_blank" rel="noreferrer">
                        <img src="../../svg-icons/maestro.svg" alt="Pagamento con Maestro" />
                    </a></li>
                    <li><a href="#" target="_blank" rel="noreferrer">
                        <img src="../../svg-icons/apple-pay.svg" alt="Pagamento con Apple Pay" />
                    </a></li>
                    <li><a href="#" target="_blank" rel="noreferrer">
                        <img src="../../svg-icons/mastercard.svg" alt="Pagamento con Mastercard" />
                    </a></li>
                    <li><a href="#" target="_blank" rel="noreferrer">
                        <img src="../../svg-icons/visa-logo.svg" alt="Pagamento con Visa" />
                    </a></li>
                    <li><a href="#" target="_blank" rel="noreferrer">
                        <img src="../../svg-icons/google-pay.svg" alt="Pagamento con Google Pay" />
                    </a></li>
                </ul>
            </div>

            {/* Copyright e diritti riservati */}
            <p className="copyright">© 2025, HYGGE. ALL RIGHTS RESERVED</p>
        </>
    );
}
