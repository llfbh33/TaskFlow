const SelectedReflection = ({reflection}) => {

    if (!reflection) return

    return (
        <div className="open-reflection-container">
            <div className="reflections-questions-card reflection-projects">
                <span>Projects</span>
                {reflection.projects.split(',').map((project, idx) => (
                    <div key={idx}>
                        <li>{project.trim()}</li>
                    </div>
                ))}
            </div>
            <div className="reflections-questions-card">
                <span>What did you work on today?</span>
                <span>{reflection.today}</span>
            </div>
            <div className="reflections-questions-card">
                <span>Was there any work you are proud of or enjoyed?</span>
                <span>{reflection.accomplish}</span>
            </div>
            <div className="reflections-questions-card">
                <span>Did you face any challenges?</span>
                <span>{reflection.challenges}</span>
            </div>
            <div className="reflections-questions-card">
                <span>What did or will you do to work through these challenges?</span>
                <span>{reflection.overcome}</span>
            </div>
            <div className="reflections-questions-card">
                <span>What goals do you have for tomorrow and moving forward?</span>
                <span>{reflection.goals}</span>
            </div>
        </div>
    )
}

export default SelectedReflection
