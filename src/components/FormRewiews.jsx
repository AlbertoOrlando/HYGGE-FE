// Importa lo hook useState per gestire lo stato locale del componente
import { useState } from "react";
// Importa axios per effettuare le chiamate HTTP al backend
import axios from "axios";
// Importa il file CSS con gli stili specifici per il form delle recensioni
import "../components-CSS/FormReviewsCSS.css"

// Componente principale per il form delle recensioni
// Accetta come props:
// - product_id: l'ID del prodotto per cui si sta lasciando la recensione
// - reloadReviews: funzione per ricaricare le recensioni dopo l'invio
export default function FormReviews({ product_id, reloadReviews }) {
    // Stato per il nome dell'utente che lascia la recensione
    const [name, setName] = useState("");
    // Stato per il testo della recensione
    const [review, setReview] = useState("");
    // Stato per il punteggio della recensione (da 1 a 5)
    const [rating, setRating] = useState(0);

    // Funzione che gestisce l'invio del form
    const handleSubmit = async (e) => {
        // Previene il comportamento predefinito del form
        e.preventDefault();
        // Log dei dati che verranno inviati per debug
        console.log("Dati inviati:", { name, review, rating });

        try {
            // Effettua la chiamata POST al backend per salvare la recensione
            await axios.post(`http://localhost:3000/api/products/${product_id}/reviews/create`, {
                name,       // Nome dell'utente
                review,     // Testo della recensione
                rating,     // Punteggio assegnato
            });
            // Ricarica le recensioni per mostrare quella appena aggiunta
            reloadReviews();
            // Resetta il form dopo l'invio
            setName("");
            setReview("");
            setRating(0);
        } catch (error) {
            // Gestione degli errori durante l'invio
            console.error("Errore durante l'invio della recensione:", error);
        }
    };

    // Rendering del componente
    return (
        // Contenitore principale del form recensioni
        <div className="reviews-container">
            {/* Titolo del form */}
            <h3 className="reviews-title">Lascia una recensione</h3>
            {/* Form per l'inserimento della recensione */}
            <form onSubmit={handleSubmit} className="reviews-form">
                {/* Campo per il nome dell'utente */}
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Il tuo nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="reviews-input"
                    />
                </div>
                {/* Area di testo per la recensione */}
                <div className="form-group">
                    <textarea
                        placeholder="Scrivi la tua recensione"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className="reviews-textarea"
                    />
                </div>
                {/* Campo per il punteggio */}
                <div className="form-group rating-group">
                    <input
                        type="number"
                        placeholder="Valutazione (1-5)"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        min="1"    // Valore minimo consentito
                        max="5"    // Valore massimo consentito
                        required
                        className="reviews-rating"
                    />
                </div>
                {/* Pulsante per inviare la recensione */}
                <button type="submit" className="reviews-submit">
                    Invia Recensione
                </button>
            </form>
        </div>
    );
}
