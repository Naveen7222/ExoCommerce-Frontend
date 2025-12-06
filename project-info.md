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
- Fetches data from **Product**, **Order**, and **Payment Services**
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
| **React Router** | 7.9.5 |
| **Tailwind CSS** | 4.1.17 |
| **Axios** | 1.13.2 |
| **Vite** | 7.2.2 |
| **Node.js (NVM)** | 22.12.0 |
| **npm** | 10.9.0 |
| **Node alternative compatible** | 20.19.0+ |

