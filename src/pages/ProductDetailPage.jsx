import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../components-CSS/ProductDetailPageCSS.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faBoxOpen, faCreditCard, faMedal } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetailPage() {
    const { id } = useParams();

  //  settaggio dello stato del componente
  const [product, setProducts] = useState({});

  // funzione di chiamata verso la rotta store
function fetchProdact() {
    axios.get(`http://localhost:3000/api/products/${id}`)
        .then(res => setProducts(res.data))
        .catch(err => {
            console.log(err);
            if (err.status === 404) redirect("/404")
            })
}
useEffect(fetchProdact, []);

    if (!product) {
        return <h2>Prodotto non trovato</h2>;
    }

    return (
        <>
            <div className="product-detail">
            <div className="product-image-detail">
                {product.images && product.images.length > 0 ? (
                    <>
                        <img src={product.images[0]} alt={product.name} />
                        {product.images[1] && <img src={product.images[1]} alt={product.name} />}
                    </>
                ) : (
                    <p>Immagini non disponibili</p>
                )}
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
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                        <div key={review.id} className="review">
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