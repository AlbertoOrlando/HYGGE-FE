// Importa gli stili CSS specifici per la pagina del carrello
import "../components-CSS/CarrelloPageCSS.css";
// Importa il componente Link per la navigazione tra le pagine
import { Link } from "react-router-dom";
// Importa gli hook di React necessari per la gestione dello stato e degli effetti
import { useContext, useState, useEffect } from "react";
// Importa il contesto globale dell'applicazione
import GlobalContext from '../cotext/GlobalContest';
// Importa i componenti necessari per le icone FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importa l'icona del cestino per la rimozione degli articoli
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Componente principale della pagina del carrello
const CarrelloPage = () => {
  // Estrae dal contesto globale le variabili e le funzioni necessarie per gestire il carrello
  const { cart, setCart, setDiscount, discount, setFinalTotal, finalTotal } = useContext(GlobalContext);
  // Stato locale per gestire il codice sconto inserito dall'utente
  const [discountCode, setDiscountCode] = useState("");
  // Stato locale per gestire lo sconto specifico per prodotto
  const [discountProduct, setDiscountProduct] = useState(0);

  // Funzione per rimuovere un articolo dal carrello
  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  // Funzione per aumentare la quantità di un articolo nel carrello
  const handleIncreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Funzione per diminuire la quantità di un articolo nel carrello
  const handleDecreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map(item => {
        if (item.id === id) {
          // Se la quantità è maggiore di 1, diminuisci di 1
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Se la quantità è 1, rimuovi l'articolo
            return null;
          }
        }
        return item;
      }).filter(item => item !== null) // Rimuove gli articoli con quantità 0
    );
  };

  // Funzione per applicare il codice sconto
  const handleApplyDiscount = () => {
    if (discountCode === "SALE10") {
      setDiscount(0.1); // Applica sconto del 10%
    } else if (discountCode === "HYGGE-20") {
      // Calcola il subtotale per verificare se l'ordine supera €299,99
      const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      if (subtotal > 299.99) {
        setDiscount(0.2); // Applica sconto del 20%
      } else {
        alert("Il codice HYGGE-20 è valido solo per ordini superiori a €299,99.");
        setDiscount(0); // Nessuno sconto
      }
    } else {
      setDiscount(0); // Nessuno sconto
      alert("Codice sconto non valido");
    }
  };

  // Effetto per calcolare lo sconto prodotto quando il carrello cambia
  useEffect(() => {
    const calculateDiscountProduct = () => {
      const discountValue = cart.reduce((acc, item) => {
        const originalPrice = item.price * item.quantity;
        const discountedPrice = (item.price - (item.price * (item.discount || 0) / 100)) * item.quantity;
        return acc + (originalPrice - discountedPrice);
      }, 0);
      setDiscountProduct(discountValue || 0);
    };

    calculateDiscountProduct();
  }, [cart]);

  // Effetto per calcolare il totale finale quando cambiano carrello, sconti o prodotti
  useEffect(() => {
    const calculateFinalTotal = () => {
      const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const codeDiscount = discount ? subtotal * discount : 0;
      const finalTotalValue = subtotal - discountProduct - codeDiscount;
      setFinalTotal(finalTotalValue || 0);
    };

    calculateFinalTotal();
  }, [cart, discount, discountProduct, setFinalTotal]);

  // Rendering del componente
  return (
    <div className="cart-container">
      <div className="container-blockup">
        <div className="cart-items">
          <h2>Carrello</h2>
          {cart.length === 0 ? (
            <p>Il carrello è vuoto.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.images[0]} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="original-price"><strong>Prezzo:</strong> €{item.price}</p>
                  <p><b>Prezzo scontato:</b> €{(item.price - (item.price * item.discount / 100)).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button className="quantity-btn increase-btn" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    <button className="quantity-btn decrease-btn" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                    <p className="quantity-number">{item.quantity}</p>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="order-summary">
          <h2>Riepilogo Ordine</h2>
          <div className="summary-item">
            <span>Subtotale:</span>
            <span>€{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Sconto prodotto:</span>
            <span>- €{discountProduct.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Codice sconto:</span>
            <span>- €{(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * discount).toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Totale:</span>
            <span>€{finalTotal.toFixed(2)}</span>
          </div>
          <input
            type="text"
            placeholder="Inserisci codice sconto"
            className="coupon-input"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button className="apply-coupon-btn" onClick={handleApplyDiscount}>
            Applica Sconto
          </button>

          <Link className="pagamento" to={"/pagamento"}>Vai al pagamento</Link>
        </div>
      </div>
    </div>
  );
};

export default CarrelloPage;
