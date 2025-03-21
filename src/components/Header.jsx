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
                    <NavLink to="/">Camera da letto</NavLink>
                    <NavLink to="/">Bagno</NavLink>
                    <NavLink to="/">Salotto</NavLink>
                    <NavLink to=""><strong>Prodotti</strong></NavLink>
                    <NavLink to="/">Sala da pranzo</NavLink>
                    <NavLink to="/">Giardino</NavLink>
                    <NavLink to="/">Garage</NavLink>
                </div>
                <div>
                    <div className="search-user-cart">
                        <Link><FontAwesomeIcon icon={faSearch} /></Link>
                        <Link><FontAwesomeIcon icon={faShoppingBag} /></Link>
                    </div>
                </div>
            </div>
        </>
    );
}