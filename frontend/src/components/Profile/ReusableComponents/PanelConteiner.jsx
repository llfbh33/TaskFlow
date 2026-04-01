export default function PanelContainer({ title, subtitle, children }) {
  return (
    <section
      style={{
        width: "min(800px, 92%)",
        margin: "40px auto",
        padding: "28px",
        borderRadius: "20px",
        background: "white",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#1f1f1f",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              margin: "8px 0 0 0",
              fontSize: "0.95rem",
              color: "#666",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div
        style={{
          width: "100%",
          minHeight: "420px",
          borderRadius: "16px",
          background: "rgba(0, 128, 0, 0.04)",
          border: "1px solid rgba(0, 128, 0, 0.12)",
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </section>
  );
}