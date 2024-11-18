import { useEffect, useState } from 'react';
import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import PetCard from '../../components/pet-card/PetCard';
import UserProfileInfo from '../../components/user-profile-info/UserProfileInfo';
import Loader from '../../ui/loader/Loader';
import UserUpdateForm from '../../components/user-update-form/UserUpdateForm';
import type { RootState } from '../../store/store';
import './UserProfilePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../store/userUpdateSlice';

type PetData = {
    id: string;
    imageUrl: string;
    adName: string;
    location: string;
    gender: string;
    animalAge: string;
    price: string;
};

const UserProfilePage = () => {
    const [userPets, setUserPets] = useState<PetData[]>([]);
    const userId = auth.currentUser?.uid;
    const isUpdating = useSelector((state: RootState) => state.user.isUpdating);
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.userInfo);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    dispatch(updateUserData(userSnap.data()));
                } else {
                    console.log('Користувача не знайдено!');
                }

                const petsQuery = query(
                    collection(db, 'animals'),
                    where('userId', '==', userId)
                );

                const querySnapshot = await getDocs(petsQuery);
                const animals = querySnapshot.docs.map((doc) => {
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
                console.error('Помилка при отриманні даних:', error);
            }
        };

        fetchUserData();
    }, [userId, dispatch]);

    return (
        <div className="user-profile-wrapper">
            <section className="user-profile app-container">
                {userData ? (
                    <>
                        {!isUpdating ? (
                            <UserProfileInfo
                                userData={userData}
                                email={auth.currentUser?.email || null}
                            />
                        ) : (
                            <UserUpdateForm
                                userInfoData={{
                                    ...userData,
                                    email: auth.currentUser?.email || '',
                                }}
                                email={auth.currentUser?.email || null}
                                userId={userId || null}
                            />
                        )}
                    </>
                ) : (
                    <Loader />
                )}
                <div className="user-pets">
                    <div className="user-pets__name">
                        <h2 className="user-pets__title">Оголошення</h2>
                    </div>
                    <div className="user-pets__cards">
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
