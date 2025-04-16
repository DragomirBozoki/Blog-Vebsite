import React, { useState } from 'react';
import './FloatingNewsletter.css';
import { FaCheck } from 'react-icons/fa';

const BASE_URL = 'https://sofia-backend-9l77.onrender.com';

export default function FloatingNewsletter() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email.includes('@')) return;

    try {
      const res = await fetch(`${BASE_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        setTimeout(() => {
          setIsOpen(false);
          setSubscribed(false);
          setEmail('');
        }, 2000);
      }
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  return (
    <>
      <div className="floating-newsletter-button" onClick={() => setIsOpen(true)}>
        Join Newsletter
      </div>

      {isOpen && (
        <div className="newsletter-popup fade-in">
          {!subscribed ? (
            <>
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubscribe}>
                <FaCheck size={14} />
              </button>
              <span className="close-x" onClick={() => setIsOpen(false)}>×</span>
            </>
          ) : (
            <div className="subscribed-message">You're in! 💌</div>
          )}
        </div>
      )}
    </>
  );
}
