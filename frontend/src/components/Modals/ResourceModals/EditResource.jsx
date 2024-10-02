import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addResource } from "../../../store/resources";
import { updateResource } from "../../../store/resources";

const EditResource = ({resource}) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [name, setName] = useState(resource.name);
    const [url, setUrl] = useState(resource.url);
    const { closeModal } = useModal();
    const [keyOptions, setKeyOptions] = useState(resource.keyWords.split(','));
    console.log(resource)

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
    }

    const handleOption = (value) => {
        let options = [...keyOptions]
        options.includes(value) ? '' : options.push(value);
        setKeyOptions(options);
    }

    const deleteKey = (idx) => {
        let keywords = [...keyOptions];
        keywords.splice(idx, 1)
        setKeyOptions(keywords)
    }

    return (
        <div>
            <h1>Edit a Resource</h1>
            <div>
                <div>
                    <label>Resource Description</label>
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
                    <label>Keywords for Resource:</label>
                    <ul>
                        {keyOptions.map((option, idx) => (
                            <li key={idx}>{option}<button onClick={() => deleteKey(idx)}>X</button></li>
                        ))}
                    </ul>
                    <select
                        id="dropdown"
                        onChange={(e) => handleOption(e.target.value)}
                        >
                            <option value="">--Please choose Relevant Keywords--</option>
                            <option value="Coding Languages">Coding Languages</option>
                            <option value="System Design">System Design</option>
                            <option value="Frameworks">Frameworks</option>
                            <option value="Algorithms">Algorithms</option>
                            <option value="Version Control">Version Control</option>
                            <option value="Soft Skills">Soft Skills</option>
                            <option value="Debugging">Debugging</option>
                            <option value="Career Strategy">Career Strategy</option>
                    </select>
                </div>
                <button className='add-pointer-cursor' type='submit' onClick={(e) => handleSubmit(e)}>Submit Resource</button>
            </div>
        </div>
    )
}

export default EditResource;
