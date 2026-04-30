import './LandingPage.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function LandingPage() {
    const user = useSelector((state) => state.session.user);
    let navigate = useNavigate();

    if (user) {
        return <Navigate to="/calendar" replace />
    }


    return (
        <section className="landing-main">
            <div className="landing-container">
                <p className="mini-title">Organize your growth</p>
                <h1>Stay on track, reflect on your work, and keep learning with purpose.</h1>

                <p className="landing-subtitle">
                    Plan tasks on your calendar, capture daily reflections, and explore shared
                    programming resources — all in one place designed to help you grow
                    consistently.
                </p>

                <div className="landing-btn-container">
                    <button 
                        className="form-button non-header-button"
                        onClick={() => navigate('/signup')}
                    >
                        Get Started 
                    </button>

                    <button 
                        className="landing-btn-two non-header-button"
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </button>
                </div>

                <div className="preview-container">
                    App preview coming soon
                </div>
            </div>
        </section>
    );
}