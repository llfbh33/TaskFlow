import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loadState from "../../utils/loadData";
import * as sessionActions from '../../store/session';

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    console.log(errors)

    // Login Load State for Demo User
    const demoLogin = async () => {
        await dispatch(sessionActions.login({ 
            credential: 'starter-aubrie', 
            password: "password" 
        }));
   
        await loadState(dispatch);
        navigate('/calendar')
    };

    // Login Load State for Verified User with Validation
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        
        try {
            await dispatch(sessionActions.login({ 
                credential, 
                password 
            }));
            await loadState(dispatch);

            setCredential('');
            setPassword('');
            navigate('/calendar');
        } catch (res) {
            const data = await res.json();
            if (data.errors) setErrors(data.errors);
        }   
    }


    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "70px",
                paddingBottom: "30px",
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
                    maxWidth: "600px", // 👈 changed
                    minHeight: "680px",
                    borderRadius: "32px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.35)",
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
                            Welcome back
                        </p>

                        <h1
                            style={{
                                margin: "0 0 14px 0",
                                fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
                                lineHeight: 1.1,
                                fontWeight: 700,
                            }}
                        >
                            Log in and get back to building.
                        </h1>

                        <p
                            style={{
                                margin: 0,
                                maxWidth: "520px",
                                fontSize: "1rem",
                                lineHeight: 1.7,
                                color: "rgba(255,255,255,0.72)",
                            }}
                        >
                            Track your tasks, reflect on your progress, and keep your
                            learning resources in one place.
                        </p>
                    </div>

                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px",
                            width: "100%",
                            // maxWidth: "460px",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label
                                style={{
                                    fontSize: "0.95rem",
                                    color: "rgba(255,255,255,0.82)",
                                }}
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Star-648"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        
                            <div style={{
                                color: errors.credential ? "rgb(255, 0, 0)" : "rgba(255, 255, 255, 0)",
                                flex: 1,
                                textAlign: "center",
                                fontSize: "0.8rem",
                                letterSpacing: "0.07rem",
                                margin: 0,
                            }}>
                                Incorrect username or password
                            </div>
                        

                        <button
                            type="submit"
                            onClick={handleLogin}
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
                            Log In
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

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                            }}
                        >
                            {/* <button
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
                                    transition: "0.2s ease",
                                }}
                            >
                                Continue with Google
                            </button> */}

                            <button
                                type="button"
                                style={{
                                    padding: "15px 20px",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(124,140,255,0.25)",
                                    background: "rgba(124,140,255,0.10)",
                                    color: "white",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                                onClick={() => demoLogin()}
                            >
                                Explore Demo
                            </button>
                        </div>

                        <p
                            style={{
                                marginTop: "14px",
                                fontSize: "0.95rem",
                                color: "rgba(255,255,255,0.68)",
                            }}
                        >
                            Don&apos;t have an account?{" "}
                            <span
                                style={{
                                    color: "#aab6ff",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                }}
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>

                {/* <div
                    style={{
                        padding: "48px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        position: "relative",
                        background:
                            "linear-gradient(180deg, rgba(124,140,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <div
                            style={{
                                padding: "24px",
                                borderRadius: "24px",
                                border: "1px solid rgba(255,255,255,0.10)",
                                background: "rgba(255,255,255,0.05)",
                                boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                            }}
                        >
                            <p
                                style={{
                                    margin: "0 0 10px 0",
                                    fontSize: "0.85rem",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.58)",
                                }}
                            >
                                Stay on track
                            </p>
                            <h3
                                style={{
                                    margin: "0 0 10px 0",
                                    fontSize: "1.35rem",
                                }}
                            >
                                Organize your work without losing the bigger picture.
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    lineHeight: 1.7,
                                    color: "rgba(255,255,255,0.72)",
                                }}
                            >
                                Manage tasks, keep daily notes, and build a record of your
                                growth over time.
                            </p>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px",
                            }}
                        >
                            <div
                                style={{
                                    padding: "20px",
                                    minHeight: "150px",
                                    borderRadius: "22px",
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    background: "rgba(255,255,255,0.04)",
                                }}
                            >
                                <p
                                    style={{
                                        margin: "0 0 8px 0",
                                        color: "rgba(255,255,255,0.6)",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Daily reflection
                                </p>
                                <div
                                    style={{
                                        height: "10px",
                                        width: "70%",
                                        borderRadius: "999px",
                                        background: "rgba(255,255,255,0.12)",
                                        marginBottom: "10px",
                                    }}
                                />
                                <div
                                    style={{
                                        height: "10px",
                                        width: "90%",
                                        borderRadius: "999px",
                                        background: "rgba(255,255,255,0.08)",
                                        marginBottom: "10px",
                                    }}
                                />
                                <div
                                    style={{
                                        height: "10px",
                                        width: "60%",
                                        borderRadius: "999px",
                                        background: "rgba(255,255,255,0.08)",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    padding: "20px",
                                    minHeight: "150px",
                                    borderRadius: "22px",
                                    border: "1px solid rgba(255,255,255,0.10)",
                                    background: "rgba(255,255,255,0.04)",
                                }}
                            >
                                <p
                                    style={{
                                        margin: "0 0 12px 0",
                                        color: "rgba(255,255,255,0.6)",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Shared resources
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                    }}
                                >
                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            style={{
                                                height: "26px",
                                                borderRadius: "10px",
                                                background: "rgba(255,255,255,0.08)",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}