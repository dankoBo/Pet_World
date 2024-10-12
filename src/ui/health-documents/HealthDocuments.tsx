import './HealthDocuments.scss'
type HealthDocumentsProps = {
    icon: string;
    title: string;
    statuses: { label: string; value: boolean }[];
}

const HealthDocuments: React.FC<HealthDocumentsProps> = ({ icon, title, statuses }) => {
    return (
        <div className="health-documents">
            <div className='status-block__header'>
                <img
                    src={`/assets/icons/sprite-icons-small.svg#${icon}`}
                    alt={`${title} icon`}
                    width="32"
                    height="32"
                />
                {title}
            </div>
            <div className="health-documents__labels">
                {statuses.map((status, index) => (
                    <span
                        key={index}
                        className={`status-button ${status.value ? 'status-button--active' : 'status-button--inactive'}`}
                    >
                        {status.label}: {status.value}
                    </span>
                ))}
            </div>
        </div>
    )
};

export default HealthDocuments;
