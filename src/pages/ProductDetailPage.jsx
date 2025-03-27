import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GlobalContext from '../cotext/GlobalContest';
import { Link } from "react-router-dom";
import "../components-CSS/ProductDetailPageCSS.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faBoxOpen, faCreditCard, faMedal, faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";

// Form
import FormReviews from "../components/FormRewiews";

export default function ProductDetailPage() {
    const { products, addToCart } = useContext(GlobalContext);
    const { id } = useParams();

    //  settaggio dello stato del componente
    const [product, setProducts] = useState({});
    const [loadingCart, setLoadingCart] = useState(false); // Nuovo stato per il caricamento del carrello

    // funzione di chiamata verso la rotta store
    function fetchProdact() {
        axios.get(`http://localhost:3000/api/products/${id}`)
            .then(res => setProducts(res.data))
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchProdact();
        window.scrollTo(0, 0); // Scorri in alto ogni volta che cambia il prodotto
    }, [id]);

    const handleAddToCartClick = async () => {
        console.log("Caricamento iniziato");
        setLoadingCart(true); // Inizia il caricamento
        try {
            // Simula un ritardo nella funzione addToCart
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Ritardo di 2 secondi
            await addToCart(product);
            console.log("Prodotto aggiunto al carrello!");
        } catch (error) {
            console.error("Errore durante l'aggiunta al carrello:", error);
        } finally {
            setLoadingCart(false); // Termina il caricamento    
            console.log("Caricamento terminato");
        }
    };

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
                    <p className="discounted-price"><strong>Prezzo Scontato:</strong> ${(product.price - (product.price * product.discount / 100)).toFixed(2)}</p>
                    <p className="original-price"><strong>Prezzo:</strong> ${product.price}</p>
                    <p><strong>Sconto:</strong> {product.discount}%</p>
                    <button onClick={handleAddToCartClick} disabled={loadingCart}>
                        {loadingCart ? <FontAwesomeIcon icon={faSpinner} spin /> : "Aggiungi al carrello"}
                    </button>
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
                            <strong>{review.name}</strong> <br />
                            <span>
                                {review.rating >= 1 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                {review.rating >= 2 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                {review.rating >= 3 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                {review.rating >= 4 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                {review.rating >= 5 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                            </span>
                            <p>{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p>Nessuna recensione disponibile.</p>
                )}
            </div>

            <div className="form-reviews">
                <FormReviews product_id={id} reloadReviews={fetchProdact} />
            </div>

            <h2>Prodotti correlati</h2>
            <div className="new-arrivals">
                {products.slice(10, 15).map(product => (
                    <Link to={`/prodotti/${product.id}`} className="card-box" key={product.id}>
                        <div className="card-body">
                            <img src={product.images[0]} alt={product.name} className="product-image2" />
                            <img src={product.images[1]} alt={product.name} className="product-image12" />
                        </div>
                        <div className="card-text">
                            <h3>{product.name}</h3>
                            <span>{product.price} €</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}