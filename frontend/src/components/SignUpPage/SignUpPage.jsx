import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
    let navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "85px",
                paddingBottom: "45px",
                paddingRight: "20px",
                paddingLeft: "20px",
                background:
                    "radial-gradient(circle at top left, rgba(124,140,255,0.16), transparent 30%), radial-gradient(circle at bottom right, rgba(94,234,212,0.10), transparent 28%), linear-gradient(180deg, #0d1017 0%, #151925 100%)",
                color: "white",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    minHeight: "720px",
                    borderRadius: "32px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    boxShadow:
                        "0 25px 80px rgba(0,0,0,0.35), inset 0 0 40px rgba(255,255,255,0.03)",
                    backdropFilter: "blur(14px)",
                }}
            >
                <div
                    style={{
                        padding: "64px 56px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
                    }}
                >
                    <div style={{ marginBottom: "40px" }}>
                        <p
                            style={{
                                margin: "0 0 14px 0",
                                fontSize: "0.85rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.14em",
                                color: "rgba(255,255,255,0.65)",
                            }}
                        >
                            Get started
                        </p>

                        <h1
                            style={{
                                margin: "0 0 14px 0",
                                fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
                                lineHeight: 1.1,
                                fontWeight: 700,
                            }}
                        >
                            Create your account
                        </h1>

                        <p
                            style={{
                                margin: 0,
                                maxWidth: "460px",
                                fontSize: "1rem",
                                lineHeight: 1.7,
                                color: "rgba(255,255,255,0.72)",
                            }}
                        >
                            Start organizing your work, tracking your progress, and building
                            a better record of your growth.
                        </p>
                    </div>

                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px",
                            width: "100%",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label
                                style={{
                                    fontSize: "0.95rem",
                                    color: "rgba(255,255,255,0.82)",
                                }}
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                style={{
                                    flex: 1,
                                    padding: "15px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label
                                style={{
                                    fontSize: "0.95rem",
                                    color: "rgba(255,255,255,0.82)",
                                }}
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                style={{
                                    flex: 1,
                                    padding: "15px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label
                                style={{
                                    fontSize: "0.95rem",
                                    color: "rgba(255,255,255,0.82)",
                                }}
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                style={{
                                    flex: 1,
                                    padding: "15px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label
                                style={{
                                    fontSize: "0.95rem",
                                    color: "rgba(255,255,255,0.82)",
                                }}
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                style={{
                                    flex: 1,
                                    padding: "15px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                marginTop: "8px",
                                padding: "15px 22px",
                                borderRadius: "999px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: "#0d1017",
                                background:
                                    "linear-gradient(90deg, #7c8cff 0%, #5eead4 100%)",
                                boxShadow: "0 12px 30px rgba(124,140,255,0.25)",
                            }}
                        >
                            Create Account
                        </button>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                margin: "6px 0",
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    height: "1px",
                                    background: "rgba(255,255,255,0.12)",
                                }}
                            />
                            <span
                                style={{
                                    fontSize: "0.9rem",
                                    color: "rgba(255,255,255,0.52)",
                                }}
                            >
                                or
                            </span>
                            <div
                                style={{
                                    flex: 1,
                                    height: "1px",
                                    background: "rgba(255,255,255,0.12)",
                                }}
                            />
                        </div>

                        <button
                            type="button"
                            style={{
                                padding: "15px 20px",
                                borderRadius: "999px",
                                border: "1px solid rgba(255,255,255,0.14)",
                                background: "rgba(255,255,255,0.06)",
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Continue with Google
                        </button>

                        <p
                            style={{
                                marginTop: "14px",
                                fontSize: "0.95rem",
                                color: "rgba(255,255,255,0.68)",
                            }}
                        >
                            Already have an account?{" "}
                            <span
                                style={{
                                    color: "#aab6ff",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                }}
                                onClick={() => navigate('/login')}
                            >
                                Log in
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}