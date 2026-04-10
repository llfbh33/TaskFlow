import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateResource } from "../../../store/resources";
import ResourceModal from "./ResourceModal";

const EditResourceWrapper = ({ resource }) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [name, setName] = useState(resource.name);
    const [url, setUrl] = useState(resource.url);
    const { closeModal } = useModal();
    const [keyOptions, setKeyOptions] = useState(resource.keyWords.split(','));


    // Action Functions
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newResource = {
            id: resource.id,
            userId: user.id,
            name: name,
            url: url,
            keyWords: keyOptions.join(',')
        };

        await dispatch(updateResource(newResource));

        closeModal();
    };


    return (
        <>
            <ResourceModal title={"Edit a Resource"} name={name} setName={setName} url={url} setUrl={setUrl} keyOptions={keyOptions} setKeyOptions={setKeyOptions} handleSubmit={handleSubmit} />
        </>
    )
}

export default EditResourceWrapper;
