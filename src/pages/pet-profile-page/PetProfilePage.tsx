import './PetProfilePage.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

type PetData = {
    userId?: string;
    imageUrl?: string;
    adName?: string;
    additional?: string;
    price?: string;
    animalType?: string;
    animalVariety?: string;
    gender?: string;
    animalAge?: number;
    ageUnit?: string;
    location?: string;
    petOrigin?: string;
    sterilization?: boolean;
    vaccination?: boolean;
    chip?: boolean;
    parasite?: boolean;
    passport?: boolean;
    pedigree?: boolean;
    cynology?: boolean;
    metrics?: boolean;
}

type UserData = {
    firstName?: string;
    phone?: string;
}

const PetProfilePage = () => {
    const { petId } = useParams();
    const [petData, setPetData] = useState<PetData | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchPetData = async () => {
            if (!petId) return;

            try {
                const petRef = doc(db, 'animals', petId);
                const petSnap = await getDoc(petRef);

                if (petSnap.exists()) {
                    const pet = petSnap.data();
                    setPetData(pet);

                    if (pet.userId) {
                        const userRef = doc(db, 'users', pet.userId);
                        const userSnap = await getDoc(userRef);

                        if (userSnap.exists()) {
                            setUserData(userSnap.data());
                        } else {
                            console.log('Користувача не знайдено!');
                        }
                    }
                } else {
                    console.log('Тваринка не знайдена!');
                }
            } catch (error) {
                console.error('Помилка при завантаженні тваринки:', error);
            }
        };

        fetchPetData();
    }, [petId]);

    if (!petData) {
        return <p>Завантаження даних...</p>;
    }

    return (
        <div className='pet-profile-wrapper'>
            <div className="pet-profile app-container">
                <div className="media">
                    <div className="media__photo">
                        <img src={petData.imageUrl} alt={petData.adName} className="media__pet-image" />
                    </div>
                    <div className="additional-info">
                        <h2 className='additional-info__title'>Додаткова інформація</h2>
                        <p className="additional-info__text">
                            {petData.additional}
                        </p>
                    </div>
                </div>
                <div className="details">
                    <div className="details__header">
                        <p className="details__adName">{petData.adName}</p>
                        <p className="details__price">₴ {petData.price}</p>
                    </div>
                    <div className="details__contacts">
                        <h2 className="details__title">Контакти</h2>
                        {userData ? (
                            <>
                                <p className="details__firstName">{userData.firstName}</p>
                                <p className="details__phone">{userData.phone}</p>
                            </>
                        ) : (
                            <p>Контактні дані недоступні</p>
                        )}
                    </div>
                    <div className="characteristics">
                        <h2 className="characteristics__title">Характеристики</h2>
                        <p className="characteristics__animal-type">{petData.animalType}</p>
                        <p className="characteristics__animal-variety">{petData.animalVariety}</p>
                        <p className="characteristics__animal-gender">{petData.gender}</p>
                        <p className="characteristics__animal-age">{petData.animalAge} {petData.ageUnit}</p>
                        <p className="characteristics__animal-location">{petData.location}</p>
                        <p className="characteristics__animal-pet-origin">{petData.petOrigin}</p>
                        <div className="health">
                            Здоров'я
                            <div className="health__labels">
                                <span className='health__sterilization'>{petData.sterilization ? 'Так' : 'Ні'}</span>
                                <span className='health__vaccination'>{petData.vaccination ? 'Так' : 'Ні'}</span>
                                <span className='health__chip'>{petData.chip ? 'Так' : 'Ні'}</span>
                                <span className='health__parasite'>{petData.parasite ? 'Так' : 'Ні'}</span>
                            </div>
                        </div>
                        <div className="documents">
                            Здоров'я
                            <div className="documents__labels">
                                <span className='documents__passport'>{petData.passport ? 'Так' : 'Ні'}</span>
                                <span className='documents__pedigree'>{petData.pedigree ? 'Так' : 'Ні'}</span>
                                <span className='documents__cynology'>{petData.cynology ? 'Так' : 'Ні'}</span>
                                <span className='documents__metrics'>{petData.metrics ? 'Так' : 'Ні'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PetProfilePage;
