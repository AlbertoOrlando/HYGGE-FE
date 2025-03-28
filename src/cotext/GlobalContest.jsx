import { createContext, useState, useEffect } from "react";
import axios from "axios"; 

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [cartCount, setCartCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0); // Stato globale per il totale
  console.log("Total:", total); // Log del totale
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
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
        setCategories(response.data);
      } catch (err) {
        setError("Errore nel caricamento delle categorie");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); 
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0)); 
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(subtotal - subtotal * discount); // Calcola il totale con sconto
  }, [cart, discount]);

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
    <GlobalContext.Provider value={{ 
      search, setSearch, products, categories, loading, error, 
      cart, setCart, addToCart, query, setQuery, 
      cartCount, setCartCount, total, setDiscount, discount
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
