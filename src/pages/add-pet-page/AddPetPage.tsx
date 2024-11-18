import AddPetForm from '../../components/add-pet-form/AddPetForm';
import './AddPetPage.scss';

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
