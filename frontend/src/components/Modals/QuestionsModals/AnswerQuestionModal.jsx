import { useState } from "react";


const AnswerQuestionsModal = ({question}) => {
    const [answer, setAnswer] = useState('');
    const [resources, setResources] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [hidden, setHidden] = useState(true);

    const handleAddResource = () => {
        if (resources.length <= 0) {
            setHidden(false);
            setResources([{id: 0, url: '', name: '', keywords: []}])
        } else {
            const newResource = ([...resources, {id: resources[resources.length - 1].id + 1 , url: '', name: '', keywords: []}])
            setResources(newResource);
        }
    }

    const handleRemoveResource = (id) => {
        console.log(resources)
        const removeResource = [...resources]
        removeResource.splice(id, 1);
        if (resources.length <= 0) {
            setHidden(true);
            setResources('');
        } else {
            setResources(removeResource);
        }
    }

    const handleSelect = (target) => {
        const array = [...keywords]
        array.push(target);
        setKeywords(array)
    }

    const handleAnswer = () => {
        
    }

    return (
        <div>
            <h1>Answer your question here</h1>
            <div>
                <span>{question.question}</span>
                <div>
                    <textarea
                        type='text'
                        value={answer}
                        onChange={() => setAnswer(e.target.value)}
                        />
                </div>
            </div>
            <div>
                <div>
                    {resources && resources.reverse().map((resource, idx) => (
                        <div hidden={hidden} key={idx}>
                            <div>
                                <label>Resource URL</label>
                                <input
                                    type='URL'
                                    ></input>
                            </div>
                            <div>
                                <label>Please provide a descriptive name:</label>
                                <input></input>
                            </div>
                            <div>
                                <label>Keywords</label>
                                <select onChange={(e) => handleSelect(e.target.value)}>
                                    <option>Documentation</option>
                                    <option>React</option>
                                    <option>Python</option>
                                    <option>JavaScript</option>
                                    <option>Thunks</option>
                                    <option>Redux</option>
                                    <option>Google</option>
                                </select>
                            </div>
                            <div>
                                <h3>Keywords</h3>
                                {keywords.map((ele, idx) => (
                                    <div key={idx}>
                                        <span>{ele}</span>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button onClick={() => handleRemoveResource(idx)}>Remove Resource</button>
                            </div>
                        </div>
                    ))}
                </div>
                <span >Did you use any specific resources to help you answer this question?</span>
                <div>
                    <button onClick={handleAddResource}>Add a Resource</button>
                    <button onClick={() => setHidden(true)}>no</button>
                </div>
            </div>
            <div>
                <button
                    type='submit'
                    onClick={handleAnswer}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AnswerQuestionsModal;
