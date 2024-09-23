import { useState } from "react";
import "./Footer.css";

const Footer = () => {
    const [closed, setClosed] = useState(true);

    return (
        <div id="footer-container">
            <div className="footer-content">
                <div className="about-us" onClick={() => setClosed(!closed)}>About Us</div>
            </div>
            <div className={`svg-container ${closed ? 'hide' : 'show'}`}>
                <svg height="580" width="400" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 0 }}>
                    <circle r="260" cx="50" cy="262" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" strokeWidth="2" />
                </svg>
            </div>
        </div>
    );
};

export default Footer;
