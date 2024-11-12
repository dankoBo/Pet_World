import './UserProfileInfo.scss';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';


type UserData = {
    firstName: string;
    lastName: string;
    location: string;
    phone: string;
};

type UserProfileInfoProps = {
    userData: UserData | null;
    email: string | null;
};

const UserProfileInfo: React.FC<UserProfileInfoProps> = ({
    userData,
    email,
}) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Помилка при виході з акаунту:", error);
        }
    };

    return (
        <>
            <div className="user-profile-info__name">
                <h2 className="user-profile__name-title">
                    {userData?.firstName} {userData?.lastName}
                </h2>
                <div className='user-profile-info__manage'>
                    <a href="#">Редагувати дані</a>
                    <Button className='warning' onClick={handleLogout}>Вийти з акаунту</Button>
                </div>
            </div>
            <div className="user-profile-info">
                <div className="user-profile-info__wrapper">
                    <div className="user-profile-info__details">
                        <div>
                            <img
                                src="/assets/icons/sprite-icons-small.svg#location"
                                alt="Аватар акаунта"
                                width="32"
                                height="32"
                                />
                        </div>
                        Локація
                    </div>
                    <p>{userData?.location}</p>
                </div>
                <div className="user-profile-info__wrapper">
                    <div className="user-profile-info__details">
                        <div>
                            <img
                                src="/assets/icons/sprite-icons-small.svg#phone"
                                alt="Аватар акаунта"
                                width="32"
                                height="32"
                                />
                        </div>
                        Номер телефону
                    </div>
                    <p>{userData?.phone}</p>
                </div>
                <div className="user-profile-info__wrapper">
                    <div className="user-profile-info__details">
                        <div>
                            <img
                                src="/assets/icons/sprite-icons-small.svg#mail"
                                alt="Аватар акаунта"
                                width="32"
                                height="32"
                                />
                        </div>
                        Імейл
                    </div>
                    <p>{email}</p>
                </div>
            </div>
        </>
    );
};

export default UserProfileInfo;
