# ✈️ TravelEase - Travel Booking Management System
### MERN Stack Final Project | 6th Semester

---

## 📁 Complete Folder Structure

```
travel-mern-project/
│
├── backend/                        ← Node.js + Express Backend
│   ├── server.js                   ← Main server entry point
│   ├── .env                        ← Environment variables (MongoDB URI, JWT Secret)
│   ├── package.json                ← Backend dependencies
│   ├── config/
│   │   └── db.js                   ← MongoDB connection setup
│   ├── models/
│   │   ├── User.js                 ← User schema (name, email, password, role)
│   │   └── Booking.js              ← Booking schema (destination, date, persons, price)
│   ├── routes/
│   │   ├── authRoutes.js           ← /api/auth/register, /api/auth/login
│   │   └── bookingRoutes.js        ← /api/bookings (CRUD)
│   └── controllers/
│       ├── authController.js       ← Register and Login logic
│       └── bookingController.js    ← Create, Read, Delete bookings
│
└── frontend/                       ← React.js Frontend
    ├── public/
    │   └── index.html              ← HTML template with Bootstrap CDN
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           ← Navigation bar with login/logout
    │   │   ├── Slider.jsx           ← Bootstrap image carousel
    │   │   ├── DestinationCards.jsx ← Destination card grid
    │   │   └── Chatbot.jsx          ← Floating FAQ chatbot
    │   ├── pages/
    │   │   ├── Home.jsx             ← Landing page with all sections
    │   │   ├── About.jsx            ← About us, team, mission
    │   │   ├── Contact.jsx          ← Contact form and info
    │   │   ├── Destinations.jsx     ← Filterable destinations list
    │   │   ├── Booking.jsx          ← Booking form (connected to API)
    │   │   ├── Confirmation.jsx     ← Booking success page
    │   │   ├── Login.jsx            ← User login (JWT)
    │   │   ├── Register.jsx         ← User registration
    │   │   ├── AdminDashboard.jsx   ← Admin panel (all bookings)
    │   │   └── BookingHistory.jsx   ← User's own booking history
    │   ├── App.js                   ← React Router setup
    │   ├── App.css                  ← Global custom styles
    │   └── index.js                 ← React entry point
    ├── package.json                 ← Frontend dependencies
    └── README.md                    ← This file
```

---

## ⚙️ Installation Steps

### Step 1: Clone / Download the Project
```
Download the project and open terminal in the root folder: travel-mern-project/
```

---

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```
📌 **What this does:** Downloads all Node.js packages (Express, Mongoose, JWT, bcryptjs, etc.)

---

### Step 3: Configure MongoDB
Open `backend/.env` and update:
```env
MONGO_URI=mongodb://localhost:27017/travelDB
JWT_SECRET=travel_secret_key_2024
PORT=5000
```
> 💡 If using MongoDB Atlas (cloud), replace MONGO_URI with your Atlas connection string.

---

### Step 4: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```
📌 **What this does:** Downloads React, Axios, React Router, and all frontend packages.

---

## ▶️ Run Commands

### Terminal 1 — Start Backend
```bash
cd backend
npm run dev
```
📌 **What this does:** Starts the Express server with Nodemon (auto-restarts on file changes) on **http://localhost:5000**

### Terminal 2 — Start Frontend
```bash
cd frontend
npm start
```
📌 **What this does:** Starts the React development server on **http://localhost:3000**

> ✅ Both servers must run simultaneously!

---

## 🔌 API Endpoints Reference

| Method | Endpoint              | Description                      | Auth Required |
|--------|-----------------------|----------------------------------|---------------|
| POST   | /api/auth/register    | Register new user                | No            |
| POST   | /api/auth/login       | Login and get JWT token          | No            |
| POST   | /api/bookings         | Create new booking               | Yes (JWT)     |
| GET    | /api/bookings/my      | Get current user's bookings      | Yes (JWT)     |
| GET    | /api/bookings/all     | Get ALL bookings (admin only)    | Yes + Admin   |
| DELETE | /api/bookings/:id     | Delete a booking by ID           | Yes (JWT)     |

---

## 👤 Default Admin Account
Register a new account from the Register page and select **Admin** role.
Or seed manually with:
- Email: admin@travel.com
- Password: admin123
- Role: admin

---

## 📖 Short Project Abstract (For Report)

**TravelEase** is a full-stack Travel Booking Management System developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system allows users to browse travel destinations, make bookings, and view their booking history. It features secure user authentication using JWT (JSON Web Tokens), with role-based access control that differentiates between regular users and administrators.

The frontend is built with React.js using Bootstrap for a responsive and attractive UI. The backend provides a RESTful API built with Express.js, connected to a MongoDB database via Mongoose for data persistence. The system includes an Admin Dashboard for managing all bookings, a real-time FAQ chatbot, an image slider, and destination filtering. This project demonstrates the complete integration of frontend and backend technologies to build a production-ready web application.

---

## 🔍 Viva Explanation Guide

### Q: What is MERN Stack?
**A:** MERN stands for MongoDB (database), Express.js (backend framework), React.js (frontend library), and Node.js (JavaScript runtime). All four use JavaScript, making it a full-stack JavaScript solution.

### Q: What is JWT? How is it used here?
**A:** JWT (JSON Web Token) is a secure way to transmit user identity between client and server. When a user logs in, the backend creates a JWT token containing the user's ID. The frontend stores this token in localStorage and sends it with every API request in the Authorization header. The backend verifies the token before allowing access.

