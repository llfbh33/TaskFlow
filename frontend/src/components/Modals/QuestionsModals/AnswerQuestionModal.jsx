import { useState } from "react";


const AnswerQuestionsModal = ({question}) => {
    const [answer, setAnswer] = useState('');
    const [resources, setResources] = useState([{id: 1, resource: '', name: '', keywords: []}]);
    const [keywords, setKeywords] = useState([]);
    const [hidden, setHidden] = useState(true);

    return (
        <div>
            <h1>Answer your question here</h1>
            <div>
                <span>{question.question}</span>
                <div>
                    <textarea></textarea>
                </div>
            </div>
            <div>
                <span >Did you use any specific resources to help you answer this question?</span>
                <div>
                    <button onClick={() => setHidden(false)}>yes</button>
                    <button onClick={() => setHidden(true)}>no</button>
                </div>
                <div hidden={hidden}>
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
                        <select>
                            <option>this</option>
                            <option>that</option>
                            <option>the other</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <button>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AnswerQuestionsModal;
