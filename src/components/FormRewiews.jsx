import { useState } from "react";
import axios from "axios";
import "../components-CSS/FormReviewsCSS.css"

export default function FormReviews({ product_id, reloadReviews }) {
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dati inviati:", { name, review, rating });
        try {
            await axios.post(`http://localhost:3000/api/products/${product_id}/reviews/create`, {
                name,
                review,
                rating,
            });
            reloadReviews();
            setName("");
            setReview("");
            setRating(0);
        } catch (error) {
            console.error("Errore durante l'invio della recensione:", error);
        }
    };

    return (
        <div className="reviews-container">
            <h3 className="reviews-title">Lascia una recensione</h3>
            <form onSubmit={handleSubmit} className="reviews-form">
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
                <div className="form-group">
                    <textarea
                        placeholder="Scrivi la tua recensione"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className="reviews-textarea"
                    />
                </div>
                <div className="form-group rating-group">
                    <input
                        type="number"
                        placeholder="Valutazione (1-5)"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        min="1"
                        max="5"
                        required
                        className="reviews-rating"
                    />
                </div>
                <button type="submit" className="reviews-submit">Invia Recensione</button>
            </form>
        </div>
    );
}
