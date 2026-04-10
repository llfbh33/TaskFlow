import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useEffect, useState } from "react";
import loadState from "../../utils/loadData";
import "./signupPage.css";

export default function SignUpPage() {
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    // const [disabled, setDisabled] = useState(false);
    const validations = {
        email: "Please provide a valid email.",
        username: "Please provide a username with at least 4 characters.",
        password: "Password must be 6 characters or more."
    };
    const disabled = !email || !username || !name || !password || !confirmPassword;

    // useEffect(() => {
    //     if ((!email || !username || !name || !password || !confirmPassword) && !disabled) {
    //         setDisabled(true);
    //     };

    // }, [email, username, name, password, confirmPassword]);


    const checkErrors = () => {
        const newErrors = {};

        if (!email.includes('@') || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = validations.email
        };

        if (username.length < 4) {
            
            newErrors.username = validations.username;
        };

        if (password.length < 6) {
            newErrors.password = validations.password
        };
        return newErrors;
    };


    const handleSignUp = async (e) => {
        e.preventDefault();

        if (disabled) return;
        const foundErrors = checkErrors();
        if (Object.keys(foundErrors).length) {
            console.log(foundErrors)
            setErrors(foundErrors)
            return;
        };

        if (password === confirmPassword) {
            try {
                await dispatch(sessionActions.signup({
                    email,
                    username,
                    name,
                    password
                }));
                await loadState(dispatch);

                setEmail('');
                setUsername('');
                setName('');
                setPassword('');
                setConfirmPassword('');
                setErrors({});
                navigate('/calendar');
            } catch (res) {
                const data = await res.json();
                if (data.errors) setErrors(data.errors)
            };
        } else {
            let editErrors = { ...errors };
            editErrors.confirmPassword = "Confirm Password field must be the same as the Password field";

            return setErrors(editErrors);
        };
    }


    if (user) {
        return <Navigate to="/calendar" replace />
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "87px",
                paddingBottom: "45px",
                background:
                    "radial-gradient(circle at top left, rgba(124,140,255,0.16), transparent 30%), radial-gradient(circle at bottom right, rgba(94,234,212,0.10), transparent 28%), linear-gradient(180deg, #0d1017 0%, #151925 100%)",
                color: "white",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    minHeight: "650px",
                    borderRadius: "32px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.35), inset 0 0 40px rgba(255,255,255,0.03)",
                    backdropFilter: "blur(14px)",
                }}
            >
                <div
                    style={{
                        padding: "50px 70px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
                    }}
                >
                    <div style={{ marginBottom: "30px" }}>
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
                                fontSize: "clamp(2.1rem, 3.3vw, 3rem)",
                                lineHeight: 1.1,
                                fontWeight: 700,
                            }}
                        >
                            Create your account
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
                            Start organizing your work, tracking your progress, and building
                            a better record of your growth.
                        </p>
                    </div>

                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: "12px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />

                            {/* Error space (always reserved) */}
                            <div style={{
                                color: errors.name ? "rgb(255, 0, 0)" : "rgba(255, 255, 255, 0)",
                                flex: 1,
                                fontSize: "0.8rem",
                                letterSpacing: "0.07rem",
                                margin: 0,
                            }}>
                                {errors.name ? errors.name : "hi"}
                            </div>
                        </div>

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
                                type="username"
                                placeholder="Your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: "12px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                            <div style={{
                                color: errors.username ? "rgb(255, 0, 0)" : "rgba(255, 255, 255, 0)",
                                flex: 1,
                                fontSize: "0.8rem",
                                letterSpacing: "0.07rem",
                                margin: 0,
                            }}>
                                {errors.username ? errors.username : "hi"}
                            </div>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: "12px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                            <div style={{
                                color: errors.email ? "rgb(255, 0, 0)" : "rgba(255, 255, 255, 0)",
                                flex: 1,
                                fontSize: "0.8rem",
                                letterSpacing: "0.07rem",
                                margin: 0,
                            }}>
                                {errors.email ? errors.email : "hi"}
                            </div>
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: "12px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                            <div style={{
                                color: errors.password ? "rgb(255, 0, 0)" : "rgba(255, 255, 255, 0)",
                                flex: 1,
                                fontSize: "0.8rem",
                                letterSpacing: "0.07rem",
                                margin: 0,
                            }}>
                                {errors.password ? errors.password : "hi"}
                            </div>
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: "12px 18px",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                }}
                            />
                            <div style={{
                                color: errors.confirmPassword ? "rgb(255, 0, 0)" : "rgba(255, 255, 255, 0)",
                                flex: 1,
                                fontSize: "0.8rem",
                                letterSpacing: "0.07rem",
                                margin: 0,
                            }}>
                                {errors.confirmPassword ? errors.confirmPassword : "hi"}
                            </div>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSignUp}
                            className={disabled ? "form-button-disabled" : "form-button"}
                        // className={
                        //     !name 
                        //     || !email
                        //     || !username
                        //     || !password
                        //     || confirmPassword !== password
                        //     ? "signup-form-button-disabled"
                        //     : "signup-form-button"
                        // }
                        >
                            Create Account
                        </button>

                        {/* <div
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
                        </button> */}

                        <p
                            style={{
                                marginTop: "14px",
                                fontSize: "0.95rem",
                                color: "rgba(255,255,255,0.68)",
                            }}
                        >
                            Already have an account?{" "}
                            <span
                                className="swap-page"
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