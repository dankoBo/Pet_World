import './PetCard.scss';
import catImage from '../../assets/cat-image.png';
import { IoLocationOutline } from 'react-icons/io5';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { IoCalendarOutline } from 'react-icons/io5';

const PetCard = () => {
    return (
        <div className="pet-card">
            <img
                className="pet-card__photo"
                src={catImage}
                alt="Зображення тваринки"
            />
            <div className="card-description">
                <h3 className="card-description__title">
                    Продам дуже хорошу 
                </h3>
                <ul className="card-description__list">
                    <li className="card-description__item">
                        <IoLocationOutline className='card-description__icon' />
                        Київ
                    </li>
                    <li className="card-description__item">
                        <BsGenderAmbiguous className='card-description__icon' />
                        Дівчинка
                    </li>
                    <li className="card-description__item">
                        <IoCalendarOutline className='card-description__icon' />3 роки
                    </li>
                </ul>
            <p className="price">₴ 220</p>
            </div>
        </div>
    );
};

export default PetCard;
