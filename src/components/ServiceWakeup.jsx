import { useEffect } from "react";
import { API_BASE_URL } from "../services/api";

export function ServiceWakeup() {
  useEffect(() => {
    const wakeServices = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        console.log("🚀 Waking up services...");

        const authHealth = fetch(
          `${API_BASE_URL}/auth/health`,
          { signal: controller.signal }
        ).catch(() => null);

        const productsHealth = fetch(
          `${API_BASE_URL}/products/health`,
          { signal: controller.signal }
        ).catch(() => null);

        await Promise.all([authHealth, productsHealth]);
        clearTimeout(timeout);
        console.log("✅ Services woken up successfully");
      } catch (error) {
        console.log("⚠️ Wake-up failed:", error.message);
      }
    };

    wakeServices();
  }, []);

  return null;
}
