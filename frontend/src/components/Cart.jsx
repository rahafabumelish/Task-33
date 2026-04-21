import api from "../api/api";

function Cart() {
  const checkout = async () => {
    const res = await api.post("/payments/checkout");
    window.location.href = res.data.url;
  };

  return (
    <div className="section">
      <h2>Cart</h2>
      <button onClick={checkout}>Pay Now</button>
    </div>
  );
}

export default Cart;