import './UserProfilePage.scss'
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import PetCard from '../../components/pet-card/PetCard';
import Button from '../../ui/button/Button';
import UserProfileInfo from '../../components/user-profile-info/UserProfileInfo';
import Loader from '../../ui/loader/Loader';

type UserData = {
    firstName: string;
    lastName: string;
    location: string;
    phone: string;
}

type PetData = {
    id: string;
    imageUrl: string;
    adName: string;
    location: string;
    gender: string;
    animalAge: string;
    price: string;
}

const UserProfilePage = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userPets, setUserPets] = useState<PetData[]>([]);
    const navigate = useNavigate();
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUserData(userSnap.data() as UserData);
                } else {
                    console.log("Користувача не знайдено!");
                }

                const petsQuery = query(collection(db, 'animals'), where('userId', '==', userId));
                const querySnapshot = await getDocs(petsQuery);
                const animals = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        imageUrl: data.imageUrl || '',
                        adName: data.adName || '',
                        location: data.location || '',
                        gender: data.gender || '',
                        animalAge: data.animalAge || '',
                        price: data.price || 0,
                    } as PetData;
                });
                setUserPets(animals);
            } catch (error) {
                console.error("Помилка при отриманні даних:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Помилка при виході з акаунту:", error);
        }
    };

    return (
        <div className="user-profile-wrapper">
            <section className="user-profile app-container">
                {userData ? (
                    <>
                        <div className="user-profile__name">
                            <h2 className="user-profile__name-title">
                                {userData.firstName} {userData.lastName}
                            </h2>
                            <div className='user-profile__manage'>
                                <a href="#">Редагувати дані</a>
                                <Button className='warning' onClick={handleLogout}>Вийти з акаунту</Button>
                            </div>
                        </div>
                        <UserProfileInfo userData={userData} email={auth.currentUser?.email || null} />
                    </>
                ) : (
                    <Loader />
                )}
                <div className="user-pets">
                    <div className="user-pets__name">
                        <h2 className="user-pets__title">
                            Оголошення
                        </h2>
                    </div>
                    <div className='user-pets__cards'>
                        {userPets.length > 0 ? (
                            userPets.map((pet) => (
                                <PetCard
                                    key={pet.id}
                                    adName={pet.adName}
                                    location={pet.location}
                                    gender={pet.gender}
                                    animalAge={pet.animalAge}
                                    price={pet.price}
                                    imageUrl={pet.imageUrl}
                                    id={pet.id}
                                />
                            ))
                        ) : (
                            <p>Немає доданих тваринок</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserProfilePage;