### Q: What is Mongoose?
**A:** Mongoose is an ODM (Object Data Modeling) library for MongoDB. It lets us define schemas (structure/blueprints) for our data and provides easy methods to Create, Read, Update, Delete (CRUD) documents.

### Q: What is bcryptjs used for?
**A:** bcryptjs is used to hash (encrypt) passwords before storing them in the database. When a user logs in, the entered password is compared with the stored hash — the actual password is never stored in plain text.

### Q: How does React Router work?
**A:** React Router allows navigation between pages in a React app without reloading the browser. Each `<Route>` maps a URL path to a React component. The `<Link>` tag replaces `<a>` tags to enable client-side navigation.

### Q: What is Axios?
**A:** Axios is a JavaScript library for making HTTP requests from the browser. We use it to call our backend APIs (GET, POST, DELETE) from React components.

### Q: What is the proxy field in frontend package.json?
**A:** The `"proxy": "http://localhost:5000"` setting in frontend's package.json tells the React dev server to forward all `/api` requests to the backend server. This avoids CORS issues during development.

### Q: What is CORS?
**A:** CORS (Cross-Origin Resource Sharing) is a security feature of browsers that blocks requests from one domain to another. We use the `cors` npm package in Express to allow the React frontend (port 3000) to communicate with the backend (port 5000).

### Q: How is Admin access restricted?
**A:** In the backend, the `adminOnly` middleware checks if the logged-in user's role is "admin". If not, it returns a 403 error. In the frontend, the AdminDashboard page checks the user's role from localStorage and redirects non-admins to the home page.

### Q: What is localStorage?
**A:** localStorage is browser storage that saves data as key-value pairs persistently (even after page refresh). We store the user object (including JWT token and role) in localStorage after login, and remove it on logout.

---

## ❌ Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `MongoDB connection failed` | Wrong MONGO_URI or MongoDB not running | Start MongoDB service or check Atlas URI |
| `EADDRINUSE port 5000` | Port already in use | Kill the process or change PORT in .env |
| `CORS error` | Proxy not set up | Ensure `"proxy": "http://localhost:5000"` is in frontend/package.json |
| `401 Not authorized` | No JWT token or expired token | Login again to get a fresh token |
| `403 Admin access only` | User is not admin | Login with an admin account |
| `Cannot GET /api/...` | Backend not running | Start backend with `npm run dev` |
| `Module not found` | Dependencies not installed | Run `npm install` in both folders |
| `bcrypt not defined` | Import missing | Ensure bcryptjs is in package.json and imported |
| `React Router v6 error` | Using v5 syntax | Use `<Routes>` and `element={}` (v6 syntax) |
| `Axios network error` | Backend not running | Start backend server first |

---

## 🚀 Future Enhancement Points

1. **Payment Gateway Integration** — Integrate Razorpay or Stripe for real online payments
2. **Email Notifications** — Send booking confirmation emails using Nodemailer
3. **Profile Management** — Allow users to update their profile photo and details
4. **Hotel Booking** — Add hotel selection along with destination booking
5. **Review & Rating System** — Let users rate destinations after their trip
6. **Real-time Chat Support** — Replace the FAQ chatbot with live chat using Socket.io
7. **PDF Invoice Generation** — Generate downloadable PDF booking tickets
8. **Google Maps Integration** — Show destination location on an embedded map
9. **Multi-language Support** — Add Hindi and regional language options
10. **Mobile App** — Build a React Native app using the same backend API
11. **Advanced Analytics** — More detailed admin reports with charts using Chart.js
12. **Search Filters** — Filter bookings by date range, price, and destination
13. **Wishlist Feature** — Let users save favorite destinations for later
14. **Social Login** — Login with Google or Facebook using OAuth2
15. **Image Upload** — Allow users to upload their travel photos

---

## 📊 Output Description

When the project runs successfully:

1. **Home Page** — Shows a Bootstrap image carousel with 4 slides, statistics row, 6 destination cards, "Why Choose Us" section with 4 feature cards, 3 customer testimonials, and a footer.

2. **Destinations Page** — Displays 12 destinations with category filter buttons (All/Asia/Europe/America/Middle East/India) and a live search bar.

3. **Booking Page** — A clean booking form with auto-price calculation based on destination and number of persons. Requires login.

4. **Confirmation Page** — Shows booking summary card with all details and status badge.

5. **Login/Register Pages** — Clean auth cards with input validation and error messages.

6. **Booking History** — Personal booking cards with summary stats (total bookings, confirmed count, total spent).

7. **Admin Dashboard** — Table with all users' bookings, 4 stat cards, search and filter controls.

8. **Chatbot** — Floating button at bottom-right, opens a chat window with keyword-based FAQ responses.

9. **Navbar** — Changes based on login status (shows My Bookings, Admin link, and user dropdown when logged in).

---

## 🛠️ Tech Stack Summary

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime for backend |
| Express.js | 4.18 | Backend web framework |
| MongoDB | 6+ | NoSQL database |
| Mongoose | 7.3 | MongoDB ODM |
| bcryptjs | 2.4 | Password hashing |
| jsonwebtoken | 9.0 | JWT authentication |
| dotenv | 16.0 | Environment variables |
| nodemon | 3.0 | Auto-restart dev server |
| React.js | 18.2 | Frontend UI library |
| React Router | 6.14 | Client-side routing |
| Axios | 1.4 | HTTP client for API calls |
| Bootstrap | 5.3 | CSS framework for responsive UI |
| Bootstrap Icons | 1.11 | Icon library |

---

*Made with ❤️ for 6th Semester MERN Stack Final Project*
