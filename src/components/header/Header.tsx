import './Header.scss';
import Button from '../../ui/button/Button';

const Header = () => {
    return (
        <div className="header-wrapper">
            <header className="header app-container">
                <nav className="nav-header">
                    <ul className="nav-header__links">
                        <li>
                            <ul className="nav-header__main-links">
                                <li>
                                    <a href="#">Логотип</a>
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
                                    <Button className="add">
                                        Додати оголошення
                                    </Button>
                                </li>
                                <li>
                                    <a
                                        className="nav-header__link-profile"
                                        href="#"
                                    >
                                        <div className="nav-header__avatar-wrapper">
                                            <img
                                                src="/assets/icons/sprite-icons-small.svg#avatar-placeholder"
                                                alt="Аватар акаунта"
                                                width="32"
                                                height="32"
                                            />
                                        </div>
                                        Акаунт
                                    </a>
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
