import { useContext, useState } from "react"; // Importa useContext e useState
import GlobalContext from "../cotext/GlobalContest"; // Assicurati che il percorso sia corretto
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../components-CSS/ProdottiPageCSS.css";
import "../components-CSS/CategoryPageCSS.css";

export default function RisultatiRicercaPage() {
    const { search, categories, query } = useContext(GlobalContext);
    const [selectedCategory, setSelectedCategory] = useState();

    console.log("Categories:", categories);
    console.log("Search data:", search);

    if (!categories || !Array.isArray(categories)) {
        console.error("Categories is not defined or not an array");
        return <p>Errore: le categorie non sono disponibili.</p>;
    }

    if (!search || !Array.isArray(search)) {
        console.error("Search is not defined or not an array");
        return <p>Errore: i prodotti non sono disponibili.</p>;
    }

    // Filtra i prodotti in base al nome della categoria
    const filteredProducts = selectedCategory
        ? search.filter((product) => product.category_name === selectedCategory)
        : search;

    console.log("Selected category:", selectedCategory);
    console.log("Filtered products:", filteredProducts);

    return (
        <div className="ricerca-page">
            <h1>Risultati ricerca per "{query}"</h1>
            <span>Filtra per: </span>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Tutte le categorie</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <div className="product-grid-prodotti">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div className="product-card" key={product.id}>
                            <Link to={`/prodotti/${product.id}`}>
                                <ProductCard product={product} />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Nessun risultato trovato per questa categoria.</p>
                )}
            </div>
        </div>
    );
}
