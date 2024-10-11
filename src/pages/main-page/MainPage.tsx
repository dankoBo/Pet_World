import PetCard from '../../components/pet-card/PetCard';
import PetCategories from '../../components/pet-categories/PetCategories';
import SearchForm from '../../components/search-form/SearchForm'
import './MainPage.scss';

const MainPage = () => {
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
                        <PetCard />
                        <PetCard />
                        <PetCard />
                        <PetCard />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MainPage;
