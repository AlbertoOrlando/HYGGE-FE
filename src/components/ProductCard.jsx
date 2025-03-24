export default function ProductCard({ product }) {
    return (       
        <>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>Prezzo:</strong> ${product.price}</p>
            <p><strong>Sconto:</strong> {product.discount}%</p>
        </>        
    );
}







