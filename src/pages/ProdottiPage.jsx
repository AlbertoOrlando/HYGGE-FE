// Importa l'hook useContext per accedere al contesto globale dell'applicazione
import { useContext } from "react";
// Importa il contesto globale che contiene tutti i dati dei prodotti
import GlobalContext from '../cotext/GlobalContest';

// Importa gli stili CSS specifici per la pagina dei prodotti
import "../components-CSS/ProdottiPageCSS.css";
// Importa il componente ProductCard che definisce la struttura di ogni carta prodotto
import ProductCard from "../components/ProductCard";
// Importa il componente Link per la navigazione tra le pagine
import { Link } from "react-router-dom";

// Definizione del componente principale della pagina prodotti
export default function ProdottiPage() {
    // Estrae l'array dei prodotti dal contesto globale
    const { products } = useContext(GlobalContext);

    // Rendering del componente
    return (
        // Contenitore principale della lista prodotti
        <div className="product-list">

            <h1>Lista Prodotti</h1>

            <p className="prodotti-page-descrizione"><i>Scopri tutti i nostri prodotti</i></p>

            <div className="product-grid-prodotti">
                {/* Mappa ogni prodotto in una card cliccabile */}
                {products.map(product => (
                    // Contenitore della singola card con chiave univoca basata sullo slug
                    <div className="product-card" key={product.slug}>
                        {/* Link alla pagina dettaglio del prodotto specifica */}
                        <Link to={`/prodotti/${product.slug}`}>
                            {/* Componente ProductCard che mostra i dettagli del prodotto */}
                            <ProductCard product={product} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
