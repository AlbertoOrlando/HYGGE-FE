// Importa l'hook useContext per accedere al contesto globale dell'applicazione
import { useContext } from "react";
// Importa il contesto globale che contiene lo stato della wishlist
import GlobalContext from "../cotext/GlobalContest";
// Importa gli stili CSS specifici per la pagina della wishlist
import "../components-CSS/WishListCSS.css";
// Importa il componente Link per la navigazione tra le pagine
import { Link } from "react-router-dom";

// Definizione del componente principale della pagina Wishlist
export default function WishListPage() {
    // Estrae la lista dei desideri e la funzione per modificarla dal contesto globale
    const { wishlist, toggleWishlist } = useContext(GlobalContext);

    // Rendering del componente
    return (
        // Contenitore principale della pagina wishlist
        <div className="wishlist-container">
            {/* Titolo della pagina */}
            <h1>Lista dei Desideri</h1>
            {/* Verifica se la wishlist è vuota */}
            {wishlist.length === 0 ? (
                // Messaggio mostrato se non ci sono prodotti nella wishlist
                <p>Non hai ancora aggiunto prodotti alla tua lista dei desideri.</p>
            ) : (
                // Griglia che contiene i prodotti della wishlist
                <div className="wishlist-grid">
                    {/* Mappa ogni prodotto nella wishlist */}
                    {wishlist.map((product) => (
                        // Contenitore per ogni prodotto nella wishlist
                        <div key={product.id} className="wishlist-item">
                            {/* Immagine del prodotto */}
                            <img src={product.images[0]} alt={product.name} />
                            {/* Nome del prodotto */}
                            <h3>{product.name}</h3>
                            {/* Prezzo del prodotto */}
                            <p>Prezzo: €{product.price}</p>
                            {/* Pulsante per rimuovere il prodotto dalla wishlist */}
                            <button onClick={() => toggleWishlist(product)}>Rimuovi</button>
                            {/* Link per visualizzare i dettagli del prodotto */}
                            <Link to={`/prodotti/${product.id}`}>Visualizza Prodotto</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}