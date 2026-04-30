import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateResource } from "../../../store/resources";
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


const EditResourceWrapper = ({ editResource }) => {
    console.log('resource', editResource)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [resource, setResource] = useState({ ...editResource, keyOptions: editResource.keyWords.split(',') });
    // const [errors, setErrors] = useState(baseErrors);


    // Action Functions
    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <ResourceModal title={"Edit a Resource"} resource={resource} setResource={setResource} handleSubmit={handleSubmit} />
        </>
    )
}

export default EditResourceWrapper;
