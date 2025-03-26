import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"
import "../components-CSS/CategoryPageCSS.css";

import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

const GiardinoPage = () => {
  const { categoriGiardino } = useContext(GlobalContext);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Giardino</h1>
        <p>Trova tutto il necessario per arredare e curare il tuo giardino.</p>
      </div>

      <div className="product-grid-prodotti">
          {categoriGiardino.map(product => (
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

export default GiardinoPage;
