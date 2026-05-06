import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateResource } from "../../../store/resources";
import ResourceModal from "./ResourceModal";

// const baseResource = {
//     name: '',
//     url: '',
//     keyOptions: []
// };

const baseErrors = {
    name: 0,
    url: 0,
    keywords: 0,
}


const EditResourceWrapper = ({ editResource }) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [resource, setResource] = useState({ ...editResource, keyOptions: editResource.keyWords.split(',') });
    const [errors, setErrors] = useState(baseErrors);


    const validateResource = () => {
        const validationErrors = {};

        if (resource.name.trim().length < 2 || resource.name.trim().length > 100) {
            validationErrors.name = "Name must be between 2 and 100 characters.";
        }

        if (resource.url.trim().length < 2 || resource.url.trim().length > 600) {
            validationErrors.url = "URL must be between 2 and 600 characters.";
        }

        if (!resource.keyOptions.length) {
            validationErrors.keyWords = "Add at least one keyword.";
        }

        return validationErrors;
    };

    // Action Functions
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateResource();

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        try {
            const newResource = {
                id: resource.id,
                userId: user.id,
                name: resource.name,
                url: resource.url,
                keyWords: resource.keyOptions.join(',')
            };

            await dispatch(updateResource(newResource));
            closeModal();

        } catch (error) {
            console.error("Resouce did not update", error)
        }
    };


    return (
        <>
            <ResourceModal title={"Edit a Resource"} resource={resource} setResource={setResource} errors={errors} handleSubmit={handleSubmit} />
        </>
    )
}

export default EditResourceWrapper;
