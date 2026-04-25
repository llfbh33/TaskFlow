import { FaGithub, FaLinkedin, FaRegFile } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {

    // return (
    //     <div id="footer-container">
    //         <div className="footer-content">
    //             <div className="about-us" onClick={() => setClosed(!closed)}>About Us</div>
    //         </div>
    //         <div className={`svg-container ${closed ? 'hide' : 'show'}`}>
    //             <svg height="580" width="400" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 0 }}>
    //                 <circle r="260" cx="50" cy="262" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" strokeWidth="2" />
    //             </svg>
    //         </div>
    //     </div>
    // );


    return (
        <div id="footer-container">
            <footer className="footer">
                <p>© 2026 Aubrie Woodbine</p>

                <div className="footer-links">
                    <a href="https://github.com/llfbh33" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>

                    <a href="https://www.linkedin.com/in/aubriewoodbine/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>

                    <a href="/Aubrie-Resume.pdf" target="_blank" rel="noreferrer">
                        <FaRegFile />
                    </a>

                    <a href="https://aubries-portfolio.onrender.com/" target="_blank" rel="noreferrer">
                        <FaRegFolderOpen />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
