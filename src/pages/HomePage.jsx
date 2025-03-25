// importiamo il contesto globale e la parte REact di utilizzo dello stesso
import { useContext } from "react";
import GlobalContext from '../cotext/GlobalContest'

import { Link } from "react-router-dom";

import "../components-CSS/HomepageCSS.css"

export default function HomePage() {
    const { products } = useContext(GlobalContext);
    return (
        <>
            <div className="content-home">
                <Link to="/prodotti">View More</Link>
            </div>

            <h2>New arrivals</h2>
            <div className="new-arrivals">
                {products.slice(0, 5).map(product => (
                    <Link className="card-box" key={product.id}>
                        <div className="card-body">
                            <img src={product.image[0]} alt={product.name} className="product-image" />
                            <img src={product.image[1]} alt={product.name} className="product-image1" />
                        </div>
                        <div className="card-text">
                            <h2>{product.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="trending">
                <h2>Trending</h2>
                <div className="camera-da-letto">
                    <h3>Camere da letto</h3>
                    <Link to="/camera-da-letto">Shop Now</Link>
                </div>
            </div>

            <h2>In evidenza</h2>
            <div className="evidence">
                <div className="evidence-img">
                    {products.slice(15, 19).map(product => (
                        <Link className="card-evidence" key={product.id}>
                            <div className="card">
                                <div className="card-body">
                                    <img src={product.image[0]} alt={product.name} className="product-image" />
                                    <img src={product.image[1]} alt={product.name} className="product-image1" />
                                </div>
                                <h3>{product.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="box-evidence">

                </div>
            </div>

            <div className="bagno-home">
                <div className="bagno-text">
                    <h3>Bagno</h3>
                    <Link to="/bagno">Shop Now</Link>
                </div>
                <div className="bagno-img">

                </div>
            </div>


        </>
    );
}