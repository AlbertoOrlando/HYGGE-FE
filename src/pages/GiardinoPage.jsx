import React, { useState, useEffect } from "react";
import "../components-CSS/GiardinoPageCSS.css";

const GiardinoPage = () => {
  const [gardenProducts, setGardenProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?category=giardino")
      .then((res) => res.json())
      .then((data) => setGardenProducts(data))
      .catch((error) => console.error("Errore nel recupero dei prodotti:", error));
  }, []);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Giardino</h1>
        <p>Trova tutto il necessario per arredare e curare il tuo giardino.</p>
      </div>

      <div className="product-grid">
        {gardenProducts.map((product) => (
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

export default GiardinoPage;
