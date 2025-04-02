import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"
import "../components-CSS/CategoryPageCSS.css";

import GlobalContext from '../cotext/GlobalContest'


const CategoryPage = () => {
  const { categories, products} = useContext(GlobalContext);


  //  settaggio dello stato del componente
  const [category, setCategory] = useState([]);
  const { id } = useParams();
   
  const currentCategory = categories?.find(category => category.id === parseInt(id));
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

 // Controllo per evitare errori se currentCategory è undefined
 if (!currentCategory) {
  return <p>Caricamento della categoria...</p>;
}
  return (
    <div className="category-container">
      <div className="category-header">
        <h1>{currentCategory.name}</h1>
        <p><i>Scopri i nostri prodotti migliori per {currentCategory.name}.</i></p>
      </div>

      <div className="product-grid-prodotti">
          {category && category.length > 0 ? (
              category.map(product => {
                  const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, "-");
                  console.log("Slug calcolato:", slug);
                  return (
                      <div className="product-card" key={product.id}>
                          <Link to={`/prodotti/${slug}`}>
                              <ProductCard product={product} />                       
                          </Link>
                      </div>
                  );
              })
          ) : (
              <p>Nessun prodotto disponibile in questa categoria.</p>
          )}
      </div>
    </div>
  );
};

export default CategoryPage;
