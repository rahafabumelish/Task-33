const Cart = () => {
  const checkout = async () => {
    const res = await fetch("http://localhost:5000/payments/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ courseId: "PUT_ID_HERE" }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={checkout}>Pay with Stripe</button>
    </div>
  );
};

export default Cart;