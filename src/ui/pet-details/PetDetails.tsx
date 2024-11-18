import './PetDetails.scss';

type PetDetailsProps = {
    icon: string;
    label: string;
    data: string;
};

const PetDetails: React.FC<PetDetailsProps> = ({ icon, label, data }) => {
    return (
        <div className="pet-details">
            <div className="pet-details__icon">
                <img
                    src={`/assets/icons/sprite-icons-small.svg#${icon}`}
                    alt="icon"
                    width="32"
                    height="32"
                />
                {label}
            </div>
            {data}
        </div>
    );
};

export default PetDetails;
