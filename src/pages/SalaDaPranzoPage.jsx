import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"
import "../components-CSS/CategoryPageCSS.css";

import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

const SalaDaPranzoPage = () => {
  const { categoriSala } = useContext(GlobalContext);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Sala da Pranzo</h1>
        <p>Scopri i mobili perfetti per la tua sala da pranzo.</p>
      </div>

      <div className="product-grid-prodotti">
          {categoriSala.map(product => (
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

export default SalaDaPranzoPage;
