import { NavLink, Link } from "react-router-dom"

import "../components-CSS/HeaderCSS.css";

import { faSearch, faUser, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header() {
    return (
        <>
            <div className="codice-sconto"><p>20% SCONTO Per acquisti superiori a 299,99€ Codice: HYGGE-20</p></div>
            <div className="header-container">
                <div className="logo">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>HYGGE</Link>
                </div>
                <div className="nav">
                    <NavLink to="/camera-da-letto" onClick={() => window.scrollTo(0, 0)}>Camera da letto</NavLink>
                    <NavLink to="/bagno" onClick={() => window.scrollTo(0, 0)}>Bagno</NavLink>
                    <NavLink to="/salotto" onClick={() => window.scrollTo(0, 0)}>Salotto</NavLink>
                    <NavLink to="/prodotti" onClick={() => window.scrollTo(0, 0)}><strong>Prodotti</strong></NavLink>
                    <NavLink to="/sala-da-pranzo" onClick={() => window.scrollTo(0, 0)}>Sala da pranzo</NavLink>
                    <NavLink to="/giardino" onClick={() => window.scrollTo(0, 0)}>Giardino</NavLink>
                    <NavLink to="/garage" onClick={() => window.scrollTo(0, 0)}>Garage</NavLink>
                </div>
                <div>
                    <div className="search-user-cart">
                    <div className="search-bar">
                            <input type="text" placeholder="Cerca per città..."/>
                        </div>
                        <Link><FontAwesomeIcon icon={faSearch} /></Link>
                        <Link to="/carrello" onClick={() => window.scrollTo(0, 0)}><FontAwesomeIcon icon={faShoppingBag} /></Link>
                    </div>
                </div>
            </div>
        </>
    );
}