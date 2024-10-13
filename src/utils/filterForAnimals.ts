import { Animal } from '../types'; // Імпортуйте типи, якщо у вас є типи для тварин

interface Filters {
    animalType: string;
    animalVariety: string;
    location: string;
    petOrigin: string;
    minPrice: string;
    maxPrice: string;
    free: boolean;
    minAnimalAge: string;
    maxAnimalAge: string;
    minAgeUnit: string;
    maxAgeUnit: string;
    gender: string;
    chip: boolean;
    sterilization: boolean;
    parasite: boolean;
    vaccination: boolean;
    passport: boolean;
    pedigree: boolean;
    metrics: boolean;
    cynology: boolean;
}

export const filterAnimals = (animals: Animal[], filters: Filters, convertAgeToMonths: (age: number, unit: string) => number): Animal[] => {
    const filteredAnimals = animals.filter((animal) => {
        const typeMatch = filters.animalType ? animal.animalType === filters.animalType : true;
        const varietyMatch = filters.animalVariety ? animal.animalVariety === filters.animalVariety : true;
        const locationMatch = filters.location ? animal.location === filters.location : true;
        const originMatch = filters.petOrigin ? animal.petOrigin === filters.petOrigin : true;
        
        const price = animal.price ? parseFloat(animal.price) : null;
        const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : null;
        const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : null;
        const priceMatch = 
        (minPrice === null || (price !== null && price >= minPrice)) &&
        (maxPrice === null || (price !== null && price <= maxPrice));
        const freeMatch = filters.free ? animal.free === true : true;

        const animalAgeInMonths = convertAgeToMonths(parseInt(animal.animalAge), animal.ageUnit);

        const minAgeInMonths = filters.minAnimalAge
        ? convertAgeToMonths(parseInt(filters.minAnimalAge), filters.minAgeUnit)
        : null;
        const maxAgeInMonths = filters.maxAnimalAge
        ? convertAgeToMonths(parseInt(filters.maxAnimalAge), filters.maxAgeUnit)
        : null;

        // Фільтрація по віку
        const ageMatch =
        (minAgeInMonths === null || animalAgeInMonths >= minAgeInMonths) &&
        (maxAgeInMonths === null || animalAgeInMonths <= maxAgeInMonths);

        const genderMatch = filters.gender ? animal.gender === filters.gender : true;
        const healthMatch =
            (!filters.chip || animal.chip) &&
            (!filters.sterilization || animal.sterilization) &&
            (!filters.parasite || animal.parasite) &&
            (!filters.vaccination || animal.vaccination) &&
            (!filters.passport || animal.passport) &&
            (!filters.pedigree || animal.pedigree) &&
            (!filters.metrics || animal.metrics) &&
            (!filters.cynology || animal.cynology);

        return typeMatch && varietyMatch && locationMatch && originMatch && priceMatch && freeMatch && ageMatch && genderMatch && healthMatch;
    });

    return filteredAnimals;
};
