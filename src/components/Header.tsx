import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header__container container">
                <Link to="/" className="header__logo">
                    Logo
                </Link>

                <button
                    type="button"
                    className={`header__menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
                    onClick={handleMenuToggle}
                >
                    <span className="sr-only">Menu</span>
                    <span className="header__menu-toggle-bar"></span>
                    <span className="header__menu-toggle-bar"></span>
                    <span className="header__menu-toggle-bar"></span>
                </button>

                <nav className={`header__nav ${isMenuOpen ? 'is-open' : ''}`}>
                    <button
                        type="button"
                        className="header__menu-close"
                        onClick={closeMenu}
                    >
                        <span className="sr-only">Close</span>
                        <span className="header__menu-close-bar"></span>
                        <span className="header__menu-close-bar"></span>
                    </button>

                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <Link to="/" className="header__nav-link" onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <Link
                                to="/services"
                                className="header__nav-link"
                                onClick={closeMenu}
                            >
                                Services
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/about" className="header__nav-link" onClick={closeMenu}>
                                About
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/book-now" className="header__nav-link" onClick={closeMenu}>
                                Book now
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/shop" className="header__nav-link" onClick={closeMenu}>
                                Shop
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/blog" className="header__nav-link" onClick={closeMenu}>
                                Blog
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <Link to="/contact" className="header__nav-link" onClick={closeMenu}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
