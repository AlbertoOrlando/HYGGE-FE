// importiamo il contesto globale e la parte REact di utilizzo dello stesso

import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

import "../components-CSS/ProdottiPageCSS.css"
import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"

export default function ProdottiPage() {
  
  const { products } = useContext(GlobalContext);
  return (
    <>
       <div className="product-list">
            <h1>Lista Prodotti</h1>
            <div className="product-grid-prodotti">
                {products.map(product => (
                  <div className="product-card" key={product.id}>
                    <Link to={`/prodotti/${product.id}`}>
                      <ProductCard product={product} />                       
                    </Link>
                  </div>
                ))}
            </div>
        </div>
    </>
);
}