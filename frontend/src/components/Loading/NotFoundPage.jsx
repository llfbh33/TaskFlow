import './Loading.css'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {

  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-code">404</p>
        <h1>There is nothing at that URL.</h1>
        <p className="not-found-text">
          Looking for something?
        </p>

        <div className="not-found-links">
          <Link to="/calendar" className="not-found-button">Calendar</Link>
          <Link to="/search" className="not-found-button">Search</Link>
          <Link to="/reflections" className="not-found-button">Reflections</Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;