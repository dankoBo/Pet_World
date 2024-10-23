import './PetProfilePage.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import PetDetails from '../../ui/pet-details/PetDetails';
import HealthDocuments from '../../ui/health-documents/HealthDocuments';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';

type PetData = {
    userId?: string;
    imageUrl?: string;
    adName?: string;
    additional?: string;
    price?: string;
    animalType?: string;
    animalVariety?: string;
    gender?: string;
    animalAge?: string;
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
    const userId = auth.currentUser?.uid;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetData = async () => {
            if (!petId) {
                console.error('No petId provided!');
                return;
            }
    
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

    const handleDelete = async () => {
        if (!petId) return;

        try {
            const petRef = doc(db, 'animals', petId);
            await deleteDoc(petRef);
            console.log("Тваринка успішно видалена!");
            navigate('/user-profile');
        } catch (error) {
            console.error("Помилка при видаленні тваринки:", error);
        }
    };

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
                        <p className="details__price">₴ {petData.price || '0'}</p>
                    </div>
                    <div className="details-contacts">
                        <h2 className="section-title">Контакти</h2>
                        {userData ? (
                            <>
                                <PetDetails
                                    icon="person"
                                    label="Контактна особа"
                                    data={userData.firstName || ''}
                                />
                                <PetDetails
                                    icon="phone"
                                    label="Номер телефону"
                                    data={userData.phone || ''}
                                />
                            </>
                        ) : (
                            <p>Контактні дані недоступні</p>
                        )}
                    </div>
                    <div className="characteristics">
                        <div>
                            <h2 className="section-title">Характеристики</h2>
                            <PetDetails
                                icon="paw"
                                label="Вид"
                                data={petData.animalType || ''}
                            />
                            <PetDetails
                                icon="label"
                                label="Різновид"
                                data={petData.animalVariety || ''}
                            />
                            <PetDetails
                                icon="sex"
                                label="Стать"
                                data={petData.gender || ''}
                            />
                            <PetDetails
                                icon="calendar"
                                label="Вік"
                                data={petData.animalAge || ''}
                            />
                            <PetDetails
                                icon="location"
                                label="Локація"
                                data={petData.location || ''}
                            />
                            <PetDetails
                                icon="house"
                                label="Походження"
                                data={petData.petOrigin || ''}
                            />
                        </div>
                        <div>
                            <HealthDocuments
                                icon="health-shield"
                                title="Здоров'я"
                                statuses={[
                                    { label: 'Стерилізація', value: petData.sterilization ?? false },
                                    { label: 'Вакцинація', value: petData.vaccination ?? false },
                                    { label: 'Чіп', value: petData.chip ?? false },
                                    { label: 'Обробка від паразитів', value: petData.parasite ?? false },
                                ]}
                            />
                            <HealthDocuments
                                icon="document"
                                title="Документи"
                                statuses={[
                                    { label: 'Ветаспорт', value: petData.passport ?? false },
                                    { label: 'Родовід', value: petData.pedigree ?? false },
                                    { label: 'FCI/KCY', value: petData.cynology ?? false },
                                    { label: 'Метрика цуценяти', value: petData.metrics ?? false },
                                ]}
                            />
                        </div>
                    </div>
                    {userId && (
                        <Button className='warning' onClick={handleDelete}>Видалити</Button>
                    )}
                </div>
            </div>
        </div>
    )
};

export default PetProfilePage;
