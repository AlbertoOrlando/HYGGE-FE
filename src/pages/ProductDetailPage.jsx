import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from '../cotext/GlobalContest'
import "../components-CSS/ProductDetailPageCSS.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faBoxOpen, faCreditCard, faMedal } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailPage() {
    const { id } = useParams();
    const { products } = useContext(GlobalContext);
    const [reviews, setReviews] = useState([]);

    const product = products?.find((p) => Number(p.id) === Number(id));

    useEffect(() => {
        fetch(`/api/reviews?product_id=${id}`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error("Errore nel recupero delle recensioni:", error));
    }, [id]);

    if (!product) {
        return <h2>Prodotto non trovato</h2>;
    }

    return (
        <>
            <div className="product-detail">
                <div className="product-image-detail">
                    <img src={product.image[0]} alt={product.name} />
                    <img src={product.image[1]} alt={product.name} />
                </div>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="discounted-price"><strong>Prezzo Scontato:</strong> ${ (product.price - (product.price * product.discount / 100)).toFixed(2) }</p>
                    <p className="original-price"><strong>Prezzo:</strong> ${product.price}</p>
                    <p><strong>Sconto:</strong> {product.discount}%</p>  
                    <button>Aggiungi al carrello</button>
                    <div className="icons">
                        <ul>
                            <li><p><FontAwesomeIcon icon={faBoxOpen} /> 14 giorni per restituzioni e cambi</p></li>
                            <li><p><FontAwesomeIcon icon={faTruckFast} /> Spedizioni in tutta Europa</p></li>
                            <li><p><FontAwesomeIcon icon={faCreditCard} /> Compra ora, paga dopo</p></li>
                            <li><p><FontAwesomeIcon icon={faMedal} /> 2 anni di garanzia</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="container-reviews">
                <h2>Recensioni</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review">
                            <strong>{review.name}</strong> 
                            <p>⭐ {review.rating} / 5</p>
                            <p>{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p>Nessuna recensione disponibile.</p>
                )}
            </div>
        </>
    );
}