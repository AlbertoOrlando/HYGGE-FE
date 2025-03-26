import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"
import "../components-CSS/BagnoPageCSS.css";

import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

const BagnoPage = () => {
  const { categoriBagno } = useContext(GlobalContext);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Bagno</h1>
        <p>Trova i migliori accessori e mobili per il tuo bagno.</p>
      </div>

       <div className="product-grid-prodotti">
                {categoriBagno.map(product => (
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

export default BagnoPage;
