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
  const [total, setTotal] = useState(0); // Totale senza sconto
  const [finalTotal, setFinalTotal] = useState(0); // Totale finale con sconto

  console.log("Total:", total); // Log del totale senza sconto
  console.log("Final Total:", finalTotal); // Log del totale finale con sconto

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

    // Calcolare il subtotale senza sconto
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Calcolare il totale senza sconto
    const totalWithoutDiscount = subtotal - subtotal * discount;

    // Impostare i valori nel contesto
    setTotal(totalWithoutDiscount); // Totale senza sconto
    setFinalTotal(totalWithoutDiscount); // Totale finale senza sconto
  }, [cart, discount]);

  const addToCart = (product) => {
    setCartCount((prevCount) => prevCount + 1);

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

  const createOrder = async (orderData) => {
    console.log('Payload inviato al server:', orderData); // Log del payload inviato
    try {
        const response = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        console.log('Risposta HTTP:', response.status); // Log dello stato HTTP
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Errore del server:', errorData); // Log dettagliato dell'errore del server
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Risultato della risposta:', result); // Log del risultato della risposta
        return result;
    } catch (error) {
        console.error('Errore durante la creazione dell\'ordine:', error); // Log dell'errore
        throw error;
    }
  };

  return (
    <GlobalContext.Provider value={{ 
      search, setSearch, products, categories, loading, error, 
      cart, setCart, addToCart, query, setQuery, createOrder, 
      cartCount, setCartCount, total, setDiscount, discount, finalTotal, setFinalTotal
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
