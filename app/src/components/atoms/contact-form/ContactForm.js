import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de traitement du formulaire ici
    };

    return (
        <div className='contact-form-container'>
            <h1>Nous contacter</h1>
            <h4>                
            <strong>Nous sommes là pour vous aider !</strong><br/>
            Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible. 
            </h4>
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className='contact-input-container'>
                    <label htmlFor="name">Nom prénom</label>
                    <input
                        placeholder='Entrez votre nom complet'
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div  className='contact-input-container'>
                    <label htmlFor="email">Email</label>
                    <input
                        placeholder='Saisissez votre adresse email'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div  className='contact-input-container'>
                    <label htmlFor="subject">Sujet</label>
                    <input
                        placeholder='Indiquez le sujet de votre message'
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div  className='contact-input-container'>
                    <label htmlFor="message">Message</label>
                    <textarea
                        placeholder='Exprimez-vous, nous sommes à votre écoute'
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default ContactForm;