import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"
import "../components-CSS/SalottoPageCSS.css";

import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

const SalottoPage = () => {
  const { categoriSalotto } = useContext(GlobalContext);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Salotto</h1>
        <p>Arreda il tuo salotto con stile e comfort.</p>
      </div>

      <div className="product-grid-prodotti">
          {categoriSalotto.map(product => (
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

export default SalottoPage;
