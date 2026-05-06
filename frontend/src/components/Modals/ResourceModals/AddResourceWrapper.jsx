import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addResource } from "../../../store/resources";
import ResourceModal from "./ResourceModal";

const baseResource = {
    name: '',
    url: '',
    keyOptions: []
};

const baseErrors = {
    name: 0,
    url: 0,
    keywords: 0,
}


const AddResourceWrapper = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [resource, setResource] = useState(baseResource);
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
                userId: user.id,
                name: resource.name,
                url: resource.url,
                keyWords: resource.keyOptions.join(',')
            };

            await dispatch(addResource(newResource));
            closeModal();

        } catch (error) {
            console.error("Resouce was not created", error)
        }
    };

    return (
        <ResourceModal title={"Add a Resource"} resource={resource} setResource={setResource} errors={errors} handleSubmit={handleSubmit} />
    )
}

export default AddResourceWrapper;
