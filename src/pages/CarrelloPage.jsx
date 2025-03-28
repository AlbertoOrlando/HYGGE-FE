import "../components-CSS/CarrelloPageCSS.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import GlobalContext from '../cotext/GlobalContest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CarrelloPage = () => {
  const { cart, setCart, total, setDiscount } = useContext(GlobalContext);
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
      setDiscount(0.1);
    } else {
      setDiscount(0);
      alert("Codice sconto non valido");
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                  <p>€{item.price}</p>
                  <div className="quantity-controls">
                    <button className="quantity-btn increase-btn" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                    
                    <button className="quantity-btn decrease-btn" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                    <p className="quantity-number">{item.quantity}</p>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
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
            <span>Sconto:</span>
            <span>-€{(subtotal - total).toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Totale:</span>
            <span>€{total.toFixed(2)}</span>
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
