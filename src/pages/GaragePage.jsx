import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"
import "../components-CSS/CategoryPageCSS.css";

import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

const GaragePage = () => {
  const { categoriGarage } = useContext(GlobalContext);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Garage</h1>
        <p>Scopri attrezzature e mobili per ottimizzare il tuo garage.</p>
      </div>

      <div className="product-grid-prodotti">
          {categoriGarage.map(product => (
            <div className="product-card" key={product.id}>
              <Link to={`/prodotti/${product.id}`}>
                <ProductCard product={product} />                       
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GaragePage;
