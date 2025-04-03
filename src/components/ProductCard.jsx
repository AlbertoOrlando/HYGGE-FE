// Importa il componente FontAwesomeIcon per utilizzare le icone di FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Importa l'icona specifica del cuore da FontAwesome per i preferiti
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// Importa l'hook useContext per accedere al contesto globale dell'applicazione
import { useContext } from "react";
// Importa il contesto globale che contiene lo stato della wishlist
import GlobalContext from "../cotext/GlobalContest";

// Componente ProductCard che riceve le proprietà del prodotto come prop
export default function ProductCard({ product }) {
    // Estrae dal contesto globale la lista dei preferiti e la funzione per modificarla
    const { wishlist, toggleWishlist } = useContext(GlobalContext);

    // Verifica se il prodotto corrente è già presente nella wishlist
    const isInWishlist = wishlist.some((item) => item.id === product.id);

    // Gestore del click sull'icona del cuore
    const handleHeartClick = (e) => {
        e.preventDefault(); // Previene la navigazione del link
        toggleWishlist(product); // Aggiunge o rimuove il prodotto dalla wishlist
    };

    // Rendering del componente
    return (
        // Contenitore principale della card prodotto
        <div className="heart2">

            <div className="product-image-container">
                {/* Prima immagine del prodotto (visualizzazione predefinita) */}
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                />
                {/* Seconda immagine del prodotto (visualizzata al hover) */}
                <img
                    src={product.images[1]}
                    alt={product.name}
                    className="product-image1"
                />
            </div>
            {/* Contenitore per l'icona del cuore */}
            <div>
                {/* Icona del cuore che cambia stato in base alla presenza nella wishlist */}
                <FontAwesomeIcon
                    className={`heart ${isInWishlist ? "active" : ""}`}
                    icon={faHeart}
                    onClick={handleHeartClick}
                />
            </div>
            {/* Nome del prodotto */}
            <h2>{product.name}</h2>
            {/* Prezzo del prodotto */}
            <p><strong>Prezzo:</strong> ${product.price}</p>
        </div>
    );
}







