// importiamo il contesto globale e la parte REact di utilizzo dello stesso
import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

import { Link } from "react-router-dom";

import "../components-CSS/HomepageCSS.css"

export default function HomePage() {
    const { products, categories } = useContext(GlobalContext);
    return (
        <>
            <div className="content-home">
                <Link to="/prodotti">View More</Link>
            </div>

            <h1>New arrivals</h1>
            <div className="new-arrivals">
                {products.slice(-5).map(product => (
                    <Link to={`/prodotti/${product.id}`} className="card-box" key={product.id}>
                        <div className="card-body">
                            <img src={product.images[0]} alt={product.name} className="product-image2" />
                            <img src={product.images[1]} alt={product.name} className="product-image12" />
                        </div>
                        <div className="card-text">
                            <h4>{product.name}</h4>
                            <span>{product.price} €</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="trending">
                <h1>Trending</h1>
                <div className="camera-da-letto">
                    <Link to={`/category/1`} onClick={() => window.scrollTo(0, 0)}>Camere da letto</Link>
                </div>
            </div>

            <h1>In evidenza</h1>
            <div className="evidence">
                <div className="evidence-img">
                    {products.slice(15, 19).map(product => (
                        <Link to={`/prodotti/${product.id}`} className="card-evidence" key={product.id}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={product.images[0]} alt={product.name} className="product-image2" />
                                    <img src={product.images[1]} alt={product.name} className="product-image12" />
                                </div>
                                <h4>{product.name}</h4>
                                <span>{product.price} €</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="box-evidence">
                <Link className="btn-salotto" to={`/category/3`} onClick={() => window.scrollTo(0, 0)}>View More</Link>
            </div>

            <div className="bagno-home">
                <div className="bagno-text">

                    <div className="paragrafo-bagno">
                        <div className="titolo-bagno">
                            <h3>Bagno</h3>
                        </div>
                        <div className="parag-bagno">
                            <p>"Rinnova il tuo bagno con stile ed eleganza." </p>
                            <i>  Lasciati ispirare dal design e dalla raffinatezza</i>
                        </div>
                        <div className="btn-bagno">
                            <Link to={`/category/2`} onClick={() => window.scrollTo(0, 0)}>Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div className="bagno-img">

                </div>
            </div>

            <div className="giardino-home">
                <div className="giardino-img">
                    <Link to={`/category/5`} onClick={() => window.scrollTo(0, 0)}>Giardino</Link>
                </div>
                <div className="giardino">
                    {products.slice(44, 47).map(product => (
                        <Link to={`/prodotti/${product.id}`} className="card-evidence" key={product.id}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={product.images[0]} alt={product.name} className="product-image2" />
                                    <img src={product.images[1]} alt={product.name} className="product-image12" />
                                </div>
                                <h4>{product.name}</h4>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="sala-da-pranzo">
                <div className="sala-da-pranzo-img">
                    <Link to={`/category/4`} onClick={() => window.scrollTo(0, 0)}>Sala da pranzo</Link>
                </div>
            </div>


        </>
    );
}