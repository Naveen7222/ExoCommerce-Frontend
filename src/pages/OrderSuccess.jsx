import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function OrderSuccess() {
    const { orderId } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
            <div className="bg-[#1E293B]/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/5 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-4">
                    Order Placed!
                </h1>

                <p className="text-slate-300 mb-2">
                    Your order has been placed successfully.
                </p>

                <p className="font-bold text-lg mb-8 text-primary">
                    Order ID: #{orderId}
                </p>

                <div className="flex flex-col gap-4">
                    <Link to="/orders/my">
                        <Button className="w-full py-3 shadow-lg shadow-primary/20">View My Orders</Button>
                    </Link>


                    <Link to="/">
                        <Button variant="outline" className="w-full py-3 border-white/10 text-white hover:bg-white/10">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
