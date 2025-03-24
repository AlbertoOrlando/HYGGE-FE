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
import ProductDetailPage from "./pages/ProductDetailPage";

// importiamo il contesto creato (global)
import GlobalContext from "./cotext/GlobalContest";

function App() {
  const products = [
    {
      id: 1,
      name: "Divano Moderno",
      description: "Divano elegante a tre posti con rivestimento in velluto.",
      price: 799.99,
      discount: 10,
      image: ["https://northdeco.com/cdn/shop/files/Sofa_Margor_ND-0275-2JH946B2S-3-RED_02_720x.jpg?v=1718962818",
      'https://northdeco.com/cdn/shop/files/Sofa_Margor_ND-0275-2JH946B2S-3-RED_05_720x.jpg?v=1718962822']
    },
    {
      id: 2,
      name: "Divano Classico",
      description: "Divano in pelle con braccioli intagliati a mano.",
      price: 999.99,
      discount: 12,
      image: ["https://northdeco.com/cdn/shop/files/Florence_02_0012_Rellenogenerativo16_540x.jpg?v=1710408170",
        'https://northdeco.com/cdn/shop/files/Florence_02_0005_Rellenogenerativo20_540x.jpg?v=1710408170']
    },
    {
      id: 3,
      name: "Divano Minimal",
      description: "Divano compatto con struttura in metallo e cuscini sfoderabili.",
      price: 699.99,
      discount: 8,
      image: ["https://northdeco.com/cdn/shop/files/Sofa_Cama_Northern_ND-0271-JH984-GREY_02_720x.jpg?v=1719409404",
        'https://northdeco.com/cdn/shop/files/Sofa_Cama_Northern_ND-0271-JH984-GREY_08_720x.jpg?v=1719409409']
    },
    {
      id: 4,
      name: "Sedia da Pranzo",
      description: "Sedia ergonomica in legno con seduta imbottita.",
      price: 129.99,
      discount: 5,
      image: ["https://northdeco.com/cdn/shop/files/SillaLoopcrystalND-0730-CLEAR_01_720x.jpg?v=1714652937",
        'https://northdeco.com/cdn/shop/files/SillaLoopcrystalND-0730-CLEAR_06_720x.jpg?v=1714652937']
    },
    {
      id: 5,
      name: "Sedia Scandinava",
      description: "Sedia dal design nordico con gambe in legno di faggio.",
      price: 149.99,
      discount: 7,
      image: ["https://northdeco.com/cdn/shop/files/SillaOliviaND-0612_01_720x.jpg?v=1732607979",
        'https://northdeco.com/cdn/shop/files/SillaOliviaND-0612_06_720x.jpg?v=1732607983']    },
    {
      id: 6,
      name: "Sedia Industriale",
      description: "Sedia in metallo con seduta in legno massello.",
      price: 99.99,
      discount: 6,
      image: ["https://northdeco.com/cdn/shop/files/otra_720x.jpg?v=1724853097",
        'https://northdeco.com/cdn/shop/files/SillaTolikND-0824-BLACK-05_720x.jpg?v=1724852690']    },
    {
      id: 7,
      name: "Letto Matrimoniale",
      description: "Letto matrimoniale in legno massello con testiera imbottita.",
      price: 999.99,
      discount: 15,
      image: ["https://northdeco.com/cdn/shop/files/SofaBarnaND-0010-TY-801-PU-BLACK-2P_02_720x.jpg?v=1736864940",
        'https://northdeco.com/cdn/shop/files/SofaBarnaND-0010-TY-801-PU-BLACK-2P_06_720x.jpg?v=1736864940']    },
    {
      id: 8,
      name: "Letto Contenitore",
      description: "Letto con vano contenitore e rivestimento in tessuto.",
      price: 1099.99,
      discount: 10,
      image: ["https://northdeco.com/cdn/shop/files/0002_Rellenogenerativo6_db489c20-8701-4670-8470-0139f76db99b_720x.jpg?v=1737538115",
        'https://northdeco.com/cdn/shop/files/Box2_0001_Northdeco-4237_2ac6d4a5-d294-487d-a236-b0f0641945a9_720x.jpg?v=1737538118']    },
    {
      id: 9,
      name: "Letto a Castello",
      description: "Struttura in legno per due posti letto, ideale per bambini.",
      price: 799.99,
      discount: 12,
      image: ["https://northdeco.com/cdn/shop/files/ConsolaKentND-0599_01_4cdb7702-db26-48ac-88a8-46175bd19d82_720x.jpg?v=1716992614",
        'https://northdeco.com/cdn/shop/files/ConsolaKentND-0599_05_720x.jpg?v=1716992614']    },
    {
      id: 10,
      name: "Lampada da Tavolo",
      description: "Lampada LED con base in metallo e paralume in tessuto.",
      price: 49.99,
      discount: 0,
      image: ["https://northdeco.com/cdn/shop/products/lampara-pie-sebastian-wrong_1_720x.png?v=1686220328",
        'https://northdeco.com/cdn/shop/products/lampara-pie-sebastian-wrong_2_720x.png?v=1686220331']    },
    {
      id: 11,
      name: "Lampada da Terra",
      description: "Lampada con struttura in legno e luce regolabile.",
      price: 129.99,
      discount: 5,
      image: ["https://northdeco.com/cdn/shop/products/lampara-michy_negro_1557_720x.png?v=1686224778",
        'https://northdeco.com/cdn/shop/products/lampara-michy_negro_1558_720x.png?v=1686224780']    },
    {
      id: 12,
      name: "Lampadario Moderno",
      description: "Lampadario a sospensione con design minimalista.",
      price: 199.99,
      discount: 8,
      image: ["https://northdeco.com/cdn/shop/products/lampara-tropic_negro_2_28b0803a-0cde-4b1f-9363-8d53babe1d10_720x.png?v=1686223110",
        'https://northdeco.com/cdn/shop/products/lampara-tropic_beige_1_8d1eb5dc-b67a-4c89-8b8d-52bdfb8ba1b3_720x.png?v=1686223113']    },
    {
      id: 13,
      name: "Tavolo da Cucina",
      description: "Tavolo in legno massello con finitura naturale.",
      price: 449.99,
      discount: 10,
      image: ["https://northdeco.com/cdn/shop/files/Web_Set15_02_ND-0836_ND-0786_720x.jpg?v=1734333362",
        'https://northdeco.com/cdn/shop/files/Mesa_Gaia_ND-0836-WALNUT_04_720x.jpg?v=1734093061']    },
    {
      id: 14,
      name: "Tavolo Allungabile",
      description: "Tavolo in legno con meccanismo di estensione.",
      price: 599.99,
      discount: 15,
      image: ["https://northdeco.com/cdn/shop/files/MesaSantoriniND-0130-BLACK_01ok-min_720x.jpg?v=1713345405",
        'https://northdeco.com/cdn/shop/files/MesaSantoriniND-0130-BLACK_07-min_720x.jpg?v=1713345405']    },
    {
      id: 15,
      name: "Tavolino da Salotto",
      description: "Tavolino con struttura in vetro e metallo dorato.",
      price: 249.99,
      discount: 5,
      image: ["https://northdeco.com/cdn/shop/files/Northdeco_Spring25_0186_720x.jpg?v=1742472935",
        'https://northdeco.com/cdn/shop/files/Northdeco_Spring25_0026_720x.jpg?v=1742472936']    },
    {
      id: 16,
      name: "Scrivania Ufficio",
      description: "Scrivania moderna con cassetti e finitura in legno.",
      price: 399.99,
      discount: 10,
      image: ["https://northdeco.com/cdn/shop/files/Northdeco_Spring25_0473_720x.jpg?v=1742478959",
        'https://northdeco.com/cdn/shop/files/Becket_Detalles_0009_IMG_9505_720x.jpg?v=1742478959']    },
    {
      id: 17,
      name: "Poltrona Relax",
      description: "Poltrona reclinabile con supporto lombare.",
      price: 349.99,
      discount: 12,
      image: ["https://northdeco.com/cdn/shop/files/SillonBallND-0119-RED_01_d0a5f8fc-fbc2-4027-af3f-7485de0f285c_720x.jpg?v=1717410903",
        'https://northdeco.com/cdn/shop/files/SillonBallND-0119-RED_05_720x.jpg?v=1717410903']    },
    {
      id: 18,
      name: "Cassettiera Moderna",
      description: "Cassettiera con 4 cassetti e struttura in legno laccato.",
      price: 299.99,
      discount: 8,
      image: ["https://northdeco.com/cdn/shop/files/ConsolaBrentND-0593_01_720x.jpg?v=1713512488",
        'https://northdeco.com/cdn/shop/files/ConsolaBrentND-0593_07_720x.jpg?v=1713512491']    },
    {
      id: 19,
      name: "Armadio Scorrevole",
      description: "Armadio con ante scorrevoli e specchi integrati.",
      price: 899.99,
      discount: 15,
      image: ["https://northdeco.com/cdn/shop/files/aparador-capana-1_720x.png?v=1688631317",
        'https://northdeco.com/cdn/shop/files/mueblestv-capana-6_540x.png?v=1688984500']    },
    {
      id: 20,
      name: "Scarpiera Salvaspazio",
      description: "Scarpiera verticale con ripiani regolabili.",
      price: 159.99,
      discount: 10,
      image: ["https://northdeco.com/cdn/shop/files/TabureteBinsa_0003_Rellenogenerativo5_720x.jpg?v=1706086046",
        'https://northdeco.com/cdn/shop/files/TabureteBinsa_0006_Northdeco-2128_720x.jpg?v=1706086046']    }
  ];

  return (
    <GlobalContext.Provider value={{ products }}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/camera-da-letto" element={<CameraDaLettoPage/>} />
            <Route path="/bagno" element={<BagnoPage />} />
            <Route path="/salotto" element={<SalottoPage />} />
            <Route path="/prodotti" element={<ProdottiPage />} />
            <Route path="/prodotti/:id" element={<ProductDetailPage />} />
            <Route path="/sala-da-pranzo" element={<SalaDaPranzoPage />} />
            <Route path="/giardino" element={<GiardinoPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </GlobalContext.Provider>
  )
}

export default App
