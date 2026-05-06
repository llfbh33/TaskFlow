import { useState } from "react";


const SiteExplination = () => {
    const [selected, setSelected] = useState('');

    return (
        <div className="profile-selected-section">
            <h1>Explination of my project, its components, and such!!!</h1>
            <div>
                <h3>Would you like information on the Search section?</h3>
            </div>
            <div>
                <h3>Would you like information on the Calender section?</h3>
            </div>
            <div>
                <h3>Would you like information on the Unassigned Tasks section?</h3>
            </div>
            <div className="width-size">
                <h3 onClick={() => selected === 'questions' ? setSelected('') : setSelected('questions')} className="add-pointer-cursor" >Would you like information on the Questions section?</h3>
                <div hidden={selected !== 'questions'} >
                    <h4>This is information all about the questions tab!</h4>
                    <Questions />
                </div>
            </div>
            <div className="width-size">
                <h3 onClick={() => selected === 'reflections' ? setSelected('') : setSelected('reflections')} className="add-pointer-cursor">Would you like information on the Reflections section?</h3>
                <div hidden={selected !== 'reflections'} >
                    <h4>This is information all about the reflections tab!</h4>
                    <Reflections />
                </div>
            </div>
        </div>
    )
}

export default SiteExplination;


const Questions = () => {
    return (
        <div className="padding-left">
            <p>
                {`Excuse me! I am confused! Yes, me, here! I have my hand up and your not calling on me!  Hellloooooo!
                Uhhh.... okay.... I guess I will just save it for later...`}
            </p>
            <p>
                {`How often do you have a question about some obscure thing that you are either really curious about
                or feel like it could be imensly important to know in the future but you just don't have the time
                to look into it right now?`}
            </p>
            <p>
                {`The point of the questions tab is to hold your questions for yourself for answering at a later date.
                This way, your questions are stored in a recognizable location without getting lost in this or that
                note taking app, a notebook, or the either.  Questions are important and they help us grow, both in
                our professional careers and as a human being.`}
            </p>
            <p>
                {`The questions tab provides you with a place to keep all of your questions that you can't answer right
                now in one place, see the answers to those questions, and see when you answered the question.  This
                is important because, just because you answered a question does not mean you went down the rabbit hole.
                You may have answered that one but gained 5 others.  And again, no time.  This section can be a resource
                to come back to to help work into new ideas and methods of programming.`}
            </p>
            <p>
                {`Some implementations we intend to add to the questions tab in the future:`}
            </p>
            <ul>
                <li>
                    {`Ability to search questions by key words`}
                </li>
                <li>
                    {`Ability to search questions by when they were answered (you may have been deep into a certain learing situation at that time)`}
                </li>
                <li>
                    {`Search questions by resources used`}
                </li>
            </ul>
        </div>
    )
}

const Reflections = () => {
    return (
        <div >
            <p>{`When you are looking for a job, or even just browsing around, your practicing your skills and
                working hard on your projects as well as all your other responsibilities.  But how easy is it
                to remember what you worked on last week, last month, that little win you had so long ago that

                
                really made you feel like "I know what I'm doing!". It is hard! Your a hard working
                professional indidual who has so much to do all the time, how can you place all the
                insignificant details, not matter how large they are.`}
            </p>
            <p>
                {`The point of the reflections section is to provide you with the ability to keep notes and be
                prompted with questions which will help you keep a log of what you do on a daily basis.  While
                it may seem a little ridiculous to be keeping a work journal it can also be very helpful when
                it comes to interview.  Those questions which come up, "What have you done on X project in the
                last week", "What have you been activly learning lately" and the like, can be answered much more
                easily if you have a simple to access location where all that information is already logged and
                ready to be reviewed before an interview.  No more trying to come up with answers on the spot.`}
            </p>
            <p>
                {`The reflections tab provides users with their most recent reflections at the top of the list
                or the ability to select only those reflections posted within the last week, two weeks, or
                month. When adding a reflection you are asked to answer what you worked on or a list of what you
                worked on, which leads us into future implementations.`}
            </p>
            <p>
                {`The intention is to add these functionalities to the reflections tab:`}
            </p>
            <ul>
                <li>
                    {`A search bar which the user can use to search for all reflections associated to a certain project`}
                </li>
                <li>
                    {`Better styling to make the graphical interface more pleasing to interact with`}
                </li>
                <li>
                    {`A cleaner modal, or even a page for adding a new reflection`}
                </li>
            </ul>
        </div>
    )
}
