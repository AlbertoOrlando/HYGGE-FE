import { Link } from "react-router-dom";
import "../components-CSS/NotFound.css";


export default function PaginaErrore() {
    return (
        <>
            <main className="home1">
                <div className="notFoundContent">
                    <h1>Pagina non trovata</h1>
                    <p>
                        404 la pagine che cerchi non è stata trovata
                    </p>
                    <Link to={"/"}>Torna alla pagina Home</Link>
                </div>
            </main>

        </>
    );
}