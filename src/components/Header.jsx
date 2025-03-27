import { NavLink, Link } from "react-router-dom"

import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

import "../components-CSS/HeaderCSS.css";

import { faSearch, faUser, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function Header() {
    const { categories } = useContext(GlobalContext);
    return (
        <>
            <div className="codice-sconto"><p>20% SCONTO Per acquisti superiori a 299,99€ Codice: HYGGE-20</p></div>
            <div className="header-container">
                <div className="logo">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>HYGGE</Link>
                </div>
                <div className="nav">
                <NavLink to="/prodotti" onClick={() => window.scrollTo(0, 0)}>Prodotti</NavLink>
                {categories.map(category => (
                  <NavLink key={category.id} to={`/category/${category.id}`} onClick={() => window.scrollTo(0, 0)}>{category.name}</NavLink>
                ))}
                    
                </div>
                <div>
                    <div className="search-user-cart">
                        <div className="search-bar">
                            <input type="text" placeholder="Cerca..." />
                            <Link><FontAwesomeIcon icon={faSearch} /></Link>
                        </div>
                        <Link to="/carrello" onClick={() => window.scrollTo(0, 0)}><FontAwesomeIcon icon={faShoppingBag} /></Link>
                    </div>
                </div>
            </div>
        </>
    );
}