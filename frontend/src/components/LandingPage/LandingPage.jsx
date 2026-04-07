import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    let navigate = useNavigate();


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
                        className="form-button"
                        onClick={() => navigate('/signup')}
                    >
                        Get Started 
                    </button>

                    <button 
                        className="landing-btn-two"
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