import './LandingPage.css';

export default function LandingPage() {
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
                    <button className="landing-btn-one">
                        Get Started
                    </button>

                    <button className="landing-btn-two">
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