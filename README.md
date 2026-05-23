# Posh & Pret — React Website

A modern, fully responsive React storefront for Posh & Pret.

## Project Structure

```
posh-and-pret/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js / .css
│   │   ├── Hero.js / .css
│   │   ├── Products.js / .css      ← Add product images here
│   │   ├── AboutContact.js / .css
│   │   ├── Cart.js / .css
│   │   ├── Footer.js / .css
│   │   └── Toast.js / .css
│   ├── App.js / App.css
│   ├── index.js
│   └── index.css
├── vercel.json
└── package.json
```

## Adding Your Product Images

Place your product images in the `public/products/` folder:

```
public/
└── products/
    ├── mini_1.jpeg
    ├── peach_1.jpeg
    ├── peach_2.jpeg
    ├── colorful.jpeg
    ├── tara_blue.jpeg
    └── tara_pink.jpeg
```

The images are referenced in `src/components/Products.js` in the `PRODUCTS` array.

## Running Locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel (Free)

### Option 1 — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects Create React App — click **Deploy**
5. Done! Your site is live.

## Customising Products

Edit the `PRODUCTS` array in `src/components/Products.js`:

```js
{
  id: 6,                             // unique number
  images: ['products/my-dress.jpg'], // or array for multiple photos
  name: 'Short Display Name',
  fullName: 'Full Name With Color',
  description: 'Product description here',
  price: 2500,                       // in PKR, number only
  tag: 'New',                        // or '' for no tag
}
```

## Google Form Orders

The Google Form submission is handled in `src/components/Cart.js`.
The form URL and field IDs are at the top of that file — update them if you
ever regenerate the Google Form.

```js
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/.../formResponse';
const FIELDS = {
  name: 'entry.1884265043',
  phone: 'entry.1837901979',
  ...
};
```
