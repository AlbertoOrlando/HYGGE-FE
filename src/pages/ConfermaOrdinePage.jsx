import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components-CSS/ConfermaOrdineCSS.css";
import GlobalContext from "../cotext/GlobalContest";

export default function ConfermaOrdinePage() {
    const { cart, finalTotal, setCart } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleTornaHome = () => {
        setCart([]); // Svuota il carrello
        navigate("/"); // Naviga alla home page
    };

    return (
        <div className="conferma-ordine-container">
            <div className="conferma-ordine-header">
                <h1>Grazie per il tuo ordine!</h1>
                <p>Il tuo ordine è andato a buon fine.</p>
            </div>
            <div className="riepilogo-ordine">
                <h2>Riepilogo Ordine</h2>
                <div className="ordine-prodotti">
                    {cart.map((item) => (
                        <div key={item.id} className="ordine-prodotto">
                            <img src={item.images[0]} alt={item.name} className="ordine-prodotto-img" />
                            <div className="ordine-prodotto-info">
                                <h3>{item.name}</h3>
                                <p>Prezzo: €{item.price}</p>
                                <p>Quantità: {item.quantity}</p>
                                <p>Totale: €{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="ordine-totale">
                    <h3>Totale Spesa: €{finalTotal.toFixed(2)}</h3>
                </div>
            </div>
            <div className="conferma-ordine-footer">
                <button onClick={handleTornaHome} className="torna-home-btn">Torna alla Home</button>
            </div>
        </div>
    );
}