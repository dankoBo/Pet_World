import './PetCategories.scss';

const PET_CATEGORIES = [
    {
        amount: 150,
        name: 'Собак',
    },
    {
        amount: 135,
        name: 'Птахів',
    },
    {
        amount: 110,
        name: 'Котів',
    },
    {
        amount: 50,
        name: 'Гризунів',
    },
    {
        amount: 10,
        name: 'Рептилій',
    },
];

type PetCategoriesProps = {
    className?: string;
}

const PetCategories: React.FC<PetCategoriesProps> = ({ className }) => {
    const wrapperClass = 'pet-categories-wrapper ' + (className ?? '');

    return (
        <div className={wrapperClass}>
            <ul className="pet-categories">
                {PET_CATEGORIES.map(({ name, amount }) => (
                    <li className="pet-category" key={name}>
                        <span className="pet-category__amount">{amount}</span>
                        <span className="pet-category__name">{name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PetCategories;
