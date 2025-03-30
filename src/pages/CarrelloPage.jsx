import "../components-CSS/CarrelloPageCSS.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import GlobalContext from '../cotext/GlobalContest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CarrelloPage = () => {
  const { cart, setCart, setDiscount, discount, setFinalTotal } = useContext(GlobalContext);
  const [discountCode, setDiscountCode] = useState("");

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      }).filter(item => item !== null)
    );
  };

  const handleApplyDiscount = () => {
    if (discountCode === "SALE10") {
      setDiscount(0.1); // 10% di sconto
    } else if (discountCode === "HYGGE-20") {
      if (subtotal > 299.99) {
        setDiscount(0.2); // 20% di sconto
      } else {
        alert("Il codice HYGGE-20 è valido solo per ordini superiori a €299,99.");
        setDiscount(0); // Nessuno sconto
      }
    } else {
      setDiscount(0); // Nessuno sconto
      alert("Codice sconto non valido");
    }
  };

  // Calcolare il subtotale con sconto sui prodotti
  const subtotal = cart.reduce((acc, item) => {
    const discountedPrice = item.price - (item.price * (item.discount || 0) / 100);
    return acc + discountedPrice * item.quantity;
  }, 0);

  // Calcolare lo sconto prodotto (differenza tra il prezzo totale e il subtotale)
  const discountProduct = cart.reduce((acc, item) => {
    const originalPrice = item.price * item.quantity;
    const discountedPrice = (item.price - (item.price * (item.discount || 0) / 100)) * item.quantity;
    return acc + (originalPrice - discountedPrice);
  }, 0);

  // Calcolare il codice sconto
  const codeDiscount = discount ? subtotal * discount : 0; // Calcoliamo il codice sconto se è presente

  // Prezzo finale (totale - sconto prodotto - sconto codice)
  const finalTotal = subtotal - discountProduct - codeDiscount;

  useEffect(() => {
    setFinalTotal(finalTotal); // Imposta finalTotal nel contesto globale
  }, [finalTotal, setFinalTotal]); // Effettua il calcolo quando finalTotal cambia

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
                  <p className="original-price"><strong>Prezzo:</strong> ${item.price}</p>
                  <p><b>Prezzo scontato:</b> ${(item.price - (item.price * item.discount / 100)).toFixed(2)}</p>
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
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Sconto prodotto:</span>
            <span>-€{discountProduct.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Codice sconto:</span>
            <span>-€{codeDiscount.toFixed(2)}</span>
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
