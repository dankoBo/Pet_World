import './MainPage.scss';
import { useEffect, useState } from 'react';
import PetCard from '../../components/pet-card/PetCard';
import PetCategories from '../../components/pet-categories/PetCategories';
import SearchForm from '../../components/search-form/SearchForm';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore';

type PetData = {
    id: string;
    adName: string;
    location: string;
    gender: string;
    animalAge: string;
    price: string;
    imageUrl: string;
}

const MainPage = () => {
    const [pets, setPets] = useState<PetData[]>([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const petsQuery = query(
                    collection(db, 'animals'),
                    orderBy('createdAt', 'desc'),
                    limit(4)
                );
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
                setPets(animals);
            } catch (error) {
                console.error("Помилка при отриманні тварин:", error);
            }
        };

        fetchPets();
    }, []);

    return (
        <div className="main-page-wrapper">
            <div className="main-page app-container">
                <header className="global-header">
                    <h1 className="main-page__main-header">
                        Звідси починається найкраща дружба
                    </h1>
                    <SearchForm />
                </header>
                <PetCategories className="main-page__pet-categories" />
                <section className="newest-ads-section">
                    <h2 className="newest-ads-section__header">Найновіші оголошення</h2>
                    <div className='newest-ads-section__pet-cards'>
                        {pets.length > 0 ? (
                            pets.map(pet => (
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
                            <p>Немає доступних тваринок.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MainPage;
