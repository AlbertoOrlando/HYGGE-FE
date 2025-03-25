import axios from "axios";

// Import FormCSS
import "../components-CSS/FormReviewsCSS.css";

import { useState } from "react";

const FormReviews = ({ product_id, reloadReviews }) => {
    const initialValue = { name: "", review: "", rating: 1 }

    const [formData, setFormData] = useState(initialValue)

    const setFieldValue = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const urlEndpoint = `http://localhost:3000/api/products/${product_id}/reviews/create`

    const submitReview = (e) => {
        e.preventDefault();
        console.log('Submitting review:', formData);
        axios.post(urlEndpoint, formData).then(
            () => {
                console.log('Review submitted successfully');
                setFormData(initialValue)
                reloadReviews()
            }
        )
            .catch(err => {
                console.log('Error submitting review:', err);
            })
    }

    return (
        <div className="form">
            <h5>Aggiungi una recensione</h5>
            <form onSubmit={submitReview}>
                <div className="">
                    <label>Name</label>
                    <input type="text" name="name" className="" value={formData.name} onChange={setFieldValue} />
                </div>
                <div className="">
                    <label>Review</label>
                    <textarea className="" name="review" value={formData.review} onChange={setFieldValue} ></textarea>
                </div>
                <div className="">
                    <label>Voto</label>
                    <input type="number" min="1" max="5" className="" name='rating' value={formData.rating} onChange={setFieldValue} />
                </div>
                <div className="">
                    <button type="submit" className="">
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormReviews