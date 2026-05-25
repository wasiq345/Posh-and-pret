import React, { useState, useEffect, useRef } from 'react';
import './Products.css';

const PRODUCTS = [
  {
    id: 1,
    images: ['products/mini_1.jpeg'],
    name: 'Chiffon Shirt & Banarsi Shahi Patiala',
    fullName: 'Chiffon Shirt & Banarsi Shahi Patiala (Muted Green)',
    description: 'Chiffon Shirt & Banarsi Shahi Patiala with golden lace work',
    price: 2500,
    originalPrice: 3800,
    priceLarge: 3000,
    tag: 'Bestseller',
  },
  {
    id: 2,
    images: ['products/peach_2.jpeg', 'products/peach_1.jpeg'],
    name: 'Chiffon Gharara & Shirt',
    fullName: 'Chiffon Gharara & Shirt (Muted Peach)',
    description: 'Chiffon Gharara & Shirt with lining & silver embroidery along with silver stone handwork',
    price: 3000,
    originalPrice: 4500,
    priceLarge: 3500,
    tag: 'New',
  },
  {
    id: 3,
    images: ['products/colorful.jpeg'],
    name: 'Soft RawSilk Lehnga Choli',
    fullName: 'Soft RawSilk Lehnga Choli',
    description: 'Soft RawSilk lenga choli with golden gota mirror embroidery along with fancy lace',
    price: 3000,
    originalPrice: 4500,
    priceLarge: 4000, //5000
    priceXL: 5000, 
    sizes: ['18','20','22','24','26','28','30','32','34','36','38'],
    tag: '',
  },
  {
    id: 4,
    images: ['products/tara_blue.jpeg'],
    name: 'Chiffon Gharara & Shirt',
    fullName: 'Chiffon Gharara & Shirt (Navy Blue)',
    description: 'Chiffon Gharara & Shirt with lining & silver embroidery along with silver stone handwork',
    price: 3000,
    originalPrice: 4500,
    priceLarge: 3500,
    tag: '',
  },
  {
    id: 5,
    images: ['products/tara_pink.jpeg'],
    name: 'Chiffon Gharara & Shirt',
    fullName: 'Chiffon Gharara & Shirt (Fuchsia Pink)',
    description: 'Chiffon Gharara & Shirt with lining & silver embroidery along with silver stone handwork',
    price: 3000,
    originalPrice: 4500,
    priceLarge: 3500,
    tag: 'Popular',
  },
  {
    id: 6,
    images: ['products/heer_1.jpeg'],
    name: 'Satin Silk Kurti & Shamoz Silk Lacha',
    fullName: 'Satin Silk Kurti & Shamoz Silk Lacha (Hot pink & navy Blue)',
    description: 'Satin Silk Kurti & Shamoz Silk Lacha stitched with golden Indian lace gota & dori tassels',
    price: 2000,
    originalPrice: 3500,
    priceLarge: 2500,
    priceXL: 3000,
    sizes: ['14','16','18','20','22','24','26','30','32','34'], // small = 2000, medium = 2500, large = 3000
     sizeTiers: {
    small:  ['14','16','18'],   // uses price
    medium: ['20','22','24','26'],                  // uses priceLarge
    large:  ['30','32','34'],             // uses priceXL
    },
    tag: 'New',
  },
  {
    id: 7,
    images: ['products/heer_2.jpeg'],
    name: 'Satin Silk Kurti & Shamoz Silk Lacha',
    fullName: 'Satin Silk Kurti & Shamoz Silk Lacha (Ruby red & Emerald Green)',
    description: 'Satin Silk Kurti & Shamoz Silk Lacha stitched with golden Indian lace gota & dori tassels',
    price: 2000,
    originalPrice: 3500,
    priceLarge: 2500,
    priceXL: 3000,
    sizes: ['14','16','18','20','22','24','26','30','32','34'], // small = 2000, medium = 2500, large = 3000
    sizeTiers: {
    small:  ['14','16','18'],   // uses price
    medium: ['20','22','24','26'],                  // uses priceLarge
    large:  ['30','32','34'],             // uses priceXL
  },
    tag: 'New',
  },
];

