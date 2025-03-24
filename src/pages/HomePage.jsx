import { Link } from "react-router-dom";

import "../components-CSS/HomepageCSS.css"

export default function HomePage() {
    return (
        <>
            <div className="content-home">
                <Link to="/giardino">View More</Link>
            </div>
            <div className="new-arrivals">
                <h2>New arrivals</h2>
                <div className="card-box">
                    <div className="card-body">

                    </div>
                    <div className="card-text">

                    </div>
                </div>
            </div>
            <div className="trending">
                <h2>Trending</h2>
                <div className="camera-da-letto">
                    <h3>Camere da letto</h3>
                    <Link to="/camera-da-letto">Shop Now</Link>
                </div>
            </div>
            <div className="evidence">
                <h2>In evidenza</h2>
                <div className="card-box">
                    <div className="card-body">

                    </div>
                    <div className="card-text">

                    </div>
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