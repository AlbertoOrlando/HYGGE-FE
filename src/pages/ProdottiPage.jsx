import "../components-CSS/ProdottiPageCSS.css"
import ProductCard from "../components/ProductCard" // Importa il componente ProductPage
import {Link}from "react-router-dom"


const products = [
    {
      id: 1,
      name: "Divano Moderno",
      description: "Divano elegante a tre posti con rivestimento in velluto.",
      price: 799.99,
      discount: 10,
      image: "https://www.sofaclubdivani.com/3811-large_default/divano-boston.jpg"
    },
    {
      id: 2,
      name: "Divano Classico",
      description: "Divano in pelle con braccioli intagliati a mano.",
      price: 999.99,
      discount: 12,
      image: "https://www.sofaclubdivani.com/587-large_default/divano-tamigi.jpg"
    },
    {
      id: 3,
      name: "Divano Minimal",
      description: "Divano compatto con struttura in metallo e cuscini sfoderabili.",
      price: 699.99,
      discount: 8,
      image: "https://www.doimosalotti.it/img/716/spencer_oit_1668.webp"
    },
    {
      id: 4,
      name: "Sedia da Pranzo",
      description: "Sedia ergonomica in legno con seduta imbottita.",
      price: 129.99,
      discount: 5,
      image: "https://medias.maisonsdumonde.com/image/upload/ar_1:1,c_fill,f_auto,q_auto,w_732/v1/img/sedia-da-pranzo-professionale-in-velluto-verde-botanico-1000-4-25-222942_9.jpg"
    },
    {
      id: 5,
      name: "Sedia Scandinava",
      description: "Sedia dal design nordico con gambe in legno di faggio.",
      price: 149.99,
      discount: 7,
      image: "https://medias.maisonsdumonde.com/images/ar_1:1,c_pad,f_auto,q_auto,w_732/v1/mkp/M22044066_2/sedia-da-scrivania-girevole-in-pelle-sintetica-bianca-79-91-cm.jpg"
    },
    {
      id: 6,
      name: "Sedia Industriale",
      description: "Sedia in metallo con seduta in legno massello.",
      price: 99.99,
      discount: 6,
      image: "https://northdeco.com/cdn/shop/files/8_db8649b5-7ea1-4979-8399-493d8ad79f82_720x.jpg?v=1702476542"
    },
    {
      id: 7,
      name: "Letto Matrimoniale",
      description: "Letto matrimoniale in legno massello con testiera imbottita.",
      price: 999.99,
      discount: 15,
      image: "https://www.nuovimondi.com/wp-content/uploads/2024/08/letto-etnico-legno-massello-2401-1.jpg"
    },
    {
      id: 8,
      name: "Letto Contenitore",
      description: "Letto con vano contenitore e rivestimento in tessuto.",
      price: 1099.99,
      discount: 10,
      image: "https://www.emporioarredo.it/11160-large_default/letto-contenitore-matrimoniale-penelope-160-rivestito-pelle-sintetica-compreso-di-rete-l160-p190-made-italy.jpg"
    },
    {
      id: 9,
      name: "Letto a Castello",
      description: "Struttura in legno per due posti letto, ideale per bambini.",
      price: 799.99,
      discount: 12,
      image: "https://www.smartarredodesign.com/76446-thickbox_default/letto-a-castello-a-scomparsa-con-mobili-kando-i.jpg"
    },
    {
      id: 10,
      name: "Lampada da Tavolo",
      description: "Lampada LED con base in metallo e paralume in tessuto.",
      price: 49.99,
      discount: 0,
      image: "https://lw-cdn.com/images/68428D43A3AA/k_3e9c3120d0bf4d5674a3ca31a7d90006;w_1600;h_1600;q_100/9050347.jpg"
    },
    {
      id: 11,
      name: "Lampada da Terra",
      description: "Lampada con struttura in legno e luce regolabile.",
      price: 129.99,
      discount: 5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKSzHAAq87Yp6Okftf4LpKx5rNcIqPI0lsg&s"
    },
    {
      id: 12,
      name: "Lampadario Moderno",
      description: "Lampadario a sospensione con design minimalista.",
      price: 199.99,
      discount: 8,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBMInvHGGXGfKgS58s85MWfgA-oN9o9_Usig&s"
    },
    {
      id: 13,
      name: "Tavolo da Cucina",
      description: "Tavolo in legno massello con finitura naturale.",
      price: 449.99,
      discount: 10,
      image: "https://www.viadurini.it/data/prod/img/tavolo-da-cucina-in-legno-e-metallo-made-in-italy-alta-qualita-dotto-1.jpg"
    },
    {
      id: 14,
      name: "Tavolo Allungabile",
      description: "Tavolo in legno con meccanismo di estensione.",
      price: 599.99,
      discount: 15,
      image: "https://www.mobilifiver.com/eu/media/catalog/product/cache/091412bd41d87726fd23ff548afcc002/T/A/TAVICTWOT_prodotto_02_web_9897.jpeg"
    },
    {
      id: 15,
      name: "Tavolino da Salotto",
      description: "Tavolino con struttura in vetro e metallo dorato.",
      price: 249.99,
      discount: 5,
      image: "https://www.smartarredodesign.com/25929-thickbox_default/tavolino-salotto-in-vetro-runi.jpg"
    },
    {
      id: 16,
      name: "Scrivania Ufficio",
      description: "Scrivania moderna con cassetti e finitura in legno.",
      price: 399.99,
      discount: 10,
      image: "https://www.gaesco.it/files/gaesco_Files/Foto/209263.PNG"
    },
    {
      id: 17,
      name: "Poltrona Relax",
      description: "Poltrona reclinabile con supporto lombare.",
      price: 349.99,
      discount: 12,
      image: "https://www.oo-home.shop/source_data/ecom-product-data/sxga/poltrona-relax-sini-con-poggiapiedi-002__JPG_BF934CCA89A49805.jpg"
    },
    {
      id: 18,
      name: "Cassettiera Moderna",
      description: "Cassettiera con 4 cassetti e struttura in legno laccato.",
      price: 299.99,
      discount: 8,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThRb113rvIRXBflpZ1mCuRd15K-rMfgjTIJg&s"
    },
    {
      id: 19,
      name: "Armadio Scorrevole",
      description: "Armadio con ante scorrevoli e specchi integrati.",
      price: 899.99,
      discount: 15,
      image: "https://www.zgmobili.com/wp-content/uploads/11_02_armadio_scorrevole.jpg"
    },
    {
      id: 20,
      name: "Scarpiera Salvaspazio",
      description: "Scarpiera verticale con ripiani regolabili.",
      price: 159.99,
      discount: 10,
      image: "data:image/jpeg;base64,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"
    }
  ];
  

  

export default function ProdottiPage() {
  return (
    <>
       <div className="product-list">
            <h1>Lista Prodotti</h1>
            <div className="product-grid">
                {products.map(product => (
                  <div className="product-card" key={product.id}>
                    <Link to={`/prodotti/${product.id}`}>
                      <ProductCard product={product} />                       
                    </Link>
                  </div>
                ))}
            </div>
        </div>
    </>
);
}