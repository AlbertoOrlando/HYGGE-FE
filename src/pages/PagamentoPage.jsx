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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Dati inviati al server:', formData); // Log dei dati inviati
        try {
            const result = await createOrder(formData);
            console.log('Risposta del server:', result); // Log della risposta del server
            setMessage(`Order created successfully! ID: ${result.id}`);
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
