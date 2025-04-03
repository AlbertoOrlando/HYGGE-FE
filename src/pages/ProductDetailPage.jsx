// Importa gli hook di React necessari per la gestione dello stato, effetti e contesto
import { useState, useEffect, useContext } from "react";
// Importa useParams per recuperare i parametri dinamici dall'URL
import { useParams } from "react-router-dom";
// Importa axios per effettuare le chiamate HTTP al backend
import axios from "axios";
// Importa il contesto globale dell'applicazione
import GlobalContext from '../cotext/GlobalContest';
// Importa il componente Link per la navigazione tra pagine
import { Link } from "react-router-dom";
// Importa gli stili CSS specifici per la pagina di dettaglio
import "../components-CSS/ProductDetailPageCSS.css";
// Importa il componente per le icone FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Importa le icone specifiche necessarie
import { faTruckFast, faBoxOpen, faCreditCard, faMedal, faStar, faSpinner } from "@fortawesome/free-solid-svg-icons";
// Importa il componente per gestire il form delle recensioni
import FormReviews from "../components/FormRewiews";

// Definizione del componente principale della pagina dettaglio prodotto
export default function ProductDetailPage() {
    // Estrae le funzioni e i dati necessari dal contesto globale
    const { products, addToCart } = useContext(GlobalContext);
    // Recupera lo slug del prodotto dai parametri dell'URL
    const { slug } = useParams();

    // Inizializzazione degli stati locali
    const [product, setProducts] = useState({}); // Dettagli del prodotto corrente
    const [relatedProducts, setRelatedProducts] = useState([]); // Lista dei prodotti correlati
    const [loadingCart, setLoadingCart] = useState(false); // Stato di caricamento per l'aggiunta al carrello
    const [confirmationMessage, setConfirmationMessage] = useState(""); // Messaggio di conferma operazioni

    // Funzione per recuperare i dati del prodotto dal backend
    function fetchProdact() {
        axios.get(`http://localhost:3000/api/products/${slug}`)
            .then(res => setProducts(res.data)) // Aggiorna lo stato con i dati ricevuti
            .catch(err => {
                console.log(err); // Gestisce eventuali errori
            });
    }

    // Effetto per caricare i dati del prodotto quando cambia lo slug
    useEffect(() => {
        fetchProdact(); // Carica i dati del prodotto
        window.scrollTo(0, 0); // Scorre la pagina all'inizio
    }, [slug]);

    // Effetto per gestire i prodotti correlati
    useEffect(() => {
        if (product && product.category_id) {
            // Filtra i prodotti della stessa categoria escludendo quello corrente
            const related = products
                .filter(p => p.category_id === product.category_id && p.id !== product.id)
                .slice(0, 4); // Limita a 4 prodotti correlati
            setRelatedProducts(related); // Aggiorna lo stato dei prodotti correlati
        }
    }, [product, products]);

    // Gestore del click sul pulsante "Aggiungi al carrello"
    const handleAddToCartClick = async () => {
        console.log("Inizio processo di aggiunta al carrello");
        setLoadingCart(true); // Attiva l'indicatore di caricamento
        try {
            // Simula un ritardo per migliorare l'UX
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await addToCart(product); // Aggiunge il prodotto al carrello
            console.log("Prodotto aggiunto con successo");
            setConfirmationMessage("Aggiunto con successo!"); // Mostra conferma
        } catch (error) {
            console.error("Errore durante l'aggiunta:", error);
        } finally {
            setLoadingCart(false); // Disattiva l'indicatore di caricamento
            // Rimuove il messaggio di conferma dopo 2 secondi
            setTimeout(() => setConfirmationMessage(""), 2000);
        }
    };

    // Rendering condizionale se il prodotto non è trovato
    if (!product) {
        return <h2>Prodotto non trovato</h2>;
    }

    // Rendering del componente
    return (
        <>
            {/* Contenitore principale per i dettagli del prodotto */}
            <div className="product-detail">
                {/* Sezione per le immagini del prodotto */}
                <div className="product-image-detail">
                    {/* Verifica se il prodotto ha immagini disponibili */}
                    {product.images && product.images.length > 0 ? (
                        <>
                            {/* Mostra la prima immagine del prodotto */}
                            <img src={product.images[0]} alt={product.name} />
                            {/* Mostra la seconda immagine del prodotto, se disponibile */}
                            {product.images[1] && <img src={product.images[1]} alt={product.name} />}
                        </>
                    ) : (
                        // Messaggio mostrato se non ci sono immagini disponibili
                        <p>Immagini non disponibili</p>
                    )}
                </div>

                {/* Sezione delle informazioni del prodotto */}
                <div className="product-info">
                    {/* Nome del prodotto */}
                    <h1>{product.name}</h1>
                    {/* Prezzo scontato calcolato in base alla percentuale di sconto */}
                    <p className="discounted-price">
                        <strong>Prezzo Scontato:</strong>
                        ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                    </p>
                    {/* Prezzo originale del prodotto */}
                    <p className="original-price">
                        <strong>Prezzo:</strong> ${product.price}
                    </p>
                    {/* Percentuale di sconto applicata */}
                    <p><strong>Sconto:</strong> {product.discount}%</p>

                    {/* Pulsante per aggiungere il prodotto al carrello */}
                    <button onClick={handleAddToCartClick} disabled={loadingCart}>
                        {loadingCart ? (
                            // Mostra un'icona di caricamento mentre il prodotto viene aggiunto al carrello
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : confirmationMessage ? (
                            // Mostra un messaggio di conferma se il prodotto è stato aggiunto
                            confirmationMessage
                        ) : (
                            // Testo predefinito del pulsante
                            "Aggiungi al carrello"
                        )}
                    </button>

                    {/* Sezione con icone che mostrano i vantaggi del prodotto */}
                    <div className="icons">
                        <ul>
                            {/* Politica di restituzione */}
                            <li><p><FontAwesomeIcon icon={faBoxOpen} /> 14 giorni per restituzioni e cambi</p></li>
                            {/* Informazioni sulla spedizione */}
                            <li><p><FontAwesomeIcon icon={faTruckFast} /> Spedizioni in tutta Europa</p></li>
                            {/* Opzione di pagamento flessibile */}
                            <li><p><FontAwesomeIcon icon={faCreditCard} /> Compra ora, paga dopo</p></li>
                            {/* Garanzia del prodotto */}
                            <li><p><FontAwesomeIcon icon={faMedal} /> 2 anni di garanzia</p></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sezione delle recensioni del prodotto */}
            <div className="container-reviews">
                <h2>Recensioni</h2>
                {/* Verifica se ci sono recensioni disponibili */}
                {product.reviews && product.reviews.length > 0 ? (
                    // Mappa ogni recensione per mostrarla
                    product.reviews.map((review) => {
                        // Formatta la data della recensione in italiano
                        const date = new Date(review.created_at);
                        const formattedDate = `${date.getDate()} ${date.toLocaleString('it-IT', { month: 'long' })} ${date.getFullYear()}`;
                        return (
                            // Contenitore per una singola recensione
                            <div key={review.id} className="review">
                                {/* Nome dell'autore della recensione */}
                                <strong>{review.name}</strong> <br />
                                {/* Mostra le stelle in base al punteggio della recensione */}
                                <span>
                                    {review.rating >= 1 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                    {review.rating >= 2 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                    {review.rating >= 3 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                    {review.rating >= 4 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                    {review.rating >= 5 ? <FontAwesomeIcon className="star" icon={faStar} /> : <FontAwesomeIcon className="star2" icon={faStar} />}
                                </span>
                                {/* Testo della recensione */}
                                <p>{review.review}</p>
                                {/* Data della recensione */}
                                <p className="data">{formattedDate}</p>
                            </div>
                        );
                    })
                ) : (
                    // Messaggio mostrato se non ci sono recensioni
                    <p>Nessuna recensione disponibile.</p>
                )}
            </div>

            {/* Form per aggiungere una nuova recensione */}
            <div className="form-reviews">
                <FormReviews product_id={slug} reloadReviews={fetchProdact} /> {/* Passa lo slug e la funzione per ricaricare le recensioni */}
            </div>

            {/* Sezione dei prodotti correlati */}
            <h2>Prodotti correlati</h2>
            <div className="new-arrivals">
                {/* Verifica se ci sono prodotti correlati */}
                {relatedProducts.length > 0 ? (
                    // Mappa ogni prodotto correlato per mostrarlo
                    relatedProducts.map(product => (
                        <Link to={`/prodotti/${product.slug}`} className="card-box" key={product.id}>
                            <div className="card-body">
                                {/* Mostra le immagini del prodotto correlato */}
                                <img src={product.images[0]} alt={product.name} className="product-image2" />
                                <img src={product.images[1]} alt={product.name} className="product-image12" />
                            </div>
                            <div className="card-text">
                                {/* Nome e prezzo del prodotto correlato */}
                                <h3>{product.name}</h3>
                                <span>{product.price} €</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    // Messaggio mostrato se non ci sono prodotti correlati
                    <p>Nessun prodotto correlato disponibile.</p>
                )}
            </div>
        </>
    );
}