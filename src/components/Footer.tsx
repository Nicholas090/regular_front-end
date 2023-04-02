import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
                <div className="row">
                    <div className="footer-col">
                        <h4>Departments</h4>
                        <ul>
                            <li><Link to="#">Medical</Link></li>
                            <li><Link to="#">Pharmaceuticals</Link></li>
                            <li><Link to="#">Medical Equipment</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="#">What do we do?</Link></li>
                            <li><Link to="#">Our expertise</Link></li>
                            <li><Link to="#">Request an Appointment</Link></li>
                            <li><Link to="#">Request an Appointment</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Head Office</h4>
                        <ul>
                            <li><address>4517 Washington Ave. Manchester, Kentucky 39495</address></li>
                            <li><Link to="mailto: darrell@mail.com">darrell@mail.com</Link></li>
                            <li><Link to="tel:5145439936">(514) 543-9936</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <div className="social-links">
                            <svg width="278" height="112" viewBox="0 0 278 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M55.9223 112C25.033 112 0 86.2989 0 54.5853V0C30.8893 0 55.9223 25.7011 55.9223 57.4147V112Z" fill="#D8D8D8"/>
                                <path d="M60.8025 65.5495V36.5474C60.8025 16.3874 76.7639 0 96.4573 0V29.0021C96.4573 49.1621 80.4959 65.5495 60.8025 65.5495Z" fill="#D8D8D8"/>
                                <path d="M141.356 112H100.476C78.5437 112 60.8025 93.7852 60.8025 71.2673H101.682C123.615 71.2673 141.356 89.4821 141.356 112Z" fill="#D8D8D8"/>
                                <path d="M131.072 49.3617L120.44 35.135V49.3617H112.737V17.1451H120.44V31.28L130.982 17.1451H140.037L127.783 32.9321L140.487 49.3617H131.072Z" fill="#D8D8D8"/>
                                <path d="M171.539 17.1451V49.3617H163.835V36.0987H151.852V49.3617H144.148V17.1451H151.852V29.7655H163.835V17.1451H171.539Z" fill="#D8D8D8"/>
                                <path d="M196.787 43.671H184.984L183.092 49.3617H175.028L186.47 17.1451H195.39L206.833 49.3617H198.679L196.787 43.671ZM194.805 37.6132L190.885 25.8188L187.011 37.6132H194.805Z" fill="#D8D8D8"/>
                                <path d="M238.607 49.3617H230.903L218.019 29.4902V49.3617H210.316V17.1451H218.019L230.903 37.1084V17.1451H238.607V49.3617Z" fill="#D8D8D8"/>
                                <path d="M169.668 65.2827V67.9445H160.928V97.3617H157.775V67.9445H148.99V65.2827H169.668Z" fill="#D8D8D8"/>
                                <path d="M184.083 67.8986V79.8766H196.021V82.5384H184.083V94.6999H197.373V97.3617H180.93V65.2368H197.373V67.8986H184.083Z" fill="#D8D8D8"/>
                                <path d="M208.428 81.2993C208.428 78.148 209.103 75.3332 210.455 72.855C211.806 70.3462 213.653 68.4034 215.996 67.0267C218.339 65.6193 220.952 64.9156 223.835 64.9156C227.349 64.9156 230.352 65.7723 232.845 67.4856C235.368 69.1683 237.2 71.5547 238.341 74.6448H234.647C233.746 72.4726 232.364 70.7746 230.502 69.5507C228.67 68.3269 226.448 67.715 223.835 67.715C221.522 67.715 219.435 68.2658 217.573 69.3672C215.741 70.4686 214.299 72.0595 213.248 74.14C212.197 76.1899 211.671 78.5763 211.671 81.2993C211.671 84.0222 212.197 86.4087 213.248 88.4585C214.299 90.5084 215.741 92.0841 217.573 93.1855C219.435 94.2869 221.522 94.8376 223.835 94.8376C226.448 94.8376 228.67 94.241 230.502 93.0478C232.364 91.824 233.746 90.1413 234.647 87.9996H238.341C237.2 91.0591 235.368 93.4302 232.845 95.113C230.322 96.7957 227.319 97.6371 223.835 97.6371C220.952 97.6371 218.339 96.9487 215.996 95.5719C213.653 94.1645 211.806 92.2217 210.455 89.7435C209.103 87.2653 208.428 84.4506 208.428 81.2993Z" fill="#D8D8D8"/>
                                <path d="M274.288 65.2827V97.3617H271.135V82.3548H254.061V97.3617H250.907V65.2827H254.061V79.693H271.135V65.2827H274.288Z" fill="#D8D8D8"/>
                            </svg>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras blandit tincidunt ut sed. Velit euismod integer convallis ornare eu.
                        </p>
                    </div>
                    <strong>©2021 All Rights Reserved</strong>
                </div>
        </footer>

    )
}

export default Footer;
