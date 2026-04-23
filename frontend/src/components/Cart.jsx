import { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ================= حماية الصفحة (مهم: بعد تعريف hooks)
  const isAllowed =
    user && (user.role === "student" || user.role === "user");

  useEffect(() => {
    if (!isAllowed) return;

    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart/my");
      setCart(res.data);
    } catch (err) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);

      setCart((prev) => prev.filter((item) => item._id !== id));

      toast.success("Removed from cart");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.course?.price || 0);
  }, 0);

  const getImage = (image) => {
    if (!image) return "/default-course.jpg";

    if (image.startsWith("http")) return image;

    return `${import.meta.env.VITE_API_URL}${image}`;
  };

  // ================= Loading
  if (loading) return <h2 className="loading">Loading...</h2>;

  // ================= Not authorized UI
  if (!isAllowed) {
    return (
      <div className="section">
        <h2>Not Authorized</h2>
        <p>You are not allowed to access cart</p>

        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h1>Shopping Cart</h1>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Start adding courses you like</p>

            <button onClick={() => navigate("/")}>
              Browse Courses
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-card">
              <img
                src={getImage(item.course?.image)}
                alt={item.course?.title}
              />

              <div className="cart-info">
                <h3>{item.course?.title}</h3>
                <p>
                  {item.course?.description?.slice(0, 90)}...
                </p>
              </div>

              <div className="cart-actions">
                <h4>${item.course?.price}</h4>

                <button onClick={() => removeItem(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SUMMARY */}
      {cart.length > 0 && (
        <div className="cart-right">
          <div className="cart-summary">
            <h2>Summary</h2>

            <div className="summary-row">
              <span>Total</span>
              <strong>${total}</strong>
            </div>

            <button
              className="checkout-btn"
              onClick={() => toast.info("Checkout coming soon")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;