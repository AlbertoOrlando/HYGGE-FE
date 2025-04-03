// Importa l'hook useContext per accedere al contesto globale dell'applicazione
import { useContext } from "react";
// Importa i componenti per la navigazione tra le pagine
import { Link, useNavigate } from "react-router-dom";
// Importa gli stili CSS specifici per la pagina di conferma ordine
import "../components-CSS/ConfermaOrdineCSS.css";
// Importa il contesto globale che contiene lo stato del carrello
import GlobalContext from "../cotext/GlobalContest";

// Componente principale della pagina di conferma ordine
export default function ConfermaOrdinePage() {
    // Estrae dal contesto globale il carrello, il totale finale e la funzione per modificare il carrello
    const { cart, finalTotal, setCart } = useContext(GlobalContext);
    // Hook per la navigazione programmatica
    const navigate = useNavigate();

    // Funzione che gestisce il click sul pulsante "Torna alla Home"
    const handleTornaHome = () => {
        setCart([]); // Svuota completamente il carrello
        navigate("/"); // Reindirizza l'utente alla pagina principale
    };

    // Rendering del componente
    return (
        // Contenitore principale della pagina di conferma ordine
        <div className="conferma-ordine-container">

            <div className="conferma-ordine-header">
                <h1>Grazie per il tuo ordine!</h1>
                <p>Il tuo ordine è andato a buon fine.</p>
            </div>

            <div className="riepilogo-ordine">
                <h2>Riepilogo Ordine</h2>

                <div className="ordine-prodotti">
                    {/* Mappa ogni prodotto nel carrello */}
                    {cart.map((item) => (
                        // Carta prodotto singolo con key univoca
                        <div key={item.id} className="ordine-prodotto">
                            {/* Immagine del prodotto */}
                            <img src={item.images[0]} alt={item.name} className="ordine-prodotto-img" />
                            {/* Informazioni dettagliate del prodotto */}
                            <div className="ordine-prodotto-info">
                                <h3>{item.name}</h3>
                                <p>Prezzo: €{item.price}</p>
                                <p>Quantità: {item.quantity}</p>
                                <p>Totale: €{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Sezione con il totale finale dell'ordine */}
                <div className="ordine-totale">
                    <h3>Totale Spesa: €{finalTotal.toFixed(2)}</h3>
                </div>
            </div>
            {/* Footer con pulsante per tornare alla home */}
            <div className="conferma-ordine-footer">
                <button onClick={handleTornaHome} className="torna-home-btn">
                    Torna alla Home
                </button>
            </div>
        </div>
    );
}