// Importa React e l'hook useState per gestire lo stato locale del componente
import React, { useState } from 'react';
// Importa gli stili CSS specifici per la pagina di pagamento
import "../components-CSS/PagamentoCSS.css";
// Importa il contesto globale dell'applicazione che contiene lo stato condiviso
import GlobalContext from '../cotext/GlobalContest';
// Importa l'hook useContext per accedere al contesto globale
import { useContext } from "react";
// Importa useNavigate per la navigazione programmatica tra le pagine
import { useNavigate } from "react-router-dom";

// Componente principale della pagina di pagamento
function PagamentoPage() {
    // Estrae le funzioni e i valori necessari dal contesto globale
    const { createOrder, finalTotal, cart } = useContext(GlobalContext);
    // Inizializza il hook per la navigazione
    const navigate = useNavigate();

    // Stato iniziale del form con tutti i campi necessari
    const [formData, setFormData] = useState({
        name: '',             // Nome del cliente
        surname: '',          // Cognome del cliente
        email: '',           // Email del cliente
        tax_id_code: '',     // Codice fiscale
        address: '',         // Indirizzo di spedizione
        phone_number: '',    // Numero di telefono
        total_price: finalTotal, // Prezzo totale dell'ordine
    });

    // Stato per gestire i messaggi di feedback all'utente
    const [message, setMessage] = useState('');

    // Gestore degli eventi per l'aggiornamento dei campi del form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Funzione per inviare l'email di conferma
    const sendEmail = async (email) => {
        try {
            const emailData = {
                email: String(email),
                orderDetails: {
                    products: cart.map(item => ({
                        name: String(item.name),
                        quantity: Number(item.quantity),
                        price: Number(item.price)
                    })),
                    total_price: Number(finalTotal)
                }
            };

            const response = await fetch('http://localhost:3000/api/confirm-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Errore durante l\'invio dell\'email:', errorText);
                setMessage('Errore durante l\'invio dell\'email.');
                return;
            }

            let data;
            try {
                data = await response.json();
                setMessage(data.message || 'Email inviata con successo!');
            } catch (error) {
                console.error('La risposta non è un JSON valido:', error);
                setMessage('Errore: La risposta del server non è valida.');
                return;
            }
        } catch (error) {
            console.error('Errore di rete:', error);
            setMessage('Errore di rete durante l\'invio dell\'email.');
        }
    };

    // Gestore dell'invio del form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Genera dinamicamente i dettagli dei prodotti dal carrello
        const products = cart.map((item) => ({
            name: item.name,       // Nome del prodotto
            quantity: item.quantity, // Quantità del prodotto
            price: item.price      // Prezzo unitario del prodotto
        }));

        // Combina i dati del form con i dettagli dei prodotti
        const orderData = {
            ...formData,
            products, // Aggiungi i dettagli dei prodotti
        };

        console.log('Dati inviati al server:', orderData);

        try {
            // Crea l'ordine e invia l'email di conferma
            const result = await createOrder(orderData);
            console.log('Risposta del server:', result);
            setMessage(`Ordine creato con successo! ID: ${result.id}`);
            await sendEmail(formData.email);
            navigate("/conferma-ordine");
        } catch (error) {
            // Gestione degli errori durante la creazione dell'ordine
            console.error('Errore durante la creazione dell\'ordine:', error);
            setMessage('Impossibile creare l\'ordine. Riprova.');
        }
    };

    // Rendering del componente
    return (
        // Contenitore principale della pagina di pagamento
        <div className="payment-container">
            <h2 className="payment-title">Conferma Pagamento</h2>
            {/* Form per l'inserimento dei dati di pagamento */}
            <form className="payment-form" onSubmit={handleSubmit}>
                {/* Gruppo di input per nome e cognome */}
                <div className="input-group">
                    <input
                        className="payment-input"
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="payment-input"
                        type="text"
                        name="surname"
                        placeholder="Cognome"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Input per email */}
                <input
                    className="payment-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {/* Input per codice fiscale */}
                <input
                    className="payment-input"
                    type="text"
                    name="tax_id_code"
                    placeholder="Codice Fiscale"
                    value={formData.tax_id_code}
                    onChange={handleChange}
                    required
                />
                {/* Input per indirizzo */}
                <input
                    className="payment-input"
                    type="text"
                    name="address"
                    placeholder="Indirizzo"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                {/* Input per numero di telefono */}
                <input
                    className="payment-input"
                    type="text"
                    name="phone_number"
                    placeholder="Numero di Telefono"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                />
                {/* Visualizzazione del prezzo totale */}
                <p>Totale da pagare: €{finalTotal.toFixed(2)}</p>
                {/* Pulsante di conferma pagamento */}
                <button className="payment-button" type="submit">Conferma pagamento</button>
                {/* Visualizzazione dei messaggi di feedback */}
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

// Esporta il componente per utilizzarlo in altre parti dell'applicazione
export default PagamentoPage;
