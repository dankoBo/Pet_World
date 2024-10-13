import './Advertisement.scss';
import { useState, useEffect } from 'react';
import { ANIMAL_TYPES, ANIMAL_ORIGIN } from '../../app.config';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import PetCard from '../../components/pet-card/PetCard';
import { SelectChangeEvent } from '@mui/material';
import GeneralFilters from './general-filter/GeneralFilter';
import PriceFilter from './price-filter/PriceFilter';
import AgeFilter from './age-filter/AgeFilter';
import GenderFilter from './gender-filter/GenderFilter';
import HealthFilter from './health-filter/HealthFilter';
import DocumentsFilter from './documents-filter/DocumentsFilter';
import { filterAnimals } from '../../utils/filterForAnimals';
import Pagination from '@mui/material/Pagination';
import Button from '../../ui/button/Button';

const Advertisement = () => {
    const [filters, setFilters] = useState({
        animalType: '',
        animalVariety: '',
        location: '',
        petOrigin: '',
        minPrice: '',
        maxPrice: '',
        free: false,
        minAnimalAge: '',
        maxAnimalAge: '',
        minAgeUnit: 'місяці (-ів)',
        maxAgeUnit: 'місяці (-ів)',
        gender: '',
        chip: false,
        sterilization: false,
        parasite: false,
        vaccination: false,
        passport: false,
        pedigree: false,
        metrics: false,
        cynology: false,
    });

    const resetFilters = () => {
        setFilters({
            animalType: '',
            animalVariety: '',
            location: '',
            petOrigin: '',
            minPrice: '',
            maxPrice: '',
            free: false,
            minAnimalAge: '',
            maxAnimalAge: '',
            minAgeUnit: 'місяці (-ів)',
            maxAgeUnit: 'місяці (-ів)',
            gender: '',
            chip: false,
            sterilization: false,
            parasite: false,
            vaccination: false,
            passport: false,
            pedigree: false,
            metrics: false,
            cynology: false,
        });
        loadAnimalData();
    };

    const [animalVarieties, setAnimalVarieties] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [animals, setAnimals] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const loadAnimalData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'animals'));
            const varietiesSet = new Set<string>();
            const locationsSet = new Set<string>();
            const animalsList: any[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.animalVariety) varietiesSet.add(data.animalVariety);
                if (data.location) locationsSet.add(data.location);
                animalsList.push({ id: doc.id, ...data });
                
            });

            setAnimalVarieties(Array.from(varietiesSet));
            setLocations(Array.from(locationsSet));
            setAnimals(animalsList);

        } catch (error) {
            console.error('Помилка при завантаженні даних з Firestore:', error);
        }
    };

    useEffect(() => {
        loadAnimalData();
    }, []);

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    const convertAgeToMonths = (age: number, unit: string): number => {
        if (unit === 'роки (-ів)') {
          return age * 12;
        }
        return age;
    };

    const handleFilterApply = () => {
        const filteredAnimals = filterAnimals(animals, filters, convertAgeToMonths);
        setAnimals(filteredAnimals);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAnimals = animals.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div className='advertisement-wrapper'>
            <h2 className="advertisement__title">Фільтри</h2>
            <div className="advertisement app-container">
                <section className="advertisement__filters">
                    <GeneralFilters
                        filters={filters}
                        handleSelectChange={handleSelectChange}
                        ANIMAL_TYPES={ANIMAL_TYPES}
                        animalVarieties={animalVarieties}
                        locations={locations}
                        ANIMAL_ORIGIN={ANIMAL_ORIGIN}
                    />
                    <AgeFilter 
                        filters={filters}
                        handleTextFieldChange={handleTextFieldChange}
                        handleSelectChange={handleSelectChange}
                    />
                    <PriceFilter 
                        filters={filters}
                        handleTextFieldChange={handleTextFieldChange}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <GenderFilter
                        filters={filters}
                        handleSelectChange={handleSelectChange}
                    />
                    <HealthFilter 
                        filters={filters}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <DocumentsFilter 
                        filters={filters}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <div className='advertisement__filter-actions'>
                        <Button className='filter' onClick={handleFilterApply}>Застосувати фільтри</Button>
                        <Button className='filter' onClick={resetFilters}>Скинути фільтр</Button>
                    </div>
                </section>
                <div className='advertisement-animals-pagination'>
                    <section className='advertisement__animals'>
                        {currentAnimals.map((pet) => (
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
                        ))}
                    </section>
                    <div className="pagination">
                        <Pagination 
                            count={Math.ceil(animals.length / itemsPerPage)} 
                            page={currentPage} 
                            onChange={handlePageChange} 
                            variant="outlined" 
                            shape="rounded" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Advertisement;
