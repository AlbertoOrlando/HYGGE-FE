// Import CSS
import "../components-CSS/PopUpCSS.css"

// useState
import { useState, useEffect } from "react"

export default function PopUp() {

    // Stato del componente per controllare se il pop-up è visbile o meno
    const [isVisible, setIsVisible] = useState(true);
    // Stato dell'email per salvare il valore dell'email inserita dall'utente
    const [userMail, setUserMail] = useState("");

    // Controlla localStorage per determinare se il pop-up è già stato mostrato
    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("hasSeenPopup");
        if (hasSeenPopup) {
            setIsVisible(false);
        }
    }, []);

    // gestione invio con tastiera
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup per rimuovere il listener quando il componente viene smontato
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Funzione per chiudere il pop-up e salvare lo stato in localStorage
    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("hasSeenPopup", "true");
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
                    <button onClick={handleClose}>Chiudi</button>
                </div>

            </div>
        )
    )
}