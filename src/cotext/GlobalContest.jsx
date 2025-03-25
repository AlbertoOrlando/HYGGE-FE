import { createContext, useState, useEffect } from "react";
import axios from "axios"; // Importa Axios

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Stato per i prodotti
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <GlobalContext.Provider value={{ products, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
