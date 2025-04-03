// Importa gli hook fondamentali di React per la gestione dello stato e del contesto
import { createContext, useState, useEffect } from "react";
// Importa axios per effettuare chiamate HTTP al backend
import axios from "axios";

// Crea un nuovo contesto React che sarà utilizzato in tutta l'applicazione
const GlobalContext = createContext();

// Componente Provider che avvolgerà l'intera applicazione per fornire il contesto globale
export const GlobalProvider = ({ children }) => {
  // --- GESTIONE STATI PRODOTTI ---
  // Stato per memorizzare l'elenco completo dei prodotti
  const [products, setProducts] = useState([]);
  // Stato per memorizzare le categorie disponibili
  const [categories, setCategories] = useState([]);
  // Stato per indicare se è in corso un caricamento dati
  const [loading, setLoading] = useState(true);
  // Stato per la gestione degli errori
  const [error, setError] = useState(null);
  // Stato per memorizzare i risultati della ricerca
  const [search, setSearch] = useState([]);
  // Stato per memorizzare il testo della ricerca corrente
  const [query, setQuery] = useState("");

  // --- GESTIONE STATI CARRELLO ---
  // Stato del carrello, inizializzato dal localStorage o vuoto
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  // Contatore degli elementi nel carrello
  const [cartCount, setCartCount] = useState(0);
  // Percentuale di sconto applicata
  const [discount, setDiscount] = useState(0);
  // Totale del carrello prima dello sconto
  const [total, setTotal] = useState(0);
  // Totale finale dopo l'applicazione dello sconto
  const [finalTotal, setFinalTotal] = useState(0);

  // --- GESTIONE STATI WISHLIST ---
  // Stato della lista dei desideri, inizializzato dal localStorage o vuoto
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  // Contatore degli elementi nella wishlist
  const [wishlistCount, setWishlistCount] = useState(0);

  // --- GESTIONE STATI FILTRI ---
  // Categoria attualmente selezionata per il filtro
  const [selectedCategory, setSelectedCategory] = useState("");
  // Ordinamento per prezzo selezionato
  const [sortPrice, setSortPrice] = useState("");

  // --- DEBUG LOGS ---
  // Log per debugging dei totali
  console.log("Totale carrello:", total);
  console.log("Totale finale con sconto:", finalTotal);

  // --- EFFETTI COLLATERALI ---
  // Effetto per caricare i prodotti all'avvio dell'applicazione
  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Recupero prodotti in corso...');
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        console.log('Prodotti recuperati:', response.data.length);
        setProducts(response.data);
      } catch (err) {
        const errorMessage = "Errore nel caricamento dei prodotti";
        console.error('Errore recupero prodotti:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Effetto per caricare le categorie all'avvio
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

  // Effetto per gestire gli aggiornamenti del carrello
  useEffect(() => {
    // Salva il carrello nel localStorage ad ogni modifica
    localStorage.setItem("cart", JSON.stringify(cart));
    // Aggiorna il numero totale di elementi nel carrello
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));

    // Calcola il subtotale del carrello
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // Applica lo sconto al subtotale
    const totalWithoutDiscount = subtotal - subtotal * discount;

    // Aggiorna i totali nel contesto
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
