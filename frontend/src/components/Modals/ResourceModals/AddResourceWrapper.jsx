import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addResource } from "../../../store/resources";
import ResourceModal from "./ResourceModal";

const AddResourceWrapper = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const { closeModal } = useModal();
    const [keyOptions, setKeyOptions] = useState([]);


    // Action Functions
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newResource = {
            userId: user.id,
            name: name,
            url: url,
            keyWords: keyOptions.join(',')
        };

        await dispatch(addResource(newResource));

        closeModal();
    };

    return (
        <ResourceModal title={"Add a Resource"} name={name} setName={setName} url={url} setUrl={setUrl} keyOptions={keyOptions} setKeyOptions={setKeyOptions} handleSubmit={handleSubmit} />
    )
}

export default AddResourceWrapper;
