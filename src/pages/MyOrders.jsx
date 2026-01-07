import { useEffect, useState } from "react";
import Loading from "../components/ui/Loading";
import { fetchMyOrders } from "../services/api";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError("Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return <Loading manualLoading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
        <Link to="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 border-l-4 border-primary pl-4 text-white">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-[#1E293B]/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all hover:border-primary/30 hover:shadow-primary/5"
          >
            <div>
              <p className="font-bold text-lg text-white">
                Order #{order.orderId}
              </p>
              <p className="text-slate-400 text-sm">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-bold text-lg text-primary">
                ${order.totalAmount}
              </span>

              <span
                className={`px-4 py-1 rounded-full text-sm font-bold border border-white/5 shadow-sm
                  ${order.status === "PLACED"
                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    : order.status === "PAID"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      : order.status === "SHIPPED"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : order.status === "DELIVERED"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-slate-700/50 text-slate-300"
                  }
                `}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
