export default function ProductDetailPage() {
    return (
        <>
            <div className="product-detail">
                <div className="product-image">
                    <img src="https://via.placeholder.com/400" alt="product" />
                </div>
                <div className="product-info">
                    <h1>Nome Prodotto</h1>
                    <p>Descrizione Prodotto</p>
                    <p><strong>Prezzo:</strong> $100</p>
                    <p><strong>Sconto:</strong> 10%</p>
                    <p><strong>Prezzo Scontato:</strong> $90</p>
                    <button>Aggiungi al carrello</button>
                </div>
            </div>
        </>
    );
}