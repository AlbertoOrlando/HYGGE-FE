import { useContext } from "react";
import GlobalContext from "../cotext/GlobalContest";
import "../components-CSS/WishListCSS.css";
import { Link } from "react-router-dom";

export default function WishListPage() {
    const { wishlist, toggleWishlist } = useContext(GlobalContext);

    return (
        <div className="wishlist-container">
            <h1>Lista dei Desideri</h1>
            {wishlist.length === 0 ? (
                <p>Non hai ancora aggiunto prodotti alla tua lista dei desideri.</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((product) => (
                        <div key={product.id} className="wishlist-item">
                            <img src={product.images[0]} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Prezzo: €{product.price}</p>
                            <button onClick={() => toggleWishlist(product)}>Rimuovi</button>
                            <Link to={`/prodotti/${product.id}`}>Visualizza Prodotto</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}