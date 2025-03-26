import { createContext, useState, useEffect } from "react";
import axios from "axios"; // Importa Axios

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Stato per i prodotti
  const [categoriCamera, setCategoriCamera] = useState([]);
  const [categoriBagno, setCategoriBagno] = useState([]);
  const [categoriSalotto, setCategoriSalotto] = useState([]);
  const [categoriSala, setCategoriSala] = useState([]);
  const [categoriGiardino, setCategoriGiardino] = useState([]);
  const [categoriGarage, setCategoriGarage] = useState([]);
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

  useEffect(() => {
    const fetchCameraDaLetto = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/category/cameraDaLetto");
        setCategoriCamera(response.data); // Salva i dati ricevuti
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    };

    fetchCameraDaLetto();
  }, []);

  useEffect(() => {
    const fetchCameraDaLetto = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/category/bagno");
        setCategoriBagno(response.data); // Salva i dati ricevuti
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    };

    fetchCameraDaLetto();
  }, []);

  useEffect(() => {
    const fetchCameraDaLetto = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/category/salotto");
        setCategoriSalotto(response.data); // Salva i dati ricevuti
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    };

    fetchCameraDaLetto();
  }, []);

  useEffect(() => {
    const fetchCameraDaLetto = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/category/salaDaPranzo");
        setCategoriSala(response.data); // Salva i dati ricevuti
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    };

    fetchCameraDaLetto();
  }, []);

  useEffect(() => {
    const fetchCameraDaLetto = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/category/giardino");
        setCategoriGiardino(response.data); // Salva i dati ricevuti
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    };

    fetchCameraDaLetto();
  }, []);

  useEffect(() => {
    const fetchCameraDaLetto = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/category/garage");
        setCategoriGarage(response.data); // Salva i dati ricevuti
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
      } finally {
        setLoading(false);
      }
    };

    fetchCameraDaLetto();
  }, []);
  return (
    <GlobalContext.Provider value={{ products, loading, error, categoriCamera, categoriBagno, categoriSalotto, categoriSala, categoriGiardino, categoriGarage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
