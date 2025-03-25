export default function ProductCard({ product }) {
    return (       
        <>
        <div className="product-image-container">
            <img src={product.images[0]} alt={product.name} className="product-image" />
            <img src={product.images[1]} alt={product.name} className="product-image1" />
        </div>
            
            <h2>{product.name}</h2>
            {/* <p>{product.description}</p> */}
            <p><strong>Prezzo:</strong> ${product.price}</p>
            {/* <p><strong>Sconto:</strong> {product.discount}%</p> */}
        </>        
    );
}







