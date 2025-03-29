import React, { useState } from 'react';
import "../components-CSS/PagamentoCSS.css";
import GlobalContext from '../cotext/GlobalContest';
import { useContext } from "react";

function PagamentoPage() {
    const { createOrder, finalTotal } = useContext(GlobalContext);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        tax_id_code: '',
        address: '',
        phone_number: '',
        total_price: finalTotal, // Imposta il valore fisso
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = async (email) => {
        try {
            const response = await fetch('http://localhost:3000/api/confirm-order', { // Modifica l'URL con quello del tuo backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Leggi la risposta come testo
                console.error('Errore durante l\'invio dell\'email:', errorText);
                setMessage('Errore durante l\'invio dell\'email.');
                return;
            }

            let data;
            try {
                data = await response.json(); // Prova a parsare la risposta come JSON
            } catch (error) {
                console.error('La risposta non è un JSON valido:', error);
                setMessage('Errore: La risposta del server non è valida. Controlla il backend.');
                return;
            }

            console.log('Email inviata con successo:', data);
            setMessage(data.message || 'Email inviata con successo!');
        } catch (error) {
            console.error('Errore di rete:', error);
            setMessage('Errore di rete durante l\'invio dell\'email.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Dati inviati al server:', formData); // Log dei dati inviati
        try {
            const result = await createOrder(formData);
            console.log('Risposta del server:', result); // Log della risposta del server
            setMessage(`Order created successfully! ID: ${result.id}`);
            await sendEmail(formData.email); // Invia l'email dopo aver creato l'ordine
        } catch (error) {
            console.error('Errore durante la creazione dell\'ordine:', error); // Log dell'errore
            setMessage('Failed to create order. Please try again.');
        }
    };

    return (
        <div className="payment-container">
            <h2 className="payment-title">Conferma Pagamento</h2>
            <form className="payment-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        className="payment-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="payment-input"
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input
                    className="payment-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="payment-input"
                    type="text"
                    name="tax_id_code"
                    placeholder="Tax ID Code"
                    value={formData.tax_id_code}
                    onChange={handleChange}
                    required
                />
                <input
                    className="payment-input"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    className="payment-input"
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                />
                <p>Total Price: €{finalTotal.toFixed(2)}</p> {/* Mostra il prezzo totale */}
                <button className="payment-button" type="submit">Conferma pagamento</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default PagamentoPage;
