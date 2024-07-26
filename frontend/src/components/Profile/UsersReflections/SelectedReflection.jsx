const SelectedReflection = ({reflection}) => {

    if (!reflection) return

    return (
        <div className="open-reflection-container">
            <div className="reflections-questions-card reflection-projects">
                <h3>Projects</h3>
                {reflection.projects.split(',').map((project, idx) => (
                    <div key={idx}>
                        <li>{project.trim()}</li>
                    </div>
                ))}
            </div>
            <div className="reflections-questions-card">
                <h3>What did you work on today?</h3>
                <span>{reflection.today}</span>
            </div>
            <div className="reflections-questions-card">
                <h3>Was there any work you are proud of or enjoyed?</h3>
                <span>{reflection.accomplish}</span>
            </div>
            <div className="reflections-questions-card">
                <h3>Did you face any challenges?</h3>
                <span>{reflection.challenges}</span>
            </div>
            <div className="reflections-questions-card">
                <h3>What did or will you do to work through these challenges?</h3>
                <span>{reflection.overcome}</span>
            </div>
            <div className="reflections-questions-card">
                <h3>What goals do you have for tomorrow and moving forward?</h3>
                <span>{reflection.goals}</span>
            </div>
        </div>
    )
}

export default SelectedReflection
