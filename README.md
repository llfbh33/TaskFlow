# TaskFlow

## Project Overview

TaskFlow is a full-stack productivity application designed to help users manage tasks, track daily reflections, and organize useful resources in one place. The app combines a calendar-based task system, a journaling feature, and a searchable resource library to support both organization and personal growth.

## Live Link

## Technologies Used
![React-icon svg](https://github.com/llfbh33/Capstone-Project/assets/145170944/97103a00-5148-4209-924f-69f0e9899bcf)
![redux-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/68b638dc-0472-4ab7-bf1e-32716bd8981a)
![css-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/267e446d-8aad-4dc3-b858-7c25f34205f8)
![html-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/532c4d1c-758e-4217-babb-39b459dcc073)
![postgres-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/9a37dfbd-82ad-41a4-9925-f80d2ea07651)
![render-icon](https://github.com/llfbh33/Capstone-Project/assets/145170944/9141c5c5-9743-4210-a6bc-8c6f2a2492c7)
<img src="./public/Next-js-tag-mini.png" alt="next-icon" width="40" />
- Express

## Featrues
### Task Management
- Create, edit, and delete tasks
- Assign tasks to specific dates or leave unassigned
- Calendar list view with visual indicators for overdue and upcoming tasks

### Reflections Journal
- Create, edit, and delete journal entries
- Optional daily reflection entries with structured prompts  
- Expandable accordion view for readability
- Date range selection for past reflection view

### Resource Library
- Create, edit, and delete with ownership protection
- Read access to all resources added to the system
- Search functionality with keyword tagging

### Responsive Design
- Fully mobile-friendly layout
- Adaptive UI patterns (modals, lists, navigation)
- Optimized for both desktop and smaller screens


## Key Implementation Details
- Reusable modal system for create/edit flows
- Redux state structured for efficient updates
- Backend validation paired with frontend validation
- Conditional UI behavior based on screen size
- Dynamic layout handling


## Challenges & Solutions
- Responsive Layouts: Stabilized UI using global CSS rules and container-based design
- Database Constraints: Adjusted database rules and validations to better match real user behavior
- UI Transitions: Managed layout shifts between desktop and mobile views
- Reusable Modals: Standardized create, edit, and delete flows with shared modal patterns
- State Management: Organized Redux state and thunks to keep task, resource, and reflection data predictable
- Form Handling: Improved controlled inputs and validation to reduce user errors
- Demo Data: Created realistic seed data to make the demo account feel complete and usable
- Calendar Workflow: Connected scheduled and unassigned tasks to support more flexible planning


## Future Implementations

### Overall
- UI/UX refinements and theme customization
- Profile view for editing personal information
- Basic guide walkthrough for first-time users (always enabled for the demo user)

### Calendar
- Basic starter tasks for first-time users to encourage interaction
- Task categories, tags, and priority levels
- Drag and drop task scheduling
- Week and month calendar layouts
- Recurring tasks and reminders
- Time support for tasks (e.g., complete by HH:MM)

### Search
- Ability to favorite resources for quick access
- Link favorite resources directly to tasks
- Link resources used to journal entries

### Comments and Ratings
- Community comments on shared resources
- Resource rating system
- Feedback on which resources users found most helpful

### Reflections
- Customizable reflection prompts per user
- Calendar date range filtering for reflections

### Suggestions
- Community suggestions page for feature requests and usability feedback

### Productivity Enhancements
- Smart carry-over system for overdue tasks
- Prompt users to reschedule or move incomplete tasks to unassigned
- Reflection prompts generated from completed tasks and daily activity
- Convert reflection notes directly into tasks

### Activity and Analytics
- Activity feed showing completed tasks, added resources, and reflections
- Weekly review summaries for completed work and project focus
- Basic productivity analytics and visualization dashboards
- Track most-used resources and recently accessed materials

### Smart Suggestions
- Lightweight recommendation system based on user activity
- Suggestions for overdue reflections, inactive projects, or unused resources
- Personalized prompts encouraging consistency and engagement

### Export and Sharing
- Export weekly summaries, reflections, and completed tasks
- Markdown or PDF export support for interview preparation and progress tracking

## Contact
- [LinkedIn](https://www.linkedin.com/in/aubrie-woodbine-b91781314/)