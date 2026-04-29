import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createJournal } from "../../../store/journals";
import { useModal } from "../../../context/Modal";
import ReflectionModal from "./ReflectionsModal";


const baseReflection = {
    today: '',
    challenges: '',
    overcome: '',
    accomplish: '',
    goals: '',
    inputFields: [{ id: 1, value: '' }],
};



const CreateReflectionWrapper = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reflection, setReflection] = useState(baseReflection)


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // filter projectsString for empty fields
            const projectsString = reflection.inputFields
                .map(project => project.value.trim())
                .filter(Boolean);

            const newReflection = {
                projects: projectsString.join(','),
                today: reflection.today,
                accomplish: reflection.accomplish,
                challenges: reflection.challenges,
                overcome: reflection.overcome,
                goals: reflection.goals,
            };

            await dispatch(createJournal(newReflection));
            setReflection(baseReflection);
            closeModal();

        } catch (error) {
            console.error("Failed to create Reflection", error);
        }
    };


    return (
        <ReflectionModal title={'New Reflection'} buttonTitle={'Add Reflection'} reflection={reflection} setReflection={setReflection} handleSubmit={handleSubmit} />
    )
};

export default CreateReflectionWrapper;
