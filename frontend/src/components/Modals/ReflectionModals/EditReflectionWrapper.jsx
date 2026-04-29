import { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateJournal } from "../../../store/journals";
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



const EditResourceWrapper = ({reflectionId, editReflection}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reflection, setReflection] = useState({
        today: editReflection.today,
        challenges: editReflection.challenges,
        overcome: editReflection.overcome,
        accomplish: editReflection.accomplish,
        goals: editReflection.goals,
        inputFields: editReflection.projects
            .split(',')
            .map((field, index) => ({
                id: index + 1,
               value: field,
            })
        )
    });



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

            await dispatch(updateJournal(reflectionId, newReflection));
            setReflection(baseReflection);
            closeModal();

        } catch (error) {
            console.error("Failed to create Reflection", error);
        }
    };


    return (
        <ReflectionModal title={'Edit Reflection'} buttonTitle={'Edit Reflection'} reflection={reflection} setReflection={setReflection} handleSubmit={handleSubmit} />
    )
}

export default EditResourceWrapper;
