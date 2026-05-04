import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { updateQuestion } from "../../../store/questions";
import { addResource } from "../../../store/resources";


const AnswerQuestionsModal = ({question}) => {
    const user = useSelector(state => state.session.user);
    const [answer, setAnswer] = useState('');
    const [resources, setResources] = useState('');
    const [keywords, setKeywords] = useState([])
    const [hidden, setHidden] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    useEffect(() => {
        const validations = {};
        if (answer.length <= 0) validations.answer = 'Please provide an answer to your question';

        setErrors(validations);

    }, [answer]);

    useEffect(() => {
        if (!question.keyWords) {
            setKeywords([{id: 0, value: ''}])
        } else {
            const array = question.keyWords.split(',');
            const updateKeywords = {};
            array.forEach((word, idx) => {
                updateKeywords['id'] = idx;
                updateKeywords['value'] = word;
            });
            setKeywords(updateKeywords);
        }

    }, [question.keyWords])


    const handleQuestionAddKeyword = () => {
        const addWord = [...keywords, {id: keywords[keywords.length - 1].id + 1, value: ''}];
        setKeywords(addWord);
        console.log(keywords)
    }

    const handleQuestionKeywordChange = (idx, target) => {
        const changeKeyword = [...keywords];
        changeKeyword[idx] = target;
        setKeywords(changeKeyword);
    }

    const handleResourceURLChange = (idx, value) => {
        const updateResource = [...resources];
        updateResource[idx].url = value;
        setResources(updateResource);
    }

    const handleResourceNameChange = (idx, value) => {
        const updateResource = [...resources];
        updateResource[idx].name = value;
        setResources(updateResource);
    }

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

    const handleSelectKey = (target, idx) => {
        const updateResources = [...resources];
        const array = [...updateResources[idx].keywords];
        if (!array.includes(target)) {
            array.push(target);
            updateResources[idx].keywords = array;
            setResources(updateResources);
        }
    }

    const handleRemoveKeyword = (idx, index) => {
        const removeKeyword = [...resources];
        const array = [...removeKeyword[idx].keywords];
        array.splice(index, 1);
        removeKeyword[idx].keywords = array;
        setResources(removeKeyword);
    }

    const handleAnswer = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) {
            setShowErrors(true);
            return;
        }

        // does not work for keywords
        let newKeywords = [];
        if (keywords.length) {
            for (let word of keywords) {
                if (word.value) {
                    newKeywords.push(word.value)
                }
            }
        }

        const addAnswer = {
            id: question.id,
            answer,
            keyWords: newKeywords.join(',')
        };

        await dispatch(updateQuestion(addAnswer));

        // works for atleast one resource
        if (resources.length) {
            for (let resource of resources) {
                let newResource = {
                    userId: user.id,
                    name: resource.name,
                    url: resource.url,
                    keyWords: resource.keywords.join(',')
                }
                await dispatch(addResource(newResource));
            }
        }

        await closeModal();

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
                        onChange={(e) => setAnswer(e.target.value)}
                        />
                </div>
                <div>{`${answer.length}/600`}</div>
                {showErrors && errors.answer ? <p>{errors.answer}</p> : <p></p>}
            </div>
            <div>
                <h3>Question Keywords</h3>
                <p>Add some keywords to your question so you can easily look it up later</p>
                {keywords.map((word, idx) => (
                    <div key={idx}>
                        <input
                            type='text'
                            value={word.value}
                            onChange={(e)=> handleQuestionKeywordChange(idx, e.target.value)}></input>
                    </div>
                ))}
                <div>
                    <button onClick={handleQuestionAddKeyword}>Add a keyword to your question</button>
                </div>
            </div>
            <div>
                <div>
                    {resources && resources.reverse().map((resource, idx) => (
                        <div hidden={hidden} key={idx}>
                            <div>
                                <label>Resource URL</label>
                                <input
                                    type='text'
                                    value={resource.url}
                                    onChange={(e) => handleResourceURLChange(idx, e.target.value)}
                                    ></input>
                            </div>
                            <div>
                                <label>Please provide a descriptive name:</label>
                                <input
                                    type='text'
                                    value={resource.name}
                                    onChange={(e) => handleResourceNameChange(idx, e.target.value)}></input>
                            </div>
                            <div>
                                <label>Keywords</label>
                                <select onChange={(e) => handleSelectKey(e.target.value, idx)}>
                                    <option>Documentation</option>
                                    <option>React</option>
                                    <option>Python</option>
                                    <option>JavaScript</option>
                                    <option>Thunks</option>
                                    <option>Redux</option>
                                    <option>Google</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <h3>Keywords</h3>
                                {resource.keywords.map((ele, index) => (
                                    <div key={index}>
                                        <span>{ele}</span>
                                        <button onClick={() => handleRemoveKeyword(idx, index)}>Remove keyword</button>
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
                    <button onClick={() => !hidden ? setHidden(true) : setHidden(false)}>{!hidden ? 'Hide Resources' : 'Show Resources'}</button>
                </div>
            </div>
            <div>
                <button
                    type='submit'
                    onClick={(e) => handleAnswer(e)}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AnswerQuestionsModal;
