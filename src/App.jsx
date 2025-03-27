import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import DefaultLayout from "./layout/DefaultLayout";

// Pages
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryPage from "./pages/CategoryPage";
import ProdottiPage from "./pages/ProdottiPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CarrelloPage from "./pages/CarrelloPage";
import PagamentoPage from "./pages/PagamentoPage";
import RisultatiRicercaPage from "./pages/RisultatiRicercaPage";

// Importiamo il Provider dal GlobalContext
import { GlobalProvider } from "./cotext/GlobalContest";


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/prodotti" element={<ProdottiPage />} />
            <Route path="/prodotti/:id" element={<ProductDetailPage />} />

            <Route path="/search" element={<RisultatiRicercaPage />} />

            <Route path="/carrello" element={<CarrelloPage />} />
            <Route path="/pagamento" element={<PagamentoPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
