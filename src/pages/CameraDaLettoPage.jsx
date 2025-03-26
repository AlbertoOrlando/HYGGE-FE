import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"
import "../components-CSS/CategoryPageCSS.css";

import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'


const CameraDaLettoPage = () => {
  const { categoriCamera } = useContext(GlobalContext);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Camere da Letto</h1>
        <p>Scopri la nostra selezione di camere da letto per creare il tuo spazio perfetto per il relax.</p>
      </div>

      <div className="product-grid-prodotti">
          {categoriCamera.map(product => (
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

export default CameraDaLettoPage;
