import { useContext } from "react";
import GlobalContext from "../cotext/GlobalContest";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../components-CSS/ProdottiPageCSS.css"
import "../components-CSS/CategoryPageCSS.css"
export default function RisultatiRicercaPage() {
    const { search } = useContext(GlobalContext); // Ottieni search dal contesto

    return (
        <div>
            <h1>Risultati ricerca</h1>
            <div className="product-grid-prodotti">
                {search && search.length > 0 ? (
                    search.map(product => (
                        <div className="product-card" key={product.id}>
                            <Link to={`/prodotti/${product.id}`}>
                                <ProductCard product={product} />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Nessun risultato trovato.</p>
                )}
            </div>
        </div>
    );
}
