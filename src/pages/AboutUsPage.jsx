import "../components-CSS/AboutpageCSS.css"

export default function AboutUsPage() {
    return (
        <>
            <div className="container-about">

                {/* Chi siamo */}

                <div className="about-img relative">
                    <img src="../pexels-ingo-631411.jpg" alt="" />
                    <div className="aboutUs">
                        <h1>CHI SIAMO</h1>
                    </div>
                </div>

                {/* Hygge text */}
                <div className="about-hygge">
                    <h2>Hygge</h2>
                    <p>Hygge è un sostantivo delle lingue danese e norvegese impiegato per definire un sentimento, un'atmosfera sociale, un'azione correlata al senso di comodità, sicurezza, accoglienza e familiarità. Esprime un concetto analogo a quello della parola svedese mys e della parola tedesca Gemütlichkeit.
                        Il concetto di hygge non ha come fine la ricerca di una felicità momentanea, bensì di una felicità quotidiana, che contribuisce a generare un senso di appagamento nel lungo periodo.</p>
                </div>

                {/* Hygge img - About */}
                <div className="about-box">
                    <div className="about-img">
                        <img src='..\hygge_significato_prodotti_skincare_nordica-scaled.webp' alt="" />
                    </div>
                    <div className="about-text">
                        <h1>About</h1>
                        <h2>Il comfort e lo stile che rendono la tua casa un rifugio</h2>
                        <p>Benvenuti in Hygge, il vostro punto di riferimento online per mobili e complementi d'arredo che trasformano la vostra casa in un'oasi di comfort e stile. Ispirati alla filosofia danese dell'hygge, crediamo che la casa debba essere un luogo di benessere, calore e convivialità.</p>
                        <p>Offriamo una selezione curata di mobili di alta qualità, realizzati con materiali pregiati e un design elegante e funzionale. Ci impegniamo a ridurre il nostro impatto ambientale, utilizzando materiali sostenibili e processi di produzione responsabili. La vostra soddisfazione è la nostra priorità. Offriamo un servizio clienti eccellente, dalla consulenza all'assistenza post-vendita.</p>
                        <p>Esplorate il nostro vasto catalogo online e trovate i mobili perfetti per la vostra casa. Iniziate oggi a creare la casa dei vostri sogni, un luogo accogliente e confortevole dove sentirvi sempre a vostro agio.</p>
                    </div>
                </div>
            </div >
        </>
    );
}