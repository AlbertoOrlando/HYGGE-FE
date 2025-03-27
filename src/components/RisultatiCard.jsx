

export default function RisultatiCard({ result }) {
    return (
        <>
            <div className="product-image-container">
                <img src={result.images[0]} alt={result.name} className="product-image" />
                <img src={result.images[1]} alt={result.name} className="product-image1" />
            </div>

            <h2>{result.name}</h2>
            {/* <p>{product.description}</p> */}
            <p><strong>Prezzo:</strong> ${result.price}</p>
            {/* <p><strong>Sconto:</strong> {product.discount}%</p> */}
        </>
    )
}
