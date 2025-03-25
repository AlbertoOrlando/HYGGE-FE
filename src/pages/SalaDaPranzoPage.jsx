import React, { useState, useEffect } from "react";
import "../components-CSS/SalaDaPranzoPageCSS.css";

const SalaDaPranzoPage = () => {
  const [diningRoomProducts, setDiningRoomProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?category=sala-da-pranzo")
      .then((res) => res.json())
      .then((data) => setDiningRoomProducts(data))
      .catch((error) => console.error("Errore nel recupero dei prodotti:", error));
  }, []);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Sala da Pranzo</h1>
        <p>Scopri i mobili perfetti per la tua sala da pranzo.</p>
      </div>

      <div className="product-grid">
        {diningRoomProducts.map((product) => (
          <div key={product.id} className="product-card-category">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>€{product.price.toFixed(2)}</p>
            <button className="add-to-cart-btn">Aggiungi al Carrello</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaDaPranzoPage;
