# 🚀 Task & Expense Tracker

A modern, secure **full‑stack Task & Expense Tracker** built with **React, TypeScript, Node.js, Express, and MongoDB**.

This project was developed as a **machine test** with a strong focus on:

* Clean architecture
* Secure authentication
* Type safety (no `any`)
* Real‑world backend practices
* Clear, reviewer‑friendly documentation

---

## ✨ Highlights

* 🔐 **OTP‑based Authentication** (no passwords stored)
* 🍪 **JWT in httpOnly Cookies** (secure, XSS‑safe)
* 🧠 **TypeScript everywhere** (frontend + backend)
* 🛡️ **Protected Routes** on both client & server
* 📦 **Task & Expense CRUD** with user‑level isolation
* ⚙️ **Centralized Error Handling**
* 📐 **Clean folder structure & commit history**

---

## 🧱 Tech Stack

### Frontend

* React 18 + TypeScript
* Vite
* React Router
* Axios (with credentials)

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB + Mongoose
* JWT (cookie‑based)

---

## 🔐 Authentication Design

* Users authenticate using **Email + OTP**
* OTP is validated on the backend
* On success, a **JWT is issued and stored in an httpOnly cookie**
* No tokens are stored in `localStorage`
* Browser automatically sends cookies for protected requests

### Why this approach?

* Avoids password management
* Prevents XSS token theft
* Simplifies frontend auth logic
* Suitable for web‑only applications

---

## 📦 Features

### ✅ Tasks

* Create tasks
* View user‑specific tasks
* Update task status
* Delete tasks
* Authorization enforced at database level

### ✅ Expenses

* Add expenses
* View expenses
* Update expense details
* Delete expenses
* Category & amount tracking

---

## 🗂️ Project Structure

```
task-expense-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── utils/
│   │   └── server.ts
│   ├── .example-env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd task-expense-tracker
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .example-env .env
npm run dev
```

Backend runs on: **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: **[http://localhost:5173](http://localhost:5173)**

---

## 📡 API Endpoints

### Authentication

* `POST /api/auth/request-otp`
* `POST /api/auth/verify-otp`
* `POST /api/auth/logout`

### Tasks (Protected)

* `GET /api/tasks`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`

### Expenses (Protected)

* `GET /api/expenses`
* `POST /api/expenses`
* `PUT /api/expenses/:id`
* `DELETE /api/expenses/:id`

---

## 🛡️ Security Considerations

* JWT stored in **httpOnly cookies**
* CORS restricted to frontend origin
* Credentials allowed explicitly
* User authorization enforced in DB queries
* Centralized error handling (no stack leaks in production)

---

## 🧠 Design Decisions

* **OTP instead of passwords** → reduced security risk
* **Cookie‑based JWT** → simpler & safer for web apps
* **Service‑layer APIs** → clean separation of concerns
* **Typed hooks & components** → predictable behavior

---

## 🚧 Future Enhancements

* Google / Facebook OAuth
* Email service integration for OTP delivery
* Expense analytics & charts
* Pagination & filtering
* Role‑based access control

---

## 👤 Author

**Nihal**
MERN Stack Developer

---

⭐ *This project was built with clarity, security, and maintainability in mind.*
