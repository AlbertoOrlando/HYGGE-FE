// Importa i componenti necessari da React Router per la gestione delle rotte
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa il layout predefinito che avvolge le pagine principali
import DefaultLayout from "./layout/DefaultLayout";

// Importa le pagine dell'applicazione
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryPage from "./pages/CategoryPage";
import ProdottiPage from "./pages/ProdottiPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CarrelloPage from "./pages/CarrelloPage";
import PagamentoPage from "./pages/PagamentoPage";
import RisultatiRicercaPage from "./pages/RisultatiRicercaPage";
import ConfermaOrdinePage from "./pages/ConfermaOrdinePage";
import WishListPage from "./pages/WishListPage";

// Importa il Provider dal contesto globale per condividere lo stato tra i componenti
import { GlobalProvider } from "./cotext/GlobalContest";

// Definizione del componente principale dell'applicazione
function App() {
  return (
    // Avvolge l'intera applicazione con il contesto globale
    <GlobalProvider>
      {/* Configura il router per la navigazione tra le pagine */}
      <BrowserRouter>
        {/* Definisce le rotte dell'applicazione */}
        <Routes>
          {/* Rotta per la pagina di conferma ordine */}
          <Route path="/conferma-ordine" element={<ConfermaOrdinePage />} />

          {/* Rotte avvolte dal layout predefinito */}
          <Route element={<DefaultLayout />} >
            {/* Rotta per la homepage */}
            <Route path="/" element={<HomePage />} />
            {/* Rotta per la pagina "Chi siamo" */}
            <Route path="/about-us" element={<AboutUsPage />} />
            {/* Rotta per le pagine delle categorie con ID dinamico */}
            <Route path="/category/:id" element={<CategoryPage />} />
            {/* Rotta per la pagina che mostra tutti i prodotti */}
            <Route path="/prodotti" element={<ProdottiPage />} />
            {/* Rotta per la pagina di dettaglio prodotto con slug dinamico */}
            <Route path="/prodotti/:slug" element={<ProductDetailPage />} />
            {/* Rotta per la pagina dei risultati di ricerca */}
            <Route path="/search" element={<RisultatiRicercaPage />} />
            {/* Rotta per la pagina della lista dei desideri */}
            <Route path="/wishlist" element={<WishListPage />} />
            {/* Rotta per la pagina del carrello */}
            <Route path="/carrello" element={<CarrelloPage />} />
            {/* Rotta per la pagina di pagamento */}
            <Route path="/pagamento" element={<PagamentoPage />} />
            {/* Rotta per la pagina 404 (Not Found) per gestire URL non validi */}
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

// Esporta il componente App come componente principale dell'applicazione
export default App;