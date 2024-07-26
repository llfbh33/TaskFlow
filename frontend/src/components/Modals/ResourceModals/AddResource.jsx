import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addResource } from "../../../store/resources";

const AddResource = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const { closeModal } = useModal();
    const [inputKeys, setInputKeys] = useState([{id: 1, value: ''}]);

    const handleKeyChange = (id, value) => {
        const updateKey = inputKeys.map(key => key.id === id ? {...key, value} : key);
        setInputKeys(updateKey);
    }

    const handleAddKeyword = () => {
        const newKeyword = ([...inputKeys, { id: inputKeys.length + 1, value: ''}]);
        setInputKeys(newKeyword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const keywordString = inputKeys.map(key => key.value);

        const newResource = {
            userId: user.id,
            name: name,
            url: url,
            keyWords: keywordString.join(',')
        };

        await dispatch(addResource(newResource));

        closeModal();
    }

    return (
        <div>
            <h1>Add a Resource</h1>
            <div>
                <div>
                    <label>Resource Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Resource URL</label>
                    <input
                        type='url'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div>
                    <label>Keywords for Resource</label>
                    {inputKeys.map(keyword => (
                        <div key={keyword.id}>
                            <input
                                type='text'
                                value={keyword.value}
                                onChange={(e) => handleKeyChange(keyword.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button className='add-pointer-cursor' onClick={handleAddKeyword}>Add Keyword</button>
                </div>
                <button className='add-pointer-cursor' type='submit' onClick={(e) => handleSubmit(e)}>Submit Resource</button>
            </div>
        </div>
    )
}

export default AddResource;
