// Importa il file CSS che contiene tutti gli stili specifici per la pagina About Us
import "../components-CSS/AboutpageCSS.css"

// Definizione del componente principale della pagina About Us
export default function AboutUsPage() {
    // Renderizza la struttura della pagina
    return (
        // Fragment per raggruppare elementi senza creare un nodo DOM aggiuntivo
        <>
            {/* Contenitore principale che avvolge tutto il contenuto della pagina */}
            <div className="container-about">

                {/* Sezione "Chi siamo" con immagine di sfondo e titolo principale */}
                <div className="about-img relative">
                    {/* Immagine di sfondo della prima sezione */}
                    <img src="../pexels-ingo-631411.jpg" alt="Immagine rappresentativa Chi Siamo" />
                    {/* Contenitore del titolo principale sovrapposto all'immagine */}
                    <div className="aboutUs">
                        <h1>CHI SIAMO</h1>
                    </div>
                </div>

                {/* Sezione dedicata alla spiegazione del concetto di Hygge */}
                <div className="about-hygge">
                    {/* Titolo della sezione Hygge */}
                    <h2>Hygge</h2>
                    {/* Paragrafo che spiega il significato e l'importanza del concetto di Hygge */}
                    <p>Hygge è un sostantivo delle lingue danese e norvegese impiegato per definire
                        un sentimento, un'atmosfera sociale, un'azione correlata al senso di comodità,
                        sicurezza, accoglienza e familiarità. Esprime un concetto analogo a quello
                        della parola svedese mys e della parola tedesca Gemütlichkeit.
                        Il concetto di hygge non ha come fine la ricerca di una felicità momentanea,
                        bensì di una felicità quotidiana, che contribuisce a generare un senso di
                        appagamento nel lungo periodo.</p>
                </div>

                {/* Sezione About con immagine illustrativa e testo descrittivo */}
                <div className="about-box">
                    {/* Contenitore dell'immagine illustrativa */}
                    <div className="about-img">
                        <img src='..\hygge_significato_prodotti_skincare_nordica-scaled.webp'
                            alt="Immagine illustrativa del concept Hygge" />
                    </div>
                    {/* Contenitore del testo descrittivo aziendale */}
                    <div className="about-text">
                        {/* Titolo della sezione About */}
                        <h1>About</h1>
                        {/* Sottotitolo che esprime la mission aziendale */}
                        <h2>Il comfort e lo stile che rendono la tua casa un rifugio</h2>
                        {/* Primo paragrafo: introduzione all'azienda e alla sua filosofia */}
                        <p>Benvenuti in Hygge, il vostro punto di riferimento online per mobili e
                            complementi d'arredo che trasformano la vostra casa in un'oasi di comfort
                            e stile. Ispirati alla filosofia danese dell'hygge, crediamo che la casa
                            debba essere un luogo di benessere, calore e convivialità.</p>
                        {/* Secondo paragrafo: dettagli sulla qualità e sostenibilità */}
                        <p>Offriamo una selezione curata di mobili di alta qualità, realizzati con
                            materiali pregiati e un design elegante e funzionale. Ci impegniamo a
                            ridurre il nostro impatto ambientale, utilizzando materiali sostenibili
                            e processi di produzione responsabili. La vostra soddisfazione è la nostra
                            priorità. Offriamo un servizio clienti eccellente, dalla consulenza
                            all'assistenza post-vendita.</p>
                        {/* Terzo paragrafo: call to action per i visitatori */}
                        <p>Esplorate il nostro vasto catalogo online e trovate i mobili perfetti per
                            la vostra casa. Iniziate oggi a creare la casa dei vostri sogni, un luogo
                            accogliente e confortevole dove sentirvi sempre a vostro agio.</p>
                    </div>
                </div>
            </div>
        </>
    );
}