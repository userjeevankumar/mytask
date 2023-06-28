import './index.css'

const DisplayTask = props => {
  const {taskDetails} = props
  return (
    <>
      <li className="task-display" key={taskDetails.optionId}>
        <p className="tag-item">{taskDetails.item}</p>
        <p className="tag-name">{taskDetails.taskType}</p>
      </li>
    </>
  )
}

export default DisplayTask
