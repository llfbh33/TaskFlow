import { useSelector } from "react-redux"

const UsersQuestions = () => {
    const allQuestions = useSelector(state => state.questions)

    return (
        <div className='profile-selected-section'>
            <h1>Questions</h1>
            <div>
                {Object.values(allQuestions).map(ele => (
                    <div key={ele.id} className="questions-card">
                        <span>{ele.createdAt}</span>
                        <span>{ele.question}</span>
                        { ele.answer ? <span>{ele.answer}</span> : <button>Answer this question</button> }
                    </div>
                ))}
            </div>
        </div>
    )
}


export default UsersQuestions
