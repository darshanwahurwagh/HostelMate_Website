import React from "react";

const Modal = ({ isOpen, onClose, title = "Notification", children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "30px",
          maxWidth: "480px",
          width: "90%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          transform: "scale(1)",
          transition: "transform 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: "16px" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 800,
              color: "#0f172a",
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h3>
        </div>

        <div
          style={{
            color: "#475569",
            fontSize: "15px",
            lineHeight: "1.6",
            fontWeight: "500",
            marginBottom: "24px",
          }}
        >
          {children}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "white",
              border: "none",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)",
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.95";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
