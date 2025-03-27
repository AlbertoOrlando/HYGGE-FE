import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"
import "../components-CSS/CategoryPageCSS.css";

import GlobalContext from '../cotext/GlobalContest'


const CategoryPage = () => {

  //  settaggio dello stato del componente
  const [category, setCategory] = useState([]);
  const { id } = useParams();

  function fetchProdact() {
    axios.get(`http://localhost:3000/api/products/category/${id}`)
        .then(res => setCategory(res.data))
        .catch(err => {
            console.log(err);
        });
      }
        useEffect(() => {
          fetchProdact();
          window.scrollTo(0, 0); // Scorri in alto ogni volta che cambia il prodotto
      }, [id]);


  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Camere da Letto</h1>
        <p>Scopri la nostra selezione di camere da letto per creare il tuo spazio perfetto per il relax.</p>
      </div>

      <div className="product-grid-prodotti">
          {category.length > 0 ? (
              category.map(product => (
                  <div className="product-card" key={product.id}>
                      <Link to={`/prodotti/${product.id}`}>
                          <ProductCard product={product} />                       
                      </Link>
                  </div>
              ))
          ) : (
              <p>Nessun prodotto disponibile in questa categoria.</p>
          )}
      </div>
    </div>
  );
};

export default CategoryPage;
