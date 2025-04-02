import { useState } from "react";
import axios from "axios";

export default function FormReviews({ product_id, reloadReviews }) { // Usa product_slug invece di product_id
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dati inviati:", { name, review, rating }); // Log dei dati inviati
        try {
            await axios.post(`http://localhost:3000/api/products/${product_id}/reviews/create`, {
                name,
                review,
                rating,
            });
            reloadReviews(); // Ricarica le recensioni dopo l'invio
            setName("");
            setReview("");
            setRating(0);
        } catch (error) {
            console.error("Errore durante l'invio della recensione:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Scrivi la tua recensione"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Valutazione (1-5)"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                min="1"
                max="5"
                required
            />
            <button type="submit">Invia Recensione</button>
        </form>
    );
}
