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
    // Stato per il messaggio di errore
    const [errorMessage, setErrorMessage] = useState("");
    // Stato per memorizzare le email esistenti
    // const [existingEmails, setExistingEmails] = useState([]);

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

    // useEffect(() => {
    //     // Check localStorage to see if the popup has already been shown
    //     const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    //     if (hasSeenPopup === "true") {
    //         setIsVisible(false); // Hide the popup if it has already been shown
    //         return;
    //     }

    //     // Fetch all emails from the backend when the component is mounted
    //     axios.get(`http://localhost:3000/api/products/email`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => {
    //             // Extract the email property and normalize it
    //             const emails = response.data.map(item => item.email.toLowerCase().trim());
    //             setExistingEmails(emails); // Save processed emails in state
    //             console.log(emails);
    //         })
    //         .catch(error => {
    //             console.error("Errore durante il recupero delle email:", error.response?.data || error.message);
    //         });
    // }, []); // Run only on component mount

    // useEffect(() => {
    //     // Check if the entered email exists in the database (case-insensitive)
    //     if (existingEmails.includes(userMail.toLowerCase().trim())) {
    //         setIsVisible(false); // Hide the popup if the email exists
    //     }
    // }, [userMail, existingEmails]); // Run the check whenever userMail or existingEmails changes

    function getEmailPop(e) {
        // Previene il comportamento predefinito del form
        e.preventDefault();
        // Log dell'email inserita
        console.log("Tentativo di invio email:", userMail);

        // Controlla se l'input è vuoto o solo spazi
        if (!userMail.trim()) {
            console.error("Errore: il campo email è vuoto.");
            // Imposta il messaggio di errore
            setErrorMessage("Per favore, inserisci un'email valida.");
            return;
        }
        // Resetta il messaggio di errore se l'email è valida
        setErrorMessage("");

        axios.post(`http://localhost:3000/api/products/email/create`, {
            // Passa l'email come payload
            email: userMail,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                // Log della risposta
                console.log("Risposta dal server:", response.data);
                // Resetta eventuali messaggi di errore 
                setErrorMessage("");
                // Chiude il pop-up dopo il successo
                handleClose();
            })
            .catch(error => {
                // Log dettagliato dell'errore
                console.error("Errore durante il salvataggio dell'email:", error.response?.data || error.message);
                // Mostra un messaggio di errore
                setErrorMessage("Email già registrata");
            });
    }

    // Funzione per chiudere il pop-up e salvare lo stato in localStorage
    const handleClose = () => {
        setIsVisible(false);
        // localStorage.setItem("hasSeenPopup", "true"); // Save the flag in localStorage
    };

    // Contenuto del componente
    return (
        isVisible &&
        (
            <div className="popup-overlay">
                <div className="container-pop">
                    <div className="message-pop">
                        <h2>Benvenuti</h2>
                    </div>
                    <form onSubmit={getEmailPop}>
                        <div className="email-pop">
                            <label htmlFor="email">Registra la tua email per avere il 10% di sconto</label>
                            <input
                                type="email"
                                placeholder="Inserisci email..."
                                name="email"
                                value={userMail}
                                onChange={(e) => setUserMail(e.target.value)} />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        <div className="button-pop">
                            <button type="submit">Invia</button>
                        </div>
                    </form>
                    <div className="button-close">
                        <button className="x-button" onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
            </div>
        )
    );
}