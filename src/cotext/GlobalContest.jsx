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
      console.log('Fetching products...');
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        console.log('Products fetched:', response.data.length);
        setProducts(response.data);
      } catch (err) {
        const errorMessage = "Errore nel caricamento dei prodotti";
        console.error('fetchProducts error:', err);
        setError(errorMessage);
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

  // Debug state changes
  useEffect(() => {
    console.group('GlobalContext State Changes');
    console.log('Products:', products.length);
    console.log('Categories:', categories);
    console.log('Search Results:', search.length);
    console.log('Cart Items:', cart.length);
    console.log('Wishlist Items:', wishlist.length);
    console.log('Current Query:', query);
    console.log('Selected Category:', selectedCategory);
    console.log('Sort Price:', sortPrice);
    console.groupEnd();
  }, [products, categories, search, cart, wishlist, query, selectedCategory, sortPrice]);

  // Debug cart calculations
  useEffect(() => {
    console.group('Cart Calculations');
    console.log('Cart Count:', cartCount);
    console.log('Subtotal:', total);
    console.log('Discount:', discount);
    console.log('Final Total:', finalTotal);
    console.groupEnd();
  }, [cartCount, total, discount, finalTotal]);

  // Funzione per aggiungere prodotti al carrello
  const addToCart = (product) => {
    console.group('Adding to Cart');
    console.log('Product:', product);
    console.log('Current Cart:', cart);

    setCartCount((prevCount) => {
      console.log('Previous Count:', prevCount);
      console.log('New Count:', prevCount + 1);
      return prevCount + 1;
    });

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const newCart = existingItem
        ? prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        : [...prevCart, { ...product, quantity: 1 }];

      console.log('Updated Cart:', newCart);
      console.groupEnd();
      return newCart;
    });
  };

  const toggleWishlist = (product) => {
    console.group('Toggling Wishlist');
    console.log('Product:', product);
    console.log('Current Wishlist:', wishlist);

    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      console.log('Is in wishlist:', isInWishlist);

      const updatedWishlist = isInWishlist
        ? prevWishlist.filter((item) => item.id !== product.id)
        : [...prevWishlist, product];

      console.log('Updated Wishlist:', updatedWishlist);
      console.groupEnd();
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
      search, setSearch,
      products, categories,
      loading, error,
      cart, setCart,
      addToCart,
      query, setQuery,
      createOrder,
      cartCount, setCartCount,
      total, setDiscount,
      discount, finalTotal, setFinalTotal,
      selectedCategory, setSelectedCategory,
      sortPrice, setSortPrice,
      wishlist, setWishlist,
      toggleWishlist,
      wishlistCount
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Esporta il contesto per l'utilizzo in altri componenti
export default GlobalContext;
