import React, { useState, useEffect } from "react";
import "../components-CSS/BagnoPageCSS.css";

const BagnoPage = () => {
  const [bathroomProducts, setBathroomProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?category=bagno")
      .then((res) => res.json())
      .then((data) => setBathroomProducts(data))
      .catch((error) => console.error("Errore nel recupero dei prodotti:", error));
  }, []);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Bagno</h1>
        <p>Trova i migliori accessori e mobili per il tuo bagno.</p>
      </div>

      <div className="product-grid">
        {bathroomProducts.map((product) => (
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

export default BagnoPage;
