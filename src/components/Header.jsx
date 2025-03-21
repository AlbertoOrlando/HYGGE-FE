import {NavLink, Link} from "react-router-dom"

import "../components-CSS/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <>
            <div className="codice-sconto"><p>20% SCONTO Per acquisti superiori a 299,99€ Codice: HYGGE-20</p></div>
            <div className="header-container">
                <div>
                    <Link>LOGO</Link>
                </div>
                <div>
                    <NavLink to="/">Camera da letto</NavLink>
                    <NavLink to="/">Bagno</NavLink>
                    <NavLink to="/">Saloto</NavLink>
                    <NavLink to="/">Sala da pranzo</NavLink>
                    <NavLink to="/">Giardino</NavLink>
                    <NavLink to="/">Garage</NavLink>
                    <NavLink to="/"></NavLink>

                </div>
                <div>
                    <div>
                        <Link><FontAwesomeIcon icon={faHome} /></Link>
                        <Link><FontAwesomeIcon icon={faPlus} /></Link>
                    </div>
                </div>
            </div>
        </>
    );
}