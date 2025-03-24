import "../components-CSS/ProductDetailPageCSS.css"

export default function ProductDetailPage() {
    return (
        <>
            <div className="product-detail">
                <div className="product-image">
                    <img src="https://via.placeholder.com/400" alt="product" />
                    <img src="https://via.placeholder.com/400" alt="product" />
                </div>
                <div className="product-info">
                    <h1>Nome Prodotto</h1>
                    <p className="discounted-price"><strong>Prezzo Scontato:</strong> $90</p>
                    <p className="original-price"><strong >Prezzo:</strong> $100</p>
                    <p><strong>Sconto:</strong> 10%</p>  
                    <button>Aggiungi al carrello</button>
                </div>
            </div>
        </>
    );
}