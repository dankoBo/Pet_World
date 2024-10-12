import './AddPetPage.scss';
import AddPetForm from '../../components/add-pet-form/AddPetForm';

const AddPetPage = () => {
    return (
        <div className="add-pet-wrapper">
            <section className="add-pet">
                <AddPetForm />
            </section>
        </div>
    );
};

export default AddPetPage;
