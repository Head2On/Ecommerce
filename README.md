# Ecommerce Full Stack Project

This is a full stack Ecommerce web application built with Next.js (React) for the frontend and Django for the backend. It features a modern shopping experience, cart management, Stripe payments, and an admin panel for product management.

## Features
- Product listing and details
- Add to cart, update quantity, and remove items
- Persistent cart state
- Stripe Checkout integration for secure payments
- Responsive design
- Admin panel (Django) for managing products, banners, and orders

## Tech Stack
- **Frontend:** Next.js, React, CSS Modules
- **Backend:** Django, Django REST Framework
- **Database:** SQLite (default, can be changed)
- **Payments:** Stripe

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- Python 3.10+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Head2On/Ecommerce.git
cd Ecommerce
```

### 2. Backend Setup (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

- The backend will run at `http://127.0.0.1:8000/` by default.

### 3. Frontend Setup (Next.js)
```bash
cd ../ecommerce
npm install
npm run dev
```
- The frontend will run at `http://localhost:3000/` by default.

### 4. Environment Variables
Create a `.env` file in the `ecommerce` directory with your Stripe keys:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 5. Stripe Setup
- Create a [Stripe account](https://dashboard.stripe.com/)
- Add your test keys to the `.env` file
- (Optional) Set up shipping rates in your Stripe Dashboard if needed

## Project Structure
```
Ecommerce/
├── backend/           # Django backend
├── ecommerce/         # Next.js frontend
│   ├── components/    # React components
│   ├── context/       # React context (cart, state)
│   ├── lib/           # Stripe and utility functions
│   ├── pages/         # Next.js pages and API routes
│   ├── public/        # Static assets
│   └── styles/        # CSS Modules and global styles
└── README.md
```

## Deployment
- You can deploy the frontend to Vercel, Netlify, or any Node.js host.
- The backend can be deployed to Heroku, Render, or any Python host.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---

**Made with ❤️ by Head2On**
