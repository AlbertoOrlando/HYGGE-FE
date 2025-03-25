import React, { useState, useEffect } from "react";
import "../components-CSS/SalottoPageCSS.css";

const SalottoPage = () => {
  const [livingRoomProducts, setLivingRoomProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?category=salotto")
      .then((res) => res.json())
      .then((data) => setLivingRoomProducts(data))
      .catch((error) => console.error("Errore nel recupero dei prodotti:", error));
  }, []);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Salotto</h1>
        <p>Arreda il tuo salotto con stile e comfort.</p>
      </div>

      <div className="product-grid">
        {livingRoomProducts.map((product) => (
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

export default SalottoPage;
