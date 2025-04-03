// Importa gli hook necessari da React per gestire stato, effetti e contesto
import { useContext, useState, useEffect } from "react";
// Importa il contesto globale dell'applicazione per accedere ai dati condivisi
import GlobalContext from "../cotext/GlobalContest";
// Importa i componenti per il routing e la gestione dei parametri URL
import { Link, useNavigate, useSearchParams } from "react-router-dom";
// Importa il componente per visualizzare i prodotti
import ProductCard from "../components/ProductCard";
// Importa i file CSS per lo stile della pagina
import "../components-CSS/ProdottiPageCSS.css";
import "../components-CSS/CategoryPageCSS.css";
// Importa axios per effettuare chiamate HTTP al backend
import axios from "axios";

// Definizione del componente principale della pagina dei risultati di ricerca
export default function RisultatiRicercaPage() {
    // Hook per la navigazione programmatica tra le pagine
    const navigate = useNavigate();
    // Hook per gestire i parametri dell'URL
    const [searchParams, setSearchParams] = useSearchParams();

    // Estrae i valori e le funzioni dal contesto globale
    const {
        search,              // Risultati della ricerca
        categories,          // Lista delle categorie disponibili
        query,              // Testo della ricerca
        setSearch,          // Funzione per aggiornare i risultati della ricerca
        setQuery,           // Funzione per aggiornare il testo della ricerca
        selectedCategory,    // Categoria selezionata dall'utente
        setSelectedCategory, // Funzione per aggiornare la categoria selezionata
        sortPrice,          // Ordinamento per prezzo (ascendente o discendente)
        setSortPrice        // Funzione per aggiornare l'ordinamento per prezzo
    } = useContext(GlobalContext);

    // Effetto per sincronizzare i parametri URL con lo stato al montaggio del componente
    useEffect(() => {
        // Estrae i parametri dall'URL
        const queryParam = searchParams.get('q'); // Parametro per il testo della ricerca
        const categoryParam = searchParams.get('category'); // Parametro per la categoria
        const sortParam = searchParams.get('sort'); // Parametro per l'ordinamento

        // Aggiorna lo stato con i parametri dell'URL
        if (queryParam) setQuery(queryParam);
        if (categoryParam) setSelectedCategory(categoryParam);
        if (sortParam) setSortPrice(sortParam);

        // Esegue la ricerca con i parametri attuali
        fetchFilteredProducts(queryParam, categoryParam, sortParam);
    }, [searchParams]); // Si attiva ogni volta che i parametri URL cambiano

    // Funzione per recuperare i prodotti filtrati dal backend
    const fetchFilteredProducts = async (q = query, category = selectedCategory, sort = sortPrice) => {
        try {
            // Costruisce l'URL con i parametri di ricerca
            const url = `http://localhost:3000/api/products/search?${q ? `name=${q}&` : ""}${category ? `category=${category}&` : ""}${sort ? `sortPrice=${sort}&` : ""}`.slice(0, -1); // Rimuove l'ultimo '&' se presente

            console.log('Fetching:', url); // Log dell'URL per debugging
            // Esegue la chiamata API per ottenere i prodotti filtrati
            const response = await axios.get(url);
            // Aggiorna i risultati della ricerca nello stato globale
            setSearch(response.data);
        } catch (err) {
            console.error("Errore durante il recupero dei prodotti:", err); // Log degli errori
        }
    };

    // Gestisce il cambio di categoria selezionata
    const handleCategoryChange = (e) => {
        const category = e.target.value; // Ottiene il valore della categoria selezionata
        setSelectedCategory(category); // Aggiorna lo stato della categoria
        updateSearchParams('category', category); // Aggiorna i parametri URL
    };

    // Gestisce il cambio di ordinamento per prezzo
    const handleSortChange = (e) => {
        const sort = e.target.value; // Ottiene il valore dell'ordinamento selezionato
        setSortPrice(sort); // Aggiorna lo stato dell'ordinamento
        updateSearchParams('sort', sort); // Aggiorna i parametri URL
    };

    // Aggiorna i parametri nell'URL
    const updateSearchParams = (key, value) => {
        const newSearchParams = new URLSearchParams(searchParams); // Crea una copia dei parametri attuali
        if (value) {
            newSearchParams.set(key, value); // Aggiunge o aggiorna il parametro
        } else {
            newSearchParams.delete(key); // Rimuove il parametro se vuoto
        }
        setSearchParams(newSearchParams); // Aggiorna i parametri nell'URL
    };

    // Rendering del componente
    return (
        <div className="ricerca-page">
            {/* Mostra il termine di ricerca */}
            <h1>Risultati ricerca per "{query}"</h1>

            {/* Contenitore per i filtri */}
            <div className="filter-container">
                <div>
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
                </div>

                <div className="sort-container">
                    {/* Select per l'ordinamento per prezzo */}
                    <span>Ordina per: </span>
                    <select value={sortPrice} onChange={handleSortChange}>
                        <option value="">Prezzo</option>
                        <option value="asc">Prezzo Crescente</option>
                        <option value="desc">Prezzo Decrescente</option>
                    </select>
                </div>
            </div>

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
                    // Messaggio mostrato se non ci sono risultati
                    <p>Nessun risultato trovato.</p>
                )}
            </div>
        </div>
    );
}
