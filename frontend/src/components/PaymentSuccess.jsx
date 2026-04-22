import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Payment completed successfully 🎉");

    const timer = setTimeout(() => {
      navigate("/");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="section">
      <h2>Payment Successful ✅</h2>
      <p>Redirecting to home page...</p>
    </div>
  );
}

export default PaymentSuccess;