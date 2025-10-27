import { cartActions } from "../store/index.js";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({ onClose }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const total = useSelector((state) => state.totalAmount);
  const formattedTotal = Math.abs(total) < 0.01 ? 0 : total;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(14px)",
        borderRadius: "20px",
        padding: "25px 30px",
        width: "400px",
        maxHeight: "70vh",
        overflowY: "auto",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        color: "#ffffff",
        zIndex: 1000,
        textAlign: "center",
        border: "1px solid rgba(255, 255, 255, 0.25)",
      }}
    >
      <h2 style={{ marginBottom: "15px", fontSize: "1.6rem", color: "#ffcc00" }}>
        🛒 Your Shopping Cart
      </h2>

      {items.length === 0 ? (
        <p style={{ color: "#ff5c5c", fontSize: "20px" }}>
          <b>Your cart is empty.</b>
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                borderRadius: "12px",
                padding: "10px 15px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                color: "#fefefe",
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#f0f0f0" }}>
                  ${item.price}
                </p>
              </div>
              <button
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "#cc0000")}
                onMouseOut={(e) => (e.target.style.background = "#ff4d4d")}
                onClick={() => dispatch(cartActions.removeItem(item.id))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: "15px 0", opacity: 0.3, borderColor: "#ffffff" }} />

      <h3 style={{ marginBottom: "15px", color: "#00e676" }}>
        Total: ${formattedTotal.toFixed(2)}
      </h3>

      <button
        onClick={onClose}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "1rem",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.background = "#0056b3")}
        onMouseOut={(e) => (e.target.style.background = "#007bff")}
      >
        Close
      </button>
    </div>
  );
}
