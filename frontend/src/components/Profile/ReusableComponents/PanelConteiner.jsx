// import { autoType } from "d3";

export default function PanelContainer({ title, subtitle, widthPx, widthPer, children }) {
    const computedWidth =
        widthPx ? `${widthPx}px`
            : widthPer ? `${widthPer}%`
                : "500px";


    return (
        <section
            style={{
                width: `min(${computedWidth}, 92%)`,
                padding: "28px",
                borderRadius: "20px",
                background: "white",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
        >
            {title &&
                <div style={{ marginBottom: "20px" }}>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "1.6rem",
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
            }

            <div
                style={{
                    width: "100%",
                    minHeight: "340px",
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