import "../components-CSS/CarrelloPageCSS.css";
import { useContext, useState } from "react";
import GlobalContext from '../cotext/GlobalContest'

const CarrelloPage = () => {
  const { cart, setCart } = useContext(GlobalContext);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleRemoveItem = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        // Se troviamo il prodotto nel carrello, riduci la quantità
        if (item.id === id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null; // Se la quantità è 1, rimuoviamo il prodotto
          }
        }
        return item; // Altrimenti, lascia il prodotto invariato
      }).filter(item => item !== null); // Filtra i null per rimuovere l'articolo
  
      return updatedCart;
    });
  };
  
  
  console.log("Carrello prima della rimozione:", cart); // Questo ti dirà cosa c'è nel carrello

  
  

  const handleApplyDiscount = () => {
    if (discountCode === "SALE10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
      alert("Codice sconto non valido");
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - subtotal * discount;

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
                  <p>Quantità: {item.quantity}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Rimuovi</button>
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
            <span>-€{(subtotal * discount).toFixed(2)}</span>
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
        </div>
      </div>
    </div>
  );
};

export default CarrelloPage;
