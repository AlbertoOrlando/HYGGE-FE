// Importa l'hook useContext per accedere al contesto globale dell'applicazione
import { useContext } from "react";
// Importa il contesto globale che contiene i dati dei prodotti e delle categorie
import GlobalContext from '../cotext/GlobalContest'
// Importa il componente Link per la navigazione tra le pagine
import { Link } from "react-router-dom";
// Importa gli stili CSS specifici per la homepage
import "../components-CSS/HomepageCSS.css"

// Componente principale della homepage
export default function HomePage() {
    // Estrae i prodotti e le categorie dal contesto globale
    const { products, categories } = useContext(GlobalContext);

    // Rendering del componente
    return (
        <>
            {/* Banner principale con link alla pagina prodotti */}
            <div className="content-home">
                <Link to="/prodotti">View More</Link>
            </div>

            {/* Sezione "Nuovi Arrivi" */}
            <h1>New arrivals</h1>
            {/* Griglia dei nuovi prodotti */}
            <div className="new-arrivals">
                {/* Mostra gli ultimi 4 prodotti aggiunti */}
                {products.slice(-4).map(product => (
                    <Link to={`/prodotti/${product.slug}`} className="card-box" key={product.id}>
                        {/* Card del prodotto con immagini */}
                        <div className="card-body">
                            <img src={product.images[0]} alt={product.name} className="product-image2" />
                            <img src={product.images[1]} alt={product.name} className="product-image12" />
                        </div>
                        {/* Informazioni del prodotto */}
                        <div className="card-text">
                            <h4>{product.name}</h4>
                            <span>{product.price} €</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Sezione "Trending" con link alla categoria camera da letto */}
            <div className="trending">
                <h1>Trending</h1>
                <div className="camera-da-letto">
                    <Link to={`/category/1`} onClick={() => window.scrollTo(0, 0)}>Camere da letto</Link>
                </div>
            </div>

            {/* Sezione "In Evidenza" */}
            <h1>In evidenza</h1>
            <div className="evidence">
                <div className="evidence-img">
                    {/* Mostra 5 prodotti in evidenza (dal 15° al 20°) */}
                    {products.slice(15, 20).map(product => (
                        <Link to={`/prodotti/${product.slug}`} className="card-evidence" key={product.id}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={product.images[0]} alt={product.name} className="product-image2" />
                                    <img src={product.images[1]} alt={product.name} className="product-image12" />
                                </div>
                                <div className="card-text">
                                    <h4>{product.name}</h4>
                                    <span>{product.price} €</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Banner con link alla categoria salotto */}
            <div className="box-evidence">
                <Link className="btn-salotto" to={`/category/3`} onClick={() => window.scrollTo(0, 0)}>Salotto</Link>
            </div>

            {/* Sezione Bagno con descrizione e link */}
            <div className="bagno-home">
                <div className="bagno-text">
                    <div className="paragrafo-bagno">
                        <div className="titolo-bagno">
                            <h3>Bagno</h3>
                        </div>
                        <div className="parag-bagno">
                            <i>"Rinnova il tuo bagno con stile ed eleganza." </i>
                            <i>  Lasciati ispirare dal design e dalla raffinatezza</i>
                        </div>
                        <div className="btn-bagno">
                            <Link to={`/category/2`} onClick={() => window.scrollTo(0, 0)}>Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div className="bagno-img"></div>
            </div>

            {/* Sezione Giardino con prodotti in evidenza */}
            <div className="giardino-home">
                <div className="giardino-img">
                    <Link to={`/category/5`} onClick={() => window.scrollTo(0, 0)}>Giardino</Link>
                </div>
                <div className="giardino">
                    {/* Mostra 3 prodotti della categoria giardino (dal 44° al 47°) */}
                    {products.slice(44, 47).map(product => (
                        <Link to={`/prodotti/${product.slug}`} className="card-evidence" key={product.id}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={product.images[0]} alt={product.name} className="product-image2" />
                                    <img src={product.images[1]} alt={product.name} className="product-image12" />
                                </div>
                                <div className="card-text">
                                    <h4>{product.name}</h4>
                                    <span>{product.price} €</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Banner finale con link alla categoria sala da pranzo */}
            <div className="sala-da-pranzo">
                <div className="sala-da-pranzo-img">
                    <Link to={`/category/4`} onClick={() => window.scrollTo(0, 0)}>Sala da pranzo</Link>
                </div>
            </div>
        </>
    );
}