// Importa il componente Link da React Router per la navigazione tra le pagine
import { Link } from "react-router-dom";
// Importa gli stili CSS specifici per la pagina 404 (Not Found)
import "../components-CSS/NotFoundCSS.css";

// Componente principale della pagina di errore 404
export default function PaginaErrore() {
    // Rendering del componente
    return (
        // Fragment per raggruppare elementi senza aggiungere nodi extra al DOM
        <>
            {/* Contenitore principale della pagina */}
            <main className="home1">
                {/* Contenitore del contenuto della pagina di errore */}
                <div className="notFoundContent">
                    {/* Titolo principale che indica l'errore */}
                    <h1>Pagina non trovata</h1>
                    {/* Paragrafo che spiega l'errore all'utente */}
                    <p>
                        404 la pagine che cerchi non è stata trovata
                    </p>
                    {/* Link per tornare alla homepage con navigazione automatica */}
                    <Link to={"/"}>Torna alla pagina Home</Link>
                </div>
            </main>
        </>
    );
}