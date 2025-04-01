import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useContext, useState } from "react";
import GlobalContext from '../cotext/GlobalContest';

import "../components-CSS/HeaderCSS.css";

import { faSearch, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    const { cartCount, setSearch, categories, query, setQuery } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per il burger menu

    function handleFormQuery(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (query === "") {
            console.error("La query è vuota. Inserisci un termine di ricerca.");
            return;
        }
        fetchSearchBar(query);
        navigate(`/search?q=${encodeURIComponent(query)}`);
    }

    function fetchSearchBar(query) {
        axios
            .get(`http://localhost:3000/api/products/search?name=${query}`)
            .then(response => {
                setSearch(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Errore durante la ricerca:", error);
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