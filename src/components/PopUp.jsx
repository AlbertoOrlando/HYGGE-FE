// Import CSS
import "../components-CSS/PopUpCSS.css"
// Import Axios
import axios from "axios";

// useState
import { useState, useEffect } from "react"

export default function PopUp() {

    // Stato del componente per controllare se il pop-up è visbile o meno
    const [isVisible, setIsVisible] = useState(true);
    // Stato dell'email per salvare il valore dell'email inserita dall'utente
    const [userMail, setUserMail] = useState("");

    function getEmailPop() {
        console.log("Tentativo di invio email:", userMail); // Log dell'email inserita
        axios.post(`http://localhost:3000/api/products/email/create`, {
            email: userMail, // Passa l'email come payload
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log("Risposta dal server:", response.data); // Log della risposta
            })
            .catch(error => {
                console.error("Errore durante il salvataggio dell'email:", error.response || error); // Log dettagliato dell'errore
            });
    }

    // Funzione per chiudere il pop-up e salvare lo stato in localStorage
    const handleClose = () => {
        setIsVisible(false);
        // localStorage.setItem("hasSeenPopup", "true");
    };

    // Contenuto del componente
    return (

        // Condizione per la visualizzazione del componente
        isVisible &&
        (
            <div className="container-pop">

                {/* Messaggio */}
                <div className="message-pop">
                    <h1>Benvenuti</h1>
                </div>
                {/* Email */}
                <div className="email-pop">
                    <label htmlFor="email">Inserisci la tua mail</label>
                    <input
                        type="text"
                        name="email"
                        value={userMail}
                        //   Evento onChage per aggiornare lo stato
                        onChange={(e) => setUserMail(e.target.value)} />
                </div>
                {/* Bottone */}
                <div className="button-pop">
                    <button onClick={() => { getEmailPop(); handleClose(); }}>Invia</button>
                </div>

            </div>
        )
    )
}