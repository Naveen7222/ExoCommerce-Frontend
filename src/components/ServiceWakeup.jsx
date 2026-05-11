import { useEffect } from "react";

const SERVICES = [
  { name: "Eureka",  url: "https://exocommerce-backend.onrender.com" },
  { name: "Gateway", url: "https://api-gateway-ueyq.onrender.com" },
  { name: "Auth",    url: "https://auth-service-0d8y.onrender.com" },
  { name: "Product", url: "https://exocommerce-backend-g7v3.onrender.com" },
  { name: "Cart",    url: "https://cart-service-r100.onrender.com" },
  { name: "User",    url: "https://user-service-f0b9.onrender.com" },
  { name: "Order",   url: "https://order-service-xq1w.onrender.com" },
];

export function ServiceWakeup() {
  useEffect(() => {
    console.log("🔄 Waking all services...");

    SERVICES.forEach((service) => {
      fetch(service.url, { mode: "no-cors" })
        .then(() => console.log(`📡 Wake ping sent to ${service.name}`))
        .catch(() => console.log(`❌ ${service.name} unreachable`));
    });
  }, []);

  return null;
}