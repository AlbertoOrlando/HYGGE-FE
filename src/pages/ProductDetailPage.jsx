import { useContext } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from '../cotext/GlobalContest'
import "../components-CSS/ProductDetailPageCSS.css";

export default function ProductDetailPage() {
    // Recupera l'ID dalla rotta
    const { id } = useParams();
    // Estrarre `products` dal contesto globale
    const { products } = useContext(GlobalContext);

    console.log("Products nel contesto:", products);
console.log("ID dalla rotta:", id);

    // Trova il prodotto corrispondente
    const prodotti = products?.find((p) => Number(p.id) === Number(id));

    // Se il prodotto non esiste, mostra un messaggio
    if (!prodotti) {
        return <h2>Prodotto non trovato</h2>;
    }

    return (
        <div className="product-detail">
            <div className="product-image-detail">
                <img src={prodotti.image} alt={prodotti.name} />
                <img src={prodotti.image} alt={prodotti.name} />
            </div>
            <div className="product-info">
                <h1>{prodotti.name}</h1>
                <p className="discounted-price"><strong>Prezzo Scontato:</strong> ${prodotti.discountedPrice || "N/A"}</p>
                <p className="original-price"><strong>Prezzo:</strong> ${prodotti.price}</p>
                <p><strong>Sconto:</strong> {prodotti.discount}%</p>  
                <button>Aggiungi al carrello</button>
            </div>
        </div>
    );
}
