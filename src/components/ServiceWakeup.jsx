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

    checkServices();

    intervalId = setInterval(checkServices, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return null;
}
