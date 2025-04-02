// Importa i componenti per la navigazione e il routing
import { NavLink, Link, useNavigate } from "react-router-dom";
// Importa axios per le chiamate HTTP
import axios from "axios";

// Importa gli hook di React e il contesto globale
import { useContext, useState } from "react";
import GlobalContext from '../cotext/GlobalContest';

// Importa il CSS per l'header
import "../components-CSS/HeaderCSS.css";

// Importa le icone di FontAwesome
import { faSearch, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    // Estrae i valori e le funzioni dal contesto globale
    const {
        cartCount,        // Numero di elementi nel carrello
        setSearch,        // Funzione per impostare i risultati della ricerca
        categories,       // Lista delle categorie
        query,           // Testo della ricerca
        setQuery,        // Funzione per impostare il testo della ricerca
        selectedCategory, // Categoria selezionata
        setSelectedCategory, // Funzione per impostare la categoria
        sortPrice,       // Ordinamento per prezzo
        setSortPrice     // Funzione per impostare l'ordinamento
    } = useContext(GlobalContext);

    // Hook per la navigazione
    const navigate = useNavigate();
    // Stato per il menu mobile
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Gestisce il cambio del testo nella barra di ricerca
    function handleFormQuery(e) {
        setQuery(e.target.value);
    }

    // Gestisce l'invio del form di ricerca
    function handleSubmit(e) {
        e.preventDefault();
        // Controlla se la query è vuota
        if (query === "") {
            console.error("La query è vuota. Inserisci un termine di ricerca.");
            return;
        }

        // Resetta i filtri nel contesto globale
        setSelectedCategory("");
        setSortPrice("");

        // Crea i parametri URL solo per la query di ricerca
        const params = new URLSearchParams();
        params.set('q', query);

        // Effettua la chiamata API per la ricerca
        axios.get(`http://localhost:3000/api/products/search?name=${query}`)
            .then(response => {
                // Imposta i risultati della ricerca
                setSearch(response.data);
                // Naviga alla pagina dei risultati
                navigate(`/search?${params.toString()}`);
            })
            .catch(err => {
                console.error("Error during search:", err);
            });
    }

    return (
        <>
            <div className="codice-sconto">
                <p>20% SCONTO Per acquisti superiori a 299,99€ Codice: HYGGE-20</p>
            </div>
            <div className="header-container">
                <div className="logo">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>HYGGE</Link>
                </div>
                <div className="nav">
                    <NavLink to="/prodotti" onClick={() => window.scrollTo(0, 0)}>Prodotti</NavLink>
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
                <div className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`nav-dropdown ${isMenuOpen ? "active" : ""}`}>
                    <NavLink to="/prodotti" onClick={() => setIsMenuOpen(false)}>Prodotti</NavLink>
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
                <div>
                    <div className="search-user-cart">
                        <div className="search-bar">
                            <form className="search-form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={handleFormQuery}
                                    placeholder="Cerca..."
                                />
                                <button type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </form>
                        </div>
                        <Link to="/carrello" onClick={() => window.scrollTo(0, 0)} className="cart-icon">
                            <FontAwesomeIcon icon={faShoppingBag} />
                            {cartCount > 0 && <span className="cart-notification">{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}