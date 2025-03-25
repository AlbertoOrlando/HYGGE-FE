import "../components-CSS/CarrelloPageCSS.css";
import React, { useState, useEffect } from "react";

const CarrelloPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Simuliamo il recupero dei dati dal database
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCartItems(data));

    fetch("/api/related-products")
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data));
  }, []);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleApplyDiscount = () => {
    if (discountCode === "SALE10") {
      setDiscount(0.1); // 10% di sconto
    } else {
      setDiscount(0);
      alert("Codice sconto non valido");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - subtotal * discount;

  return (
    <div className="cart-container">
      {/* Sezione superiore con carrello e riepilogo */}
      <div className="container-blockup">
        {/* Sezione carrello */}
        <div className="cart-items">
          <h2>Carrello</h2>
          {cartItems.length === 0 ? (
            <p>Il carrello è vuoto.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name}/>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>€{item.price.toFixed(2)}</p>
                  <p>Quantità: {item.quantity}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>
                  Rimuovi
                </button>
              </div>
            ))
          )}
        </div>

        {/* Sezione riepilogo */}
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

      {/* Sezione prodotti spesso acquistati insieme */}
      <div className="related-products">
        <h2 >Spesso Acquistati Insieme</h2>
        <div>
          {relatedProducts.map((product) => (
            <div key={product.id} className="related-product-item">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>€{product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarrelloPage;
