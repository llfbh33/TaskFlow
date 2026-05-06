const SelectedReflection = ({ reflection }) => {

    if (!reflection) return

    return (
        <div className="open-reflection-container">
            <div className="reflections-questions-card reflection-projects">
                <label style={{
                    fontSize: "1.4rem",
                    color: "rgba(255,255,255,0.82)",
                }}>Projects</label>
                {reflection.projects.split(',').map((project, idx) => (
                    <div key={idx} style={{ paddingLeft: "40px" }}>
                        <li>{project.trim()}</li>
                    </div>
                ))}
            </div>
            <div className="reflections-questions-card">
                <label style={{
                    fontSize: "1.4rem",
                    color: "rgba(255,255,255,0.82)",
                }}>What did you work on today?</label>
                <div style={{ paddingLeft: "40px" }}>{reflection.today}</div>
            </div>
            <div className="reflections-questions-card">
                <label style={{
                    fontSize: "1.4rem",
                    color: "rgba(255,255,255,0.82)",
                }}>Was there any work you are proud of or enjoyed?</label>
                <div style={{ paddingLeft: "40px" }}>{reflection.accomplish}</div>
            </div>
            <div className="reflections-questions-card">
                <label style={{
                    fontSize: "1.4rem",
                    color: "rgba(255,255,255,0.82)",
                }}>Did you face any challenges?</label>
                <div style={{ paddingLeft: "40px" }}>{reflection.challenges}</div>
            </div>
            <div className="reflections-questions-card">
                <label style={{
                    fontSize: "1.4rem",
                    color: "rgba(255,255,255,0.82)",
                }}>What did or will you do to work through these challenges?</label>
                <div style={{ paddingLeft: "40px" }}>{reflection.overcome}</div>
            </div>
            <div className="reflections-questions-card">
                <label style={{
                    fontSize: "1.4rem",
                    color: "rgba(255,255,255,0.82)",
                }}>What goals do you have for tomorrow and moving forward?</label>
                <div style={{ paddingLeft: "40px" }}>{reflection.goals}</div>
            </div>
        </div>
    )
}

export default SelectedReflection
