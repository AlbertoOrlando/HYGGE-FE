import React, { useState, useEffect } from "react";
import "../components-CSS/CameraDaLettoPageCSS.css";

const CameraDaLettoPage = () => {
  const [bedroomProducts, setBedroomProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?category=camere-da-letto")
      .then((res) => res.json())
      .then((data) => setBedroomProducts(data))
      .catch((error) => console.error("Errore nel recupero dei prodotti:", error));
  }, []);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Camere da Letto</h1>
        <p>Scopri la nostra selezione di camere da letto per creare il tuo spazio perfetto per il relax.</p>
      </div>

      <div className="product-grid">
        {bedroomProducts.map((product) => (
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

export default CameraDaLettoPage;
