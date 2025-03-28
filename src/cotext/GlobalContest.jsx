import { createContext, useState, useEffect } from "react";
import axios from "axios"; // Importa Axios

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Stato per i prodotti
  const [categories, setCategories] = useState([]); // Stato per le cateogorie
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");

  console.log(search);


  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []); // Salva il carrello nel localStorage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data); // Salva i dati ricevuti
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/category");
        setCategories(response.data); // Salva i dati ricevuti
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);



  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Salva il carrello nel localStorage ad ogni aggiornamento
  }, [cart]);

  // Funzione per aggiungere prodotti al carrello
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };


  return (
    <GlobalContext.Provider value={{ search, setSearch, products, categories, loading, error, cart, setCart, addToCart, query, setQuery }}>
      {children}
    </GlobalContext.Provider >
  );
};

export default GlobalContext;
