import React, { useState, useEffect } from 'react';
import './Cart.css';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdzxKRkzU7kcg-rJRYPkk7pSfgUz9M4OckheSvq8PIg4gTcXw/formResponse';

const FIELDS = {
  name: 'entry.1884265043',
  phone: 'entry.1837901979',
  address: 'entry.340016652',
  paymentMethod: 'entry.525401998',
  orderDetails: 'entry.79170173',
  total: 'entry.308287936',
};

export default function Cart({ items, onUpdateQty, onRemove, onClear, isOpen, onClose }) {
  const [step, setStep] = useState('cart'); // 'cart' | 'form' | 'confirmed'
  const [form, setForm] = useState({ name: '', phone: '', address: '', paymentMethod: 'cash' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) setStep('cart');
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitOrder = () => {
    if (!validate()) return;

    const orderDetails = items
      .map((item) => `${item.name} (Size ${item.size}) x${item.quantity} = PKR ${(item.price * item.quantity).toLocaleString()}`)
      .join('\n');

    // Submit to Google Form via hidden iframe
    const iframe = document.getElementById('gform-iframe');
    const formEl = document.getElementById('gform-hidden');
    formEl.action = GOOGLE_FORM_URL;
    formEl.querySelector(`[name="${FIELDS.name}"]`).value = form.name;
    formEl.querySelector(`[name="${FIELDS.phone}"]`).value = form.phone;
    formEl.querySelector(`[name="${FIELDS.address}"]`).value = form.address;
    formEl.querySelector(`[name="${FIELDS.paymentMethod}"]`).value = form.paymentMethod;
    formEl.querySelector(`[name="${FIELDS.orderDetails}"]`).value = orderDetails;
    formEl.querySelector(`[name="${FIELDS.total}"]`).value = `PKR ${total.toLocaleString()}`;
    formEl.submit();

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('poshAndPretOrders') || '[]');
    existing.push({ createdAt: new Date().toISOString(), ...form, items, total });
    localStorage.setItem('poshAndPretOrders', JSON.stringify(existing));

    onClear();
    setStep('confirmed');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Hidden Google Form */}
      <div style={{ display: 'none' }}>
        <iframe name="gform-iframe" id="gform-iframe" title="order-submit"></iframe>
        <form id="gform-hidden" method="POST" target="gform-iframe">
          {Object.values(FIELDS).map((fieldName) => (
            <input key={fieldName} type="hidden" name={fieldName} />
          ))}
        </form>
      </div>

      <div className="cart-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="cart-drawer">
          {/* Header */}
          <div className="cart-header">
            <div>
              <h2 className="cart-heading">
                {step === 'cart' ? 'Your Cart' : step === 'form' ? 'Order Details' : 'Order Confirmed'}
              </h2>
              {step === 'cart' && items.length > 0 && (
                <p className="cart-subheading">{items.reduce((s, i) => s + i.quantity, 0)} item(s)</p>
              )}
            </div>
            <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="cart-body">
            {/* ── CART STEP ── */}
            {step === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="cart-empty">
                    <i className="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                    <button className="btn-outline" onClick={onClose}>Continue Shopping</button>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="cart-item">
                          <div className="cart-item-info">
                            <p className="cart-item-name">{item.name}</p>
                            <p className="cart-item-meta">Size: {item.size}</p>
                            <p className="cart-item-price">PKR {item.price.toLocaleString()}</p>
                          </div>
                          <div className="cart-item-controls">
                            <div className="qty-control">
                              <button onClick={() => onUpdateQty(item.id, item.size, item.quantity - 1)}>−</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => onUpdateQty(item.id, item.size, item.quantity + 1)}>+</button>
                            </div>
                            <button
                              className="remove-btn"
                              onClick={() => onRemove(item.id, item.size)}
                              aria-label="Remove item"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                          <p className="cart-item-subtotal">
                            PKR {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="cart-total-row">
                      <span>Total</span>
                      <span className="cart-total-amount">PKR {total.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </>
            )}

            {/* ── ORDER FORM STEP ── */}
            {step === 'form' && (
              <div className="order-form">
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+92 3xx xxx xxxx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>

                <div className="form-field">
                  <label>Delivery Address</label>
                  <textarea
                    placeholder="Full delivery address"
                    rows={3}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>

                <div className="form-field">
                  <label>Payment Method</label>
                  <select
                    value={form.paymentMethod}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  >
                    <option value="cash">Cash on Delivery</option>
                    <option value="bank">Online Bank Transfer</option>
                  </select>
                </div>

                <div className="payment-note">
                  <i className="fas fa-info-circle"></i>
                  {form.paymentMethod === 'bank' ? (
                    <span>
                      For bank transfer, contact us on{' '}
                      <a href="https://wa.me/923334268985" target="_blank" rel="noreferrer">
                        WhatsApp: +92 333 4268985
                      </a>
                      . Meezan Bank details will be shared.
                    </span>
                  ) : (
                    <span>Payment collected on delivery.</span>
                  )}
                </div>

                <div className="order-summary-mini">
                  <p>Order Total: <strong>PKR {total.toLocaleString()}</strong></p>
                  <p>{items.reduce((s, i) => s + i.quantity, 0)} items</p>
                </div>
              </div>
            )}

            {/* ── CONFIRMED STEP ── */}
            {step === 'confirmed' && (
              <div className="order-confirmed">
                <div className="confirmed-icon">
                  <i className="fas fa-check"></i>
                </div>
                <h3>Order Received!</h3>
                <p>Thank you, <strong>{form.name}</strong>! We'll contact you shortly on <strong>{form.phone}</strong> to confirm your order.</p>
                <p className="confirmed-note">
                  For order updates contact us at{' '}
                  <a href="mailto:poshNpret@gmail.com">poshNpret@gmail.com</a> or WhatsApp.
                </p>
                <button className="btn-primary-cart" onClick={onClose}>Continue Shopping</button>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="cart-footer">
            {step === 'cart' && items.length > 0 && (
              <>
                <button className="btn-outline-small" onClick={onClear}>Clear Cart</button>
                <button className="btn-primary-cart" onClick={() => setStep('form')}>
                  Place Order
                  <i className="fas fa-arrow-right"></i>
                </button>
              </>
            )}
            {step === 'form' && (
              <>
                <button className="btn-outline-small" onClick={() => setStep('cart')}>
                  <i className="fas fa-arrow-left"></i> Back
                </button>
                <button className="btn-primary-cart" onClick={submitOrder}>
                  Confirm Order <i className="fas fa-check"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
