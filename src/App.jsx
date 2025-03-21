// import degli elementi della libreria di gestione delle rotte
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import DefaultLayout from "./layout/DefaultLayout";

// Pages
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<HomePage />} /> 
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
 
    </>
  )
}

export default App
