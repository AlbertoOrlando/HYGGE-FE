import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import GlobalContext from "../cotext/GlobalContest";

export default function ProductCard({ product }) {
    const { wishlist, toggleWishlist } = useContext(GlobalContext);

    const isInWishlist = wishlist.some((item) => item.id === product.id);

    const handleHeartClick = (e) => {
        e.preventDefault(); // Impedisce il comportamento predefinito del link
        toggleWishlist(product);
    };

    return (       
        <div className="heart2">
        <div className="product-image-container">
            <img src={product.images[0]} alt={product.name} className="product-image" />
            <img src={product.images[1]} alt={product.name} className="product-image1" />
        </div>
            <div>
                <FontAwesomeIcon 
                    className={`heart ${isInWishlist ? "active" : ""}`} 
                    icon={faHeart} 
                    onClick={handleHeartClick} // Usa il gestore per prevenire il comportamento predefinito
                />
            </div>
            <h2>{product.name}</h2>
            <p><strong>Prezzo:</strong> ${product.price}</p>
        </div>        
    );
}







