# ExoCommerce Frontend — Project Information

## 📌 Project Name
**ExoCommerce – Frontend Application**

This is the user-facing frontend of the ExoCommerce Microservices ecosystem.  
It interacts with multiple backend services through REST APIs and uses a modern React-based architecture designed for scalability, performance, and clean structure.

---

## 🧩 Architecture Overview

### **Frontend Role in Microservices**
- Handles all **user interactions**
- Communicates with **API Gateway** (Spring Cloud Gateway)
- Sends authentication requests to **Auth Service**
- Fetches data from **Product**, **Order**, and **Cart Services**
- Uses JWT for secure communication

### **Rendering**
- Client-side rendering (CSR)
- React Router v7 for navigation
- Axios for REST communication

---

## ⚙️ Tech Stack (with specific versions)

| Technology | Version |
|-----------|---------|
| **React** | 19.2.0 |
| **Redux Toolkit** | 2.10.1 |
| **React Router DOM** | 7.9.5 |
| **Tailwind CSS** | 4.1.17 |
| **Axios** | 1.13.2 |
| **JWT Decode** | 4.0.0 |
| **Vite** | 7.2.2 |
| **Node.js** | 20.x |
| **npm** | 10.x |

---

## 🔐 Authentication Handling
- JWT stored on client side
- Token decoded using `jwt-decode`
- Protected routes implemented using React Router
- Auth state managed via Redux Toolkit

---

## 🔄 State Management
- Global state handled using Redux Toolkit
- Separate slices for auth, cart, and user data
- Async API calls managed using Redux async thunks

---

## 🎨 UI & Styling
- Utility-first styling with Tailwind CSS
- Responsive layout design
- Reusable UI components
- Conditional styling using `clsx`

---

## 🔗 GitHub Repositories

- Backend Repository:  
  https://github.com/Naveen7222/ExoCommerce-Backend

- Frontend Repository:  
  https://github.com/Naveen7222/ExoCommerce-Frontend
