// import degli elementi della libreria di gestione delle rotte
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import DefaultLayout from "./layout/DefaultLayout";

// Pages
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CameraDaLettoPage from "./pages/CameraDaLettoPage";
import BagnoPage from "./pages/BagnoPage";
import SalottoPage from "./pages/SalottoPage";
import ProdottiPage from "./pages/ProdottiPage";
import SalaDaPranzoPage from "./pages/SalaDaPranzoPage";
import GiardinoPage from "./pages/GiardinoPage";
import GaragePage from "./pages/GaragePage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/camera-da-letto" element={<CameraDaLettoPage/>} />
            <Route path="/bagno" element={<BagnoPage />} />
            <Route path="/salotto" element={<SalottoPage />} />
            <Route path="/prodotti" element={<ProdottiPage />} />
            <Route path="/sala-da-pranzo" element={<SalaDaPranzoPage />} />
            <Route path="/giardino" element={<GiardinoPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter >

    </>
  )
}

export default App
