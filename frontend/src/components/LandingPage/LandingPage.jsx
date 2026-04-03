
// debate if you are ready to remove this file

import { useState } from "react"
import { useSelector } from "react-redux";
import './LandingPage.css';
// import { FaBimobject } from "react-icons/fa";
import fetchOpenGraphData from "../../utils/OpenGraphData";
import Loading from "../Loading/Loading";

export default function LandingPage() {
    return (
        <section
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "80px 24px",
                background:
                    "radial-gradient(circle at top, rgba(120,120,255,0.12), transparent 35%), linear-gradient(180deg, #0f1117 0%, #151925 100%)",
                color: "white",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "24px",
                }}
            >
                <p
                    style={{
                        margin: 0,
                        fontSize: "0.9rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.7)",
                    }}
                >
                    Organize your growth
                </p>

                <h1
                    style={{
                        margin: 0,
                        fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
                        lineHeight: 1.1,
                        maxWidth: "850px",
                        fontWeight: 700,
                    }}
                >
                    Stay on track, reflect on your work, and keep learning with purpose.
                </h1>

                <p
                    style={{
                        margin: 0,
                        maxWidth: "760px",
                        fontSize: "1.1rem",
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.78)",
                    }}
                >
                    Plan tasks on your calendar, capture daily reflections, and explore shared
                    programming resources — all in one place designed to help you grow
                    consistently.
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: "8px",
                    }}
                >
                    <button
                        style={{
                            padding: "14px 28px",
                            borderRadius: "999px",
                            border: "none",
                            fontSize: "1rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            background: "linear-gradient(90deg, #7c8cff 0%, #5eead4 100%)",
                            color: "#0f1117",
                            boxShadow: "0 10px 30px rgba(92, 137, 255, 0.25)",
                        }}
                    >
                        Get Started
                    </button>

                    <button
                        style={{
                            padding: "14px 28px",
                            borderRadius: "999px",
                            border: "1px solid rgba(255,255,255,0.18)",
                            fontSize: "1rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            background: "rgba(255,255,255,0.05)",
                            color: "white",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        Log In
                    </button>
                </div>

                <div
                    style={{
                        marginTop: "36px",
                        width: "100%",
                        maxWidth: "950px",
                        minHeight: "260px",
                        borderRadius: "28px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.04)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "1rem",
                    }}
                >
                    App preview goes here
                </div>
            </div>
        </section>
    );
}