function ProductCard({ product, onOpen }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`product-card ${visible ? 'visible' : ''}`}
      onClick={() => onOpen(product)}
    >
      <div className="product-image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x520/f0ebe4/8a7e74?text=Image'; }}
        />
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <div className="product-hover-overlay">
          <span>View Details</span>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <p className="product-price">
        {product.originalPrice && (
          <span className="price-original">PKR {product.originalPrice.toLocaleString()}</span>
        )}
        <span className={product.originalPrice ? 'price-sale' : ''}>
          PKR {product.price.toLocaleString()}
        </span>
      </p>
      </div>
    </div>
  );
}

export default function Products({ onAddToCart }) {
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [size, setSize] = useState('');
const [sizeError, setSizeError] = useState(false);

const tiers = modalProduct?.sizeTiers || {
  small:  ['18','20','22','24'],
  medium: ['26','28','30','32'],
  large:  ['34','36','38'],
};

const activePrice = size && tiers.large?.includes(size) && modalProduct?.priceXL
  ? modalProduct.priceXL
  : size && tiers.medium?.includes(size) && modalProduct?.priceLarge
  ? modalProduct.priceLarge
  : modalProduct?.price;

const priceSizeLabel = size
  ? tiers.large?.includes(size)  ? `(Size ${tiers.large[0]}–${tiers.large[tiers.large.length-1]})`
  : tiers.medium?.includes(size) ? `(Size ${tiers.medium[0]}–${tiers.medium[tiers.medium.length-1]})`
  : `(Size ${tiers.small[0]}–${tiers.small[tiers.small.length-1]})`
  : '';

  const openModal = (product) => {
    setModalProduct(product);
    setSelectedImg(0);
    setSize('');
    setSizeError(false);
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  const handleAddToCart = () => {
  if (!size) { setSizeError(true); return; }
  onAddToCart({ ...modalProduct, price: activePrice }, size);
  closeModal();
};

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalProduct ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalProduct]);

  return (
    <>
      <section id="products" className="products-section">
        <div className="products-container">
          <div className="section-header">
            <p className="section-eyebrow">Curated For You</p>
            <h2 className="section-title">Our Collection</h2>
            <div className="section-divider"><span></span></div>
          </div>
          <div className="product-grid">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalProduct && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal-box">
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              <i className="fas fa-times"></i>
            </button>

            <div className="modal-inner">
              <div className="modal-media">
                <div className="modal-main-img">
                  <img
                    src={modalProduct.images[selectedImg]}
                    alt={modalProduct.fullName}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x520/f0ebe4/8a7e74?text=Image'; }}
                  />
                </div>
                {modalProduct.images.length > 1 && (
                  <div className="modal-thumbs">
                    {modalProduct.images.map((img, i) => (
                      <button
                        key={i}
                        className={`modal-thumb ${i === selectedImg ? 'active' : ''}`}
                        onClick={() => setSelectedImg(i)}
                      >
                        <img src={img} alt={`View ${i + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-details">
                <h2 className="modal-title">{modalProduct.fullName}</h2>
                <p className="modal-price">
                {modalProduct.originalPrice && (
                  <span className="price-original">PKR {modalProduct.originalPrice.toLocaleString()}</span>
                )}
                <span className={modalProduct.originalPrice ? 'price-sale' : ''}>
                  PKR {(activePrice || modalProduct.price).toLocaleString()}
                </span>
                {size && (
              <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>
                {priceSizeLabel}
              </span>
              )}
              </p>
                <p className="modal-desc">{modalProduct.description}</p>

                <div className="modal-size-section">
                  <label className="size-label">
                    Select Size <span className="size-required">*</span>
                  </label>
                  <div className="size-grid">
                    {(modalProduct.sizes || ['18','20','22','24','26','28','30','32']).map((s) => (
                      <button
                        key={s}
                        className={`size-btn ${size === s ? 'active' : ''}`}
                        onClick={() => { setSize(s); setSizeError(false); }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizeError && <p className="size-error">Please select a size</p>}
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <i className="fas fa-shopping-bag"></i>
                  Add to Cart
                </button>

                <p className="modal-note">
                  <i className="fas fa-shield-alt"></i>
                  Handcrafted with care · Free delivery across Lahore
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
