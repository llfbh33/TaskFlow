const SelectedReflection = ({ reflection }) => {
    const sections = [
        {
            label: "Projects, tasks, or activities you worked on today.",
            property: "projects"
        },
        {
            label: "What did you work on today?",
            property: "today"
        },
        {
            label: "What work are you most proud of or satisfied with today?",
            property: "accomplish"
        },
        {
            label: "Did you face any challenges today and what were they?",
            property: "challenges"
        },
        {
            label: "What steps did or will you take to work through these challenges?",
            property: "overcome"
        },
        {
            label: "What goals or priorities do you have for tomorrow and the days ahead?",
            property: "goals"
        }
    ]
    console.log(reflection)

    if (!reflection) return

    return (
        <div className="open-reflection-container">
            {sections.map((section, index) => {
                const information = reflection[section.property];

                if (!information) return "";

                return (
                <div className={`reflections-questions-card ${section.property === "projects" ? "reflection-projects" : ""}`}>
                    <label style={{
                        fontSize: "1.4rem",
                        color: "rgba(255,255,255,0.82)",
                    }}>{section.label}</label>
                    {section.property === "projects"
                        ? (
                            information.split(',').map((project, idx) => (
                                <div key={idx} style={{ paddingLeft: "40px" }}>
                                    <li>{project.trim()}</li>
                                </div>
                            ))
                        )
                        : (
                            <div style={{ paddingLeft: "40px" }}>{information}</div>
                        )
                    }
                </div>
                )
            })}
        </div>
    )
}

export default SelectedReflection
