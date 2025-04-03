// Funzioni di utilità per gestire il localStorage del browser
// localStorage.removeItem("hasSeenPopup");  // Rimuove solo il flag che indica se l'utente ha visto il popup
// localStorage.clear();                      // Rimuove tutti i dati salvati nel localStorage del browser

// Importa il file CSS che contiene gli stili specifici per il popup
import "../components-CSS/PopUpCSS.css"
// Importa i componenti necessari per utilizzare le icone di FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Importa l'icona 'X' che verrà usata come pulsante di chiusura
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Importa axios per effettuare chiamate HTTP al backend
import axios from "axios";

// Importa gli hook di React necessari per gestire lo stato e gli effetti del componente
import { useState, useEffect } from "react"

export default function PopUp() {
    // Inizializza lo stato di visibilità del popup controllando il localStorage
    // Questo determina se il popup deve essere mostrato o nascosto
    const [isVisible, setIsVisible] = useState(() => {
        const hasSeenPopup = localStorage.getItem("hasSeenPopup");
        // Mostra il popup solo se l'utente non l'ha mai visto prima (hasSeenPopup non è "true")
        return hasSeenPopup !== "true";
    });

    // Stato per memorizzare l'email inserita dall'utente nel form
    const [userMail, setUserMail] = useState("");
    // Stato per gestire i messaggi di errore da mostrare all'utente
    const [errorMessage, setErrorMessage] = useState("");
    // Stato per memorizzare l'array delle email già registrate nel sistema
    const [existingEmails, setExistingEmails] = useState([]);
    // Stato per gestire il processo di invio del form ed evitare invii multipli
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Effetto per il debugging: monitora e logga i cambiamenti di stato principali
    useEffect(() => {
        console.group('Cambiamenti Stato PopUp');
        console.log({
            isVisible,           // Stato di visibilità del popup
            userMail,           // Email correntemente inserita
            errorMessage,       // Eventuali messaggi di errore
            existingEmailsCount: existingEmails.length  // Numero di email già registrate
        });
        console.groupEnd();
    }, [isVisible, userMail, errorMessage, existingEmails]);

    // Effetto per gestire il blocco dello scroll della pagina quando il popup è visibile
    useEffect(() => {
        console.log('Effetto blocco scroll:', isVisible ? 'bloccato' : 'sbloccato');
        if (isVisible) {
            // Blocca lo scroll della pagina quando il popup è visibile
            document.body.style.overflow = 'hidden';
        } else {
            // Ripristina lo scroll quando il popup è nascosto
            document.body.style.overflow = 'unset';
        }

        // Funzione di cleanup che viene eseguita quando il componente viene smontato
        return () => {
            console.log('Pulizia: ripristino dello scroll');
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    // Effetto per caricare la lista delle email già registrate all'avvio del componente
    useEffect(() => {
        console.group('Inizializzazione Popup');
        console.log('Recupero lista email dal server...');

        // Chiamata GET al backend per recuperare tutte le email registrate
        axios.get(`http://localhost:3000/api/products/email`, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                // Normalizza le email (converte in minuscolo e rimuove spazi)
                const emails = response.data.map(item => item.email.toLowerCase().trim());
                console.log('Email recuperate dal server:', emails.length);
                setExistingEmails(emails);
            })
            .catch(error => {
                // Gestione degli errori durante il recupero delle email
                console.error('Errore durante il recupero delle email:', {
                    message: error.response?.data || error.message,
                    status: error.response?.status,
                    error
                });
            })
            .finally(() => {
                console.groupEnd();
            });
    }, []);

    // Effetto per verificare in tempo reale se l'email inserita esiste già
    useEffect(() => {
        console.group('Verifica Email');
        // Normalizza l'email inserita per il confronto
        const normalizedEmail = userMail.toLowerCase().trim();
        console.log('Verifica email in corso:', normalizedEmail);
        console.log('Confronto con email esistenti:', existingEmails.length);

        // Controlla se l'email è già presente nel database
        if (existingEmails.includes(normalizedEmail)) {
            console.log('Email già presente nel database');
            setErrorMessage("Email già registrata");
        } else {
            // Resetta il messaggio di errore se l'email non esiste
            setErrorMessage("");
        }
        console.groupEnd();
    }, [userMail, existingEmails]);

    // Funzione che gestisce l'invio del form
    function getEmailPop(e) {
        e.preventDefault();  // Previene il comportamento predefinito del form

        // Previene invii multipli mentre è già in corso una richiesta
        if (isSubmitting) {
            return;
        }

        console.group('Invio Email');
        console.log('Tentativo di invio email:', userMail);

        // Validazione: controlla che l'email non sia vuota
        if (!userMail.trim()) {
            console.warn('Tentativo di invio email vuota bloccato');
            setErrorMessage("Per favore, inserisci un'email valida.");
            console.groupEnd();
            return;
        }

        // Imposta lo stato di invio in corso
        setIsSubmitting(true);
        console.log('Invio email al server in corso...');

        // Effettua la chiamata POST al backend per registrare la nuova email
        axios.post(`http://localhost:3000/api/products/email/create`,
            { email: userMail },
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(response => {
                // Gestione del successo
                console.log('Risposta positiva dal server:', response.data);
                setErrorMessage("");
                handleEmailSuccess();
            })
            .catch(error => {
                // Gestione degli errori
                console.error('Errore durante l\'invio dell\'email:', {
                    message: error.response?.data || error.message,
                    status: error.response?.status,
                    error
                });
                setErrorMessage("Email già registrata");
            })
            .finally(() => {
                // Reset dello stato di invio
                setIsSubmitting(false);
                console.groupEnd();
            });
    }

    // Funzione per gestire la chiusura manuale del popup
    const handleClose = (e) => {
        console.log('Chiusura popup in corso');
        setIsVisible(false);
        // Salva nel localStorage che l'utente ha visto il popup
        localStorage.setItem("hasSeenPopup", "true");
    };

    // Funzione per gestire il successo dell'invio dell'email
    const handleEmailSuccess = () => {
        console.log('Email registrata con successo, chiusura popup');
        setIsVisible(false);
        // Salva nel localStorage che l'utente ha completato la registrazione
        localStorage.setItem("hasSeenPopup", "true");
    };

    // Funzione per prevenire la propagazione dei click all'interno del popup
    const handleContainerClick = (e) => {
        e.stopPropagation();  // Impedisce che il click raggiunga l'overlay
    };

    // Rendering condizionale del popup: viene mostrato solo se isVisible è true
    return (
        isVisible && (
            <div className="popup-overlay" onClick={handleClose}>
                <div className="container-pop" onClick={handleContainerClick}>
                    {/* Sezione del titolo del popup */}
                    <div className="message-pop">
                        <h2>Benvenuti</h2>
                    </div>
                    {/* Form per la raccolta dell'email */}
                    <form onSubmit={getEmailPop}>
                        <div className="email-pop">
                            <label htmlFor="email">
                                Registra la tua email per avere il 10% di sconto
                            </label>
                            <input
                                type="email"
                                placeholder="Inserisci email..."
                                name="email"
                                value={userMail}
                                onChange={(e) => setUserMail(e.target.value)}
                            />
                            {/* Mostra eventuali messaggi di errore */}
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        {/* Pulsante di invio con stato di caricamento */}
                        <div className="button-pop">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Invio in corso...' : 'Invia'}
                            </button>
                        </div>
                    </form>
                    {/* Pulsante di chiusura del popup */}
                    <div className="button-close">
                        <button
                            className="x-button"
                            onClick={handleClose}
                            aria-label="Chiudi popup"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}