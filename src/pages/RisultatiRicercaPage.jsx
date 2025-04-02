// Importa gli hook necessari da React
import { useContext, useState, useEffect } from "react";
// Importa il contesto globale dell'applicazione
import GlobalContext from "../cotext/GlobalContest";
// Importa i componenti per il routing e la gestione dei parametri URL
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// Importa il componente per la visualizzazione dei prodotti
import ProductCard from "../components/ProductCard";
// Importa i file CSS per lo stile
import "../components-CSS/ProdottiPageCSS.css";
import "../components-CSS/CategoryPageCSS.css";
// Importa axios per le chiamate HTTP
import axios from "axios";

export default function RisultatiRicercaPage() {
    // Hook per la navigazione programmatica
    const navigate = useNavigate();
    // Hook per gestire i parametri dell'URL
    const [searchParams, setSearchParams] = useSearchParams();

    // Estrae i valori e le funzioni dal contesto globale
    const {
        search,              // Risultati della ricerca
        categories,          // Lista delle categorie disponibili
        query,              // Testo della ricerca
        setSearch,          // Funzione per aggiornare i risultati
        setQuery,           // Funzione per aggiornare il testo della ricerca
        selectedCategory,    // Categoria selezionata
        setSelectedCategory, // Funzione per aggiornare la categoria
        sortPrice,          // Ordinamento per prezzo
        setSortPrice        // Funzione per aggiornare l'ordinamento
    } = useContext(GlobalContext);

    // Effect per sincronizzare i parametri URL con lo stato al montaggio
    useEffect(() => {
        // Estrae i parametri dall'URL
        const queryParam = searchParams.get('q');
        const categoryParam = searchParams.get('category');
        const sortParam = searchParams.get('sort');

        // Aggiorna lo stato con i parametri dell'URL
        if (queryParam) setQuery(queryParam);
        if (categoryParam) setSelectedCategory(categoryParam);
        if (sortParam) setSortPrice(sortParam);

        // Esegue la ricerca con i parametri attuali
        fetchFilteredProducts(queryParam, categoryParam, sortParam);
    }, [searchParams]); // Si attiva quando cambiano i parametri URL

    // Funzione per recuperare i prodotti filtrati
    const fetchFilteredProducts = async (q = query, category = selectedCategory, sort = sortPrice) => {
        try {
            // Costruisce l'URL con i parametri di ricerca
            const url = `http://localhost:3000/api/products/search?${q ? `name=${q}&` : ""
                }${category ? `category=${category}&` : ""
                }${sort ? `sortPrice=${sort}&` : ""
                }`.slice(0, -1); // Rimuove l'ultimo '&' se presente

            console.log('Fetching:', url);
            // Esegue la chiamata API
            const response = await axios.get(url);
            // Aggiorna i risultati della ricerca
            setSearch(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    // Gestisce il cambio di categoria
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        updateSearchParams('category', category);
    };

    // Gestisce il cambio di ordinamento prezzo
    const handleSortChange = (e) => {
        const sort = e.target.value;
        setSortPrice(sort);
        updateSearchParams('sort', sort);
    };

    // Aggiorna i parametri nell'URL
    const updateSearchParams = (key, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (value) {
            newSearchParams.set(key, value);
        } else {
            newSearchParams.delete(key);
        }
        setSearchParams(newSearchParams);
    };

    // Rendering del componente
    return (
        <div className="ricerca-page">
            {/* Mostra il termine di ricerca */}
            <h1>Risultati ricerca per "{query}"</h1>

            {/* Filtri di ricerca */}
            <span>Filtra per: </span>
            {/* Select per il filtro categoria */}
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Tutte le categorie</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            {/* Select per l'ordinamento per prezzo */}
            <select value={sortPrice} onChange={handleSortChange}>
                <option value="">Prezzo</option>
                <option value="asc">Prezzo Crescente</option>
                <option value="desc">Prezzo Decrescente</option>
            </select>

            {/* Griglia dei risultati */}
            <div className="product-grid-prodotti">
                {search && search.length > 0 ? (
                    // Mappa i risultati della ricerca
                    search.map((product) => (
                        <div className="product-card" key={product.slug}>
                            <Link to={`/prodotti/${product.slug}`}>
                                <ProductCard product={product} />
                            </Link>
                        </div>
                    ))
                ) : (
                    // Messaggio se non ci sono risultati
                    <p>Nessun risultato trovato.</p>
                )}
            </div>
        </div>
    );
}
