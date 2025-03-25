import React, { useState, useEffect } from "react";
import "../components-CSS/GaragePageCSS.css";

const GaragePage = () => {
  const [garageProducts, setGarageProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?category=garage")
      .then((res) => res.json())
      .then((data) => setGarageProducts(data))
      .catch((error) => console.error("Errore nel recupero dei prodotti:", error));
  }, []);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Garage</h1>
        <p>Scopri attrezzature e mobili per ottimizzare il tuo garage.</p>
      </div>

      <div className="product-grid">
        {garageProducts.map((product) => (
          <div key={product.id} className="product-card">
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

export default GaragePage;
