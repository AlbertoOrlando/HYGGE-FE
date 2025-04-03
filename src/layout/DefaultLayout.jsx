// Importa il componente Outlet da React Router che renderizza il contenuto delle route annidate
import { Outlet } from "react-router-dom"
// Importa il componente Header che contiene la barra di navigazione superiore
import Header from "../components/Header"
// Importa il componente Footer che contiene il piè di pagina del sito
import Footer from "../components/Footer"
// Importa il componente PopUp per mostrare il popup di iscrizione alla newsletter
import PopUp from "../components/PopUp"

// Definizione del componente DefaultLayout che fornisce la struttura base del sito
export default function DefaultLayout() {
    // Rendering del layout principale
    return (
        // Fragment (<>) per raggruppare più elementi senza aggiungere nodi extra al DOM
        <>
            {/* Renderizza l'header in cima alla pagina */}
            <Header />
            {/* Renderizza il popup per l'iscrizione alla newsletter */}
            <PopUp />
            {/* Contenitore principale che avvolge il contenuto dinamico delle pagine */}
            <main className="container-layout">
                {/* Outlet renderizza il contenuto specifico della route corrente */}
                <Outlet />
            </main>
            {/* Renderizza il footer in fondo alla pagina */}
            <Footer />
        </>
    )
}
