import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import { About, Contact } from './components/AboutContact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Toast from './components/Toast';
import './App.css';

const STORAGE_KEY = 'poshAndPretCart';

function loadCart() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function App() {
  const [cartItems, setCartItems] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(null);
    setTimeout(() => setToast(msg), 10);
  };

  const updateItems = (newItems) => {
    setCartItems(newItems);
    saveCart(newItems);
  };

  const handleAddToCart = useCallback((product, size) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      let next;
      if (existing) {
        next = prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        next = [...prev, { id: product.id, name: product.fullName, price: product.price, quantity: 1, size }];
      }
      saveCart(next);
      return next;
    });
    showToast('Added to cart');
  }, []);

  const handleUpdateQty = useCallback((id, size, qty) => {
    if (qty <= 0) {
      handleRemove(id, size);
      return;
    }
    setCartItems((prev) => {
      const next = prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity: qty } : i));
      saveCart(next);
      return next;
    });
  }, []);

  const handleRemove = useCallback((id, size) => {
    setCartItems((prev) => {
      const next = prev.filter((i) => !(i.id === id && i.size === size));
      saveCart(next);
      return next;
    });
    showToast('Item removed');
  }, []);

  const handleClear = useCallback(() => {
    updateItems([]);
  }, []);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main>
        <Hero />
        <Products onAddToCart={handleAddToCart} />
        <About />
        <Contact />
      </main>

      <Footer />

      <Cart
        items={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClear={handleClear}
      />

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/923334268985"
        className="whatsapp-fab"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}
