import './UserProfileInfo.scss';

type UserData = {
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
    return (
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
    );
};

export default UserProfileInfo;
