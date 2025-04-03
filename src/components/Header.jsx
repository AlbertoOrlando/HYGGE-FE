// Importa i componenti necessari per la navigazione tra le pagine del sito
import { NavLink, Link, useNavigate } from "react-router-dom";
// Importa axios per effettuare chiamate HTTP al server backend
import axios from "axios";
// Importa gli hook fondamentali di React per gestire stato, effetti e contesto
import { useContext, useState, useEffect } from "react";
// Importa il contesto globale che contiene lo stato condiviso dell'applicazione
import GlobalContext from '../cotext/GlobalContest';
// Importa il file CSS contenente gli stili specifici per l'header
import "../components-CSS/HeaderCSS.css";
// Importa le icone specifiche da FontAwesome per la ricerca, il carrello e i preferiti
import { faSearch, faShoppingBag, faHeart } from "@fortawesome/free-solid-svg-icons";
// Importa il componente principale di FontAwesome per utilizzare le icone
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Definizione del componente principale Header
export default function Header() {
    // Estrae dal contesto globale tutte le variabili e le funzioni necessarie
    const {
        cartCount,           // Numero di prodotti nel carrello
        wishlistCount,       // Numero di prodotti nei preferiti
        setSearch,          // Funzione per aggiornare i risultati della ricerca
        categories,         // Array delle categorie di prodotti disponibili
        query,              // Testo inserito nella barra di ricerca
        setQuery,           // Funzione per aggiornare il testo della ricerca
        selectedCategory,   // Categoria attualmente selezionata
        setSelectedCategory, // Funzione per cambiare la categoria selezionata
        sortPrice,         // Criterio di ordinamento per prezzo
        setSortPrice       // Funzione per cambiare l'ordinamento per prezzo
    } = useContext(GlobalContext);

    // Hook per la navigazione programmatica tra le pagine
    const navigate = useNavigate();
    // Stato per gestire l'apertura/chiusura del menu mobile
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Stati per gestire il processo di ricerca
    const [isSearching, setIsSearching] = useState(false);  // Indica se è in corso una ricerca
    const [searchError, setSearchError] = useState(null);   // Memorizza eventuali errori di ricerca

    // Effetto per il debug: monitora e logga i cambiamenti degli stati principali
    useEffect(() => {
        console.log('Stato Header:', {
            query,              // Testo corrente della ricerca
            selectedCategory,   // Categoria selezionata
            sortPrice,         // Ordinamento prezzo
            isSearching,       // Stato della ricerca
            searchError        // Eventuali errori
        });
    }, [query, selectedCategory, sortPrice, isSearching, searchError]);

    // Gestisce il cambio del testo nella barra di ricerca
    function handleFormQuery(e) {
        console.log('Input ricerca modificato:', e.target.value);
        setQuery(e.target.value);
    }

    // Gestisce l'invio del form di ricerca
    function handleSubmit(e) {
        e.preventDefault();  // Previene il comportamento predefinito del form
        setSearchError(null);  // Resetta eventuali errori precedenti

        // Logga i dettagli della ricerca per debug
        console.log('Ricerca inviata:', {
            query,
            currentCategory: selectedCategory,
            currentSortPrice: sortPrice
        });

        // Verifica che la query non sia vuota
        if (query.trim() === "") {
            console.error(error);
            setSearchError(error);
            return;
        }

        // Attiva lo stato di ricerca in corso
        setIsSearching(true);

        // Resetta i filtri attivi
        setSelectedCategory("");
        setSortPrice("");

        // Prepara i parametri per l'URL
        const params = new URLSearchParams();
        params.set('q', query);

        // Costruisce l'URL per la chiamata API
        const apiUrl = `http://localhost:3000/api/products/search?name=${encodeURIComponent(query)}`;
        console.log('Chiamata API:', apiUrl);

        // Effettua la richiesta di ricerca al server
        axios.get(apiUrl)
            .then(response => {
                // Logga i risultati per debug
                console.log('Risultati ricerca:', {
                    count: response.data.length,
                    data: response.data
                });
                // Aggiorna i risultati della ricerca nel contesto globale
                setSearch(response.data);

                // Naviga alla pagina dei risultati
                const navigationUrl = `/search?${params.toString()}`;
                console.log('Navigazione verso:', navigationUrl);
                navigate(navigationUrl);
            })
            .catch(err => {
                // Gestisce gli errori della ricerca
                const errorMessage = err.response?.data?.message || err.message;
                console.error('Errore ricerca:', {
                    status: err.response?.status,
                    message: errorMessage,
                    error: err
                });
                setSearchError(errorMessage);
            })
            .finally(() => {
                // Disattiva lo stato di ricerca in corso
                setIsSearching(false);
            });
    }

    // Rendering del componente
    return (
        <>
            {/* Banner superiore con codice sconto */}
            <div className="codice-sconto">
                <p>20% SCONTO Per acquisti superiori a 299,99€ Codice: HYGGE-20</p>
            </div>

            {/* Contenitore principale dell'header */}
            <div className="header-container">
                {/* Logo del sito con link alla home page */}
                <div className="logo">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>HYGGE</Link>
                </div>

                {/* Menu di navigazione principale */}
                <div className="nav">
                    <NavLink to="/prodotti" onClick={() => window.scrollTo(0, 0)}>Prodotti</NavLink>
                    {/* Mappa le categorie nel menu */}
                    {categories.map(category => (
                        <NavLink
                            key={category.id}
                            to={`/category/${category.id}`}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>

                {/* Menu dropdown per dispositivi mobili */}
                <div className={`nav-dropdown ${isMenuOpen ? "active" : ""}`}>
                    <NavLink to="/prodotti" onClick={() => setIsMenuOpen(false)}>Prodotti</NavLink>
                    {/* Mappa le categorie nel menu mobile */}
                    {categories.map(category => (
                        <NavLink
                            key={category.id}
                            to={`/category/${category.id}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>

                {/* Contenitore per barra di ricerca e icone utente */}
                <div className="search-user-cart">
                    {/* Form di ricerca prodotti */}
                    <div className="search-bar">
                        <form className="search-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={query}
                                onChange={handleFormQuery}
                                placeholder="Cerca..."
                                disabled={isSearching}
                            />
                            <button type="submit" disabled={isSearching}>
                                {isSearching ? "..." : <FontAwesomeIcon icon={faSearch} />}
                            </button>
                        </form>
                        {/* Mostra eventuali errori di ricerca */}
                        {searchError && (
                            <div className="search-error" style={{ color: 'red', fontSize: '0.8em' }}>
                                {searchError}
                            </div>
                        )}
                    </div>

                    {/* Link alla wishlist con contatore */}
                    <Link to="/wishlist" className="wishlist-icon">
                        <FontAwesomeIcon icon={faHeart} />
                        {wishlistCount > 0 && <span className="wishlist-notification">{wishlistCount}</span>}
                    </Link>

                    {/* Link al carrello con contatore */}
                    <Link to="/carrello" onClick={() => window.scrollTo(0, 0)} className="cart-icon">
                        <FontAwesomeIcon icon={faShoppingBag} />
                        {cartCount > 0 && <span className="cart-notification">{cartCount}</span>}
                    </Link>

                    {/* Menu hamburger per dispositivi mobili */}
                    <div className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
}