// Importa i componenti per la navigazione e il routing
import { NavLink, Link, useNavigate } from "react-router-dom";
// Importa axios per le chiamate HTTP
import axios from "axios";
// Importa gli hook di React e il contesto globale
import { useContext, useState, useEffect } from "react";
import GlobalContext from '../cotext/GlobalContest';
// Importa il CSS per l'header
import "../components-CSS/HeaderCSS.css";
// Importa le icone di FontAwesome
import { faSearch, faShoppingBag, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    // Estrai tutti i valori necessari dal contesto in un'unica destructuring
    const {
        cartCount,
        wishlistCount,
        setSearch,
        categories,
        query,
        setQuery,
        selectedCategory,
        setSelectedCategory,
        sortPrice,
        setSortPrice
    } = useContext(GlobalContext);

    // Usa una sola istanza di navigate e isMenuOpen
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Add loading state for search
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    // Debug current state
    useEffect(() => {
        console.log('Header State:', {
            query,
            selectedCategory,
            sortPrice,
            isSearching,
            searchError
        });
    }, [query, selectedCategory, sortPrice, isSearching, searchError]);

    // Gestisce il cambio del testo nella barra di ricerca
    function handleFormQuery(e) {
        console.log('Search input changed:', e.target.value);
        setQuery(e.target.value);
    }

    // Gestisce l'invio del form di ricerca
    function handleSubmit(e) {
        e.preventDefault();
        setSearchError(null);

        console.log('Search submitted:', {
            query,
            currentCategory: selectedCategory,
            currentSortPrice: sortPrice
        });

        if (query.trim() === "") {
            console.error(error);
            setSearchError(error);
            return;
        }

        setIsSearching(true);

        // Reset filters and build URL params
        setSelectedCategory("");
        setSortPrice("");

        const params = new URLSearchParams();
        params.set('q', query);

        const apiUrl = `http://localhost:3000/api/products/search?name=${encodeURIComponent(query)}`;
        console.log('Calling API:', apiUrl);

        axios.get(apiUrl)
            .then(response => {
                console.log('Search results:', {
                    count: response.data.length,
                    data: response.data
                });
                setSearch(response.data);

                const navigationUrl = `/search?${params.toString()}`;
                console.log('Navigating to:', navigationUrl);
                navigate(navigationUrl);
            })
            .catch(err => {
                const errorMessage = err.response?.data?.message || err.message;
                console.error('Search error:', {
                    status: err.response?.status,
                    message: errorMessage,
                    error: err
                });
                setSearchError(errorMessage);
            })
            .finally(() => {
                setIsSearching(false);
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
                                    disabled={isSearching}
                                />
                                <button type="submit" disabled={isSearching}>
                                    {isSearching ? (
                                        "..."
                                    ) : (
                                        <FontAwesomeIcon icon={faSearch} />
                                    )}
                                </button>
                            </form>
                            {searchError && (
                                <div className="search-error" style={{ color: 'red', fontSize: '0.8em' }}>
                                    {searchError}
                                </div>
                            )}
                        </div>
                        <Link to="/wishlist" className="wishlist-icon">
                            <FontAwesomeIcon icon={faHeart} />
                            {wishlistCount > 0 && <span className="wishlist-notification">{wishlistCount}</span>}
                        </Link>
                        <Link to="/carrello" onClick={() => window.scrollTo(0, 0)} className="cart-icon">
                            <FontAwesomeIcon icon={faShoppingBag} />
                            {cartCount > 0 && <span className="cart-notification">{cartCount}</span>}
                        </Link>
                        <div className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}