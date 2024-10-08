import './UserProfilePage.scss'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

type UserData = {
    firstName: string;
    lastName: string;
    location: string;
    phone: string;
}

const UserProfilePage = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const userId = auth.currentUser?.uid; // Отримання ID поточного користувача

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return; // Перевірка, чи користувач увійшов у систему

            try {
                const docRef = doc(db, "users", userId); // Отримання документа з Firestore
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data() as UserData); // Збереження даних у стан
                } else {
                    console.log("Користувача не знайдено!");
                }
            } catch (error) {
                console.error("Помилка при отриманні даних користувача:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className="user-profile-wrapper">
            <section className="user-profile app-container">
                {userData ? (
                    <>
                        <div className="user-profile__name">
                            <h2 className="user-profile__name-title">
                                {userData.firstName} {userData.lastName}
                            </h2>
                            <a href="#">Редагувати дані</a>
                        </div>
                        <div className="user-profile__data">
                            <div className='user-profile__data-wrapper'>
                                <div className="user-profile__details">
                                    <div className="user-profile__avatar-wrapper">
                                        <img
                                            src="/assets/icons/sprite-icons-small.svg#location"
                                            alt="Аватар акаунта"
                                            width="32"
                                            height="32"
                                        />
                                    </div>
                                    Локація
                                </div>
                                <p>{userData.location}</p>
                            </div>
                            <div className='user-profile__data-wrapper'>
                                <div className="user-profile__details">
                                    <div className="user-profile__avatar-wrapper">
                                        <img
                                            src="/assets/icons/sprite-icons-small.svg#phone"
                                            alt="Аватар акаунта"
                                            width="32"
                                            height="32"
                                        />
                                    </div>
                                    Номер телефону
                                </div>
                                <p>{userData.phone}</p>
                            </div>
                            <div className='user-profile__data-wrapper'>
                                <div className="user-profile__details">
                                    <div className="user-profile__avatar-wrapper">
                                        <img
                                            src="/assets/icons/sprite-icons-small.svg#mail"
                                            alt="Аватар акаунта"
                                            width="32"
                                            height="32"
                                        />
                                    </div>
                                    Імейл
                                </div>
                                <p>{auth.currentUser?.email}</p> {/* Отримання email з Firebase Auth */}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Завантаження даних...</p>
                )}
            </section>
        </div>
    );
};

export default UserProfilePage;
