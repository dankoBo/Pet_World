import './PetCard.scss';
import { IoLocationOutline } from 'react-icons/io5';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { IoCalendarOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type PetCardProps = {
    id: string;
    imageUrl: string;
    adName: string;
    location: string;
    gender: string;
    animalAge: string;
    price: string;
}

const PetCard: React.FC<PetCardProps> = ({ adName, location, gender, animalAge, price, imageUrl, id }) => {
    console.log('PetCard ID:', id);
    return (
        <Link to={`/pet-profile/${id}`} className="pet-card">
            <img
                className="pet-card__photo"
                src={imageUrl}
                alt="Зображення тваринки"
            />
            <div className="card-description">
                <h3 className="card-description__title">
                    {adName} 
                </h3>
                <ul className="card-description__list">
                    <li className="card-description__item">
                        <IoLocationOutline className='card-description__icon' />
                        {location}
                    </li>
                    <li className="card-description__item">
                        <BsGenderAmbiguous className='card-description__icon' />
                        {gender}
                    </li>
                    <li className="card-description__item">
                        <IoCalendarOutline className='card-description__icon' />
                        {animalAge}
                    </li>
                </ul>
            <p className="price">₴ {price}</p>
            </div>
        </Link>
    );
};

export default PetCard;
