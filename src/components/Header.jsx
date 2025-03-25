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
                    <Link to="/">HYGGE</Link>
                </div>
                <div className="nav">
                    <NavLink to="/camera-da-letto">Camera da letto</NavLink>
                    <NavLink to="/bagno">Bagno</NavLink>
                    <NavLink to="/salotto">Salotto</NavLink>
                    <NavLink to="/prodotti"><strong>Prodotti</strong></NavLink>
                    <NavLink to="/sala-da-pranzo">Sala da pranzo</NavLink>
                    <NavLink to="/giardino">Giardino</NavLink>
                    <NavLink to="/garage">Garage</NavLink>
                </div>
                <div>
                    <div className="search-user-cart">
                    <div className="search-bar">
                            <input type="text" placeholder="Cerca per città..."/>
                        </div>
                        <Link><FontAwesomeIcon icon={faSearch} /></Link>
                        <Link to="/carrello"><FontAwesomeIcon icon={faShoppingBag} /></Link>
                    </div>
                </div>
            </div>
        </>
    );
}