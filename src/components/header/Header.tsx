import './Header.scss';
import Button from '../../ui/button/Button';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header-wrapper">
            <header className="header app-container">
                <nav className="nav-header">
                    <ul className="nav-header__links">
                        <li>
                            <ul className="nav-header__main-links">
                                <li>
                                    <Link to="/">
                                        <svg width="178" height="46">
                                            <use xlinkHref="/assets/icons/sprite-logotypes.svg#header-logo" />
                                        </svg>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        className="nav-header__link-ads"
                                        href="#"
                                    >
                                        Оголошення
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul className="nav-header__side-links">
                                <li>
                                    <Link to="/add-pet">
                                        <Button className="add">
                                            Додати оголошення
                                        </Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="nav-header__link-profile" to="/user-profile">
                                        <div className="nav-header__avatar-wrapper">
                                            <img
                                                src="/assets/icons/sprite-icons-small.svg#avatar-placeholder"
                                                alt="Аватар акаунта"
                                                width="32"
                                                height="32"
                                            />
                                        </div>
                                        Акаунт
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
