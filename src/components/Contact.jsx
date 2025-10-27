"use client";
import { useActionState } from "react";

export default function ContactForm({ cartItems, onSuccess }) {
  const [state, formAction] = useActionState(async (prevState, formData) => {
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: {
            items: cartItems || [],
            customer: {
              name: formData.get("name"),
              email: formData.get("email"),
              street: formData.get("street"),
              "postal-code": formData.get("postal-code"),
              city: formData.get("city"),
            },
          },
        }),
      });

      if (!response.ok) {
        return { status: "error", message: "❌ Failed to send order. Please check your data." };
      }

      onSuccess?.();
      return { status: "success", message: "✅ Order submitted successfully!" };
    } catch {
      return { status: "error", message: "❌ Something went wrong! Try again later." };
    }
  });

  const isSubmitting = state?.status === "loading";

  return (
    <form
      action={formAction}
      style={{
        background: "rgba(0, 0, 0, 0.15)",
        backdropFilter: "blur(12px)",
        padding: "25px",
        borderRadius: "16px",
        width: "380px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        position :"fixed",
        top :"50%" ,
        left :"50%" ,
        zIndex: 1000,
        transform: "translate(-50%, -50%)"
      }}
    >
      <h2 style={{ textAlign: "center", color: "#ffcc00" }}>Contact Details</h2>
        
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="street"
        placeholder="Street"
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="postal-code"
        placeholder="Postal Code"
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        required
        style={inputStyle}
      />

      {state?.status === "error" && (
        <p style={{ color: "#ff5c5c", fontSize: "0.9rem" }}>{state.message}</p>
      )}
      {state?.status === "success" && (
        <p style={{ color: "#00e676", fontSize: "0.9rem" }}>{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 15px",
          cursor: "pointer",
          fontSize: "1rem",
          marginTop: "10px",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.background = "#0056b3")}
        onMouseOut={(e) => (e.target.style.background = "#007bff")}
      >
        {isSubmitting ? "Sending..." : "Submit Order"}
      </button>
    </form>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  outline: "none",
  fontSize: "1rem",
};
