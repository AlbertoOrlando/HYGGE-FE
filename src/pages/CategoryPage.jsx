// Importa gli hook di React necessari per gestire stato, effetti e contesto
import { useState, useEffect, useContext } from "react";
// Importa useParams per accedere ai parametri dell'URL
import { useParams } from "react-router-dom";
// Importa axios per effettuare chiamate HTTP al backend
import axios from "axios";

// Importa il componente ProductCard per visualizzare i singoli prodotti
import ProductCard from "../components/ProductCard"
// Importa Link per la navigazione tra le pagine
import { Link } from "react-router-dom"
// Importa gli stili CSS specifici per la pagina delle categorie
import "../components-CSS/CategoryPageCSS.css";

// Importa il contesto globale dell'applicazione
import GlobalContext from '../cotext/GlobalContest'

// Definizione del componente principale della pagina categoria
const CategoryPage = () => {
  // Estrae le categorie e i prodotti dal contesto globale
  const { categories, products } = useContext(GlobalContext);

  // Inizializza lo stato per memorizzare i prodotti della categoria corrente
  const [category, setCategory] = useState([]);
  // Estrae l'ID della categoria dai parametri dell'URL
  const { name } = useParams();

  // Trova la categoria corrente in base al nome nell'URL
  const currentCategory = categories?.find(category => 
    category.name.toLowerCase() === name.toLowerCase()
  );

  // Funzione per recuperare i prodotti della categoria dal backend
  function fetchProdact() {
    // Usa l'ID della categoria trovata per la chiamata API
    const categoryId = currentCategory ? currentCategory.id : null;
    if (categoryId) {
      axios.get(`http://localhost:3000/api/products/category/${categoryId}`)
        .then(res => {
          console.log("Prodotti ricevuti:", res.data); // Debug
          setCategory(res.data);
        })
        .catch(err => {
          console.error("Errore nel caricamento dei prodotti:", err);
        });
    }
  }

  // Effetto che si attiva quando cambia l'ID della categoria
  useEffect(() => {
    if (currentCategory) {
      fetchProdact();  // Recupera i prodotti
      window.scrollTo(0, 0);  // Scroll in alto della pagina
    }
  }, [name, currentCategory]);

  // Se la categoria non è ancora caricata, mostra un messaggio di caricamento
  if (!currentCategory) {
    return <p>Caricamento della categoria...</p>;
  }

  // Rendering del componente
  return (
    // Contenitore principale della pagina
    <div className="category-container">
      {/* Intestazione della categoria con nome e descrizione */}
      <div className="category-header">
        <h1>{currentCategory.name}</h1>
        <p><i>Scopri i nostri prodotti migliori per {currentCategory.name}.</i></p>
      </div>

      {/* Griglia dei prodotti */}
      <div className="product-grid-prodotti">
        {/* Verifica se ci sono prodotti da mostrare */}
        {category && category.length > 0 ? (
          // Mappa ogni prodotto in una card
          category.map(product => {
            // Genera lo slug per l'URL del prodotto
            const slug = product.slug || product.name.toLowerCase().replace(/\s+/g, "-");
            console.log("Slug calcolato:", slug);
            return (
              // Card del prodotto con link alla pagina dettaglio
              <div className="product-card" key={product.id}>
                <Link to={`/prodotti/${slug}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            );
          })
        ) : (
          // Messaggio se non ci sono prodotti nella categoria
          <p>Nessun prodotto disponibile in questa categoria.</p>
        )}
      </div>
    </div>
  );
};

// Esporta il componente per utilizzarlo in altre parti dell'applicazione
export default CategoryPage;
