// Importa gli hook necessari da React
import { createContext, useState, useEffect } from "react";
// Importa axios per le chiamate HTTP
import axios from "axios";

// Crea il contesto globale
const GlobalContext = createContext();

// Componente Provider che fornisce il contesto a tutta l'applicazione
export const GlobalProvider = ({ children }) => {
  // Stati per la gestione dei prodotti
  const [products, setProducts] = useState([]); // Lista di tutti i prodotti
  const [categories, setCategories] = useState([]); // Lista delle categorie
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [error, setError] = useState(null); // Gestione errori
  const [search, setSearch] = useState([]); // Risultati della ricerca
  const [query, setQuery] = useState(""); // Query di ricerca

  // Stati per la gestione del carrello
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []); // Carrello
  const [cartCount, setCartCount] = useState(0); // Numero di elementi nel carrello
  const [discount, setDiscount] = useState(0); // Sconto applicato
  const [total, setTotal] = useState(0); // Totale senza sconto
  const [finalTotal, setFinalTotal] = useState(0); // Totale finale con sconto
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  }); // Stato per la lista dei desideri
  const [wishlistCount, setWishlistCount] = useState(0); // Stato per il conteggio della wishlist

  // Stati per i filtri
  const [selectedCategory, setSelectedCategory] = useState(""); // Categoria selezionata
  const [sortPrice, setSortPrice] = useState(""); // Ordinamento per prezzo

  // Log per debugging
  console.log("Total:", total);
  console.log("Final Total:", finalTotal);

  // Effect per caricare i prodotti all'avvio
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

  // Effect per caricare le categorie all'avvio
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

  // Effect per gestire il carrello e i totali
  useEffect(() => {
    // Salva il carrello nel localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Aggiorna il conteggio degli elementi
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));

    // Calcola il subtotale
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // Calcola il totale con lo sconto
    const totalWithoutDiscount = subtotal - subtotal * discount;

    // Aggiorna i totali
    setTotal(totalWithoutDiscount);
    setFinalTotal(totalWithoutDiscount);
  }, [cart, discount]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Aggiorna il localStorage quando cambia la wishlist
    setWishlistCount(wishlist.length); // Aggiorna il conteggio della wishlist
  }, [wishlist]);

  // Funzione per aggiungere prodotti al carrello
  const addToCart = (product) => {
    setCartCount((prevCount) => prevCount + 1);

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Aggiorna la quantità se il prodotto esiste già
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Aggiunge il nuovo prodotto se non esiste
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      const updatedWishlist = isInWishlist
        ? prevWishlist.filter((item) => item.id !== product.id) // Rimuovi il prodotto
        : [...prevWishlist, product]; // Aggiungi il prodotto

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Salva nel localStorage
      return updatedWishlist;
    });
  };

  // Funzione per creare un nuovo ordine
  const createOrder = async (orderData) => {
    console.log('Payload inviato al server:', orderData);
    try {
      const response = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('Risposta HTTP:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Errore del server:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Risultato della risposta:', result);
      return result;
    } catch (error) {
      console.error('Errore durante la creazione dell\'ordine:', error);
      throw error;
    }
  };

  // Fornisce il contesto a tutti i componenti figli
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

// Esporta il contesto per l'utilizzo in altri componenti
export default GlobalContext;
