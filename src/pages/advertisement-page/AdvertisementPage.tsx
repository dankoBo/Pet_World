import './AdvertisementPage.scss'
import Advertisement from "../../components/advertisement/Advertisement";

const AdvertisementPage = () => {
    return (
        <div className='advertisement-page-wrapper'>
            <div className="advertisement-page app-container">
                <section className="advertisement-page__filters">
                    <Advertisement />
                </section>
            </div>
        </div>
    )
};

export default AdvertisementPage;
