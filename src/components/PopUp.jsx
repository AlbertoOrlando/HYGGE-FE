// Import CSS
import "../components-CSS/PopUpCSS.css"
// Import fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Import Axios
import axios from "axios";

// useState
import { useState, useEffect } from "react"

export default function PopUp() {

    // Stato del componente per controllare se il pop-up è visbile o meno
    const [isVisible, setIsVisible] = useState(true);
    // Stato dell'email per salvare il valore dell'email inserita dall'utente
    const [userMail, setUserMail] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Stato per il messaggio di errore

    // Aggiungi useEffect per gestire lo scroll
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    function getEmailPop(e) {
        e.preventDefault(); // Previene il comportamento predefinito del form
        console.log("Tentativo di invio email:", userMail); // Log dell'email inserita

        if (!userMail.trim()) { // Controlla se l'input è vuoto o solo spazi
            console.error("Errore: il campo email è vuoto.");
            setErrorMessage("Per favore, inserisci un'email valida."); // Imposta il messaggio di errore
            return;
        }

        setErrorMessage(""); // Resetta il messaggio di errore se l'email è valida

        axios.post(`http://localhost:3000/api/products/email/create`, {
            email: userMail, // Passa l'email come payload
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log("Risposta dal server:", response.data); // Log della risposta
                setErrorMessage(""); // Resetta eventuali messaggi di errore
                handleClose(); // Chiude il pop-up dopo il successo
            })
            .catch(error => {
                console.error("Errore durante il salvataggio dell'email:", error.response?.data || error.message); // Log dettagliato dell'errore
                setErrorMessage("Email già registrata"); // Mostra un messaggio di errore
            });
    }

    // Funzione per chiudere il pop-up e salvare lo stato in localStorage
    const handleClose = () => {
        setIsVisible(false);
        // localStorage.setItem("hasSeenPopup", "true");
    };

    // Contenuto del componente
    return (
        isVisible && (
            <>
                <div className="popup-overlay"></div>
                <div className="container-pop">
                    <div className="message-pop">
                        <h2>Benvenuti</h2>
                    </div>
                    <form onSubmit={getEmailPop}>
                        <div className="email-pop">
                            <label htmlFor="email">Registra la tua email</label>
                            <input
                                type="email"
                                placeholder="Inserisci email..."
                                name="email"
                                value={userMail}
                                onChange={(e) => setUserMail(e.target.value)} />
                            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostra il messaggio di errore */}
                        </div>
                        <div className="button-pop">
                            <button type="submit">Invia</button>
                        </div>
                    </form>
                    <div className="button-close">
                        <button className="x-button" onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
            </>
        )
    );
}