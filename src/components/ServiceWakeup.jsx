import { useEffect } from "react";
import { API_BASE_URL } from "../services/api";

export function ServiceWakeup() {

  useEffect(() => {

    let intervalId;

    const checkService = async (name, url, signal) => {
      try {

        const response = await fetch(url, {
          signal,
        });

        if (response.ok) {

          console.log(`✅ ${name} service awake`);

          return true;
        }

        console.log(`⚠️ ${name} service not ready`);

        return false;

      } catch (error) {

        console.log(`❌ ${name} service sleeping`);

        return false;
      }
    };

    const checkServices = async () => {

      const controller = new AbortController();

      const timeout = setTimeout(() => {
        controller.abort();
      }, 5000);

      console.log("🚀 Checking services...");

      const authReady = await checkService(
        "Auth",
        `https://auth-service-0d8y.onrender.com/auth/health`,
        controller.signal
      );

      const productReady = await checkService(
        "Product",
        `https://exocommerce-backend-g7v3.onrender.com/products/health`,
        controller.signal
      );

      clearTimeout(timeout);

      if (authReady && productReady) {

        console.log("✅ All services are awake");

        clearInterval(intervalId);

      } else {

        console.log("⏳ Waiting for services...");
      }
    };

    checkServices();

    intervalId = setInterval(checkServices, 30000);

    return () => {
      clearInterval(intervalId);
    };

  }, []);

  return null;
}