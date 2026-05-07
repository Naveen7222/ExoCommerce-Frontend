import { useEffect } from "react";
import { useToast } from "./ui/Toast";
import { API_BASE_URL } from "../services/api";

export function ServiceWakeup() {
  const { addToast } = useToast();

  useEffect(() => {
    const wakeServices = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

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
        addToast("Services woken up successfully", "success", 2000);
      } catch (error) {
        console.log("Wake-up failed:", error.message);
        addToast("Services wake-up failed", "warning", 2000);
      }
    };

    wakeServices();
  }, [addToast]);

  return null;
}
