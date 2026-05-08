import { useEffect } from "react";

export function ServiceWakeup() {

  useEffect(() => {

    let intervalId;

    const checkService = async (name, url, signal) => {
      try {

        await fetch(url, {
          mode: "no-cors",
          signal,
        });

        console.log(`🚀 Wake request sent to ${name}`);

        return true;

      } catch (error) {

        console.log(`❌ Failed to send wake request to ${name}`);

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
        "https://auth-service-0d8y.onrender.com/auth/health",
        controller.signal
      );

      const productReady = await checkService(
        "Product",
        "https://exocommerce-backend-g7v3.onrender.com/products/health",
        controller.signal
      );

      const cartReady = await checkService(
        "Cart",
        "https://cart-service-r100.onrender.com/carts/health",
        controller.signal
      );

      const userReady = await checkService(
        "User",
        "https://user-service-f0b9.onrender.com/users/health",
        controller.signal
      );

      const orderReady = await checkService(
        "Order",
        "https://order-service-xq1w.onrender.com/orders/health",
        controller.signal
      );

      clearTimeout(timeout);

      if (authReady && productReady && cartReady && userReady && orderReady) {

        console.log("✅ Wake requests sent successfully");

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