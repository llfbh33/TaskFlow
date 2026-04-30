import { useEffect, useState } from "react";
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


    // Action Functions
    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <ResourceModal title={"Add a Resource"} resource={resource} setResource={setResource} errors={errors} setErrors={setErrors} handleSubmit={handleSubmit} />
    )
}

export default AddResourceWrapper;
