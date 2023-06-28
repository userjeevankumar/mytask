import {Component} from 'react'
import {v4} from 'uuid'
import TabItem from '../TabItem'
import DisplayTask from '../DisplayTask'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    addedTasks: [],
    taskButton: tagsList[0].displayText,
    inputValue: '',
    isFilterActive: false,
    activeTabId: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onChangeButton = event => {
    this.setState({taskButton: event.target.value})
  }

  setActiveTabId = displayText => {
    this.setState({activeTabId: displayText, isFilterActive: true})
    const {activeTabId} = this.state
    console.log(activeTabId)
  }

  onClickAddTask = event => {
    event.preventDefault()
    const {inputValue, taskButton} = this.state
    const addNewItem = {
      id: v4(),
      item: inputValue,
      taskType: taskButton,
    }

    this.setState(prevState => ({
      addedTasks: [...prevState.addedTasks, addNewItem],
      inputValue: '',
      taskButton: tagsList[0].displayText,
      isFilterActive: false,
      activeTabId: '',
    }))
  }

  renderAll = () => {
    const {addedTasks} = this.state
    return (
      <ul className="tags-list">
        {addedTasks.map(eachTask => (
          <DisplayTask key={eachTask.optionId} taskDetails={eachTask} />
        ))}
      </ul>
    )
  }

  renderFilter = () => {
    const {addedTasks, activeTabId} = this.state
    const filteredTask = addedTasks.filter(
      eachSearchedApp => eachSearchedApp.taskType === activeTabId,
    )
    const isOkay = filteredTask.length
    return (
      <div>
        {isOkay > 0 ? (
          <ul className="tags-list">
            {filteredTask.map(eachTask => (
              <DisplayTask key={eachTask.optionId} taskDetails={eachTask} />
            ))}
          </ul>
        ) : (
          this.renderAll()
        )}
      </div>
    )
  }

  renderTasks = () => {
    const {isFilterActive} = this.state

    return <ul>{isFilterActive ? this.renderFilter() : this.renderAll()}</ul>
  }

  renderAddTask = () => (
    <div>
      <p className="no-task-head">No Tasks Added Yet</p>
    </div>
  )

  render() {
    const {addedTasks, activeTabId, taskButton, inputValue} = this.state

    return (
      <div className="main-container">
        <div className="input-container">
          <h1 className="create-heading">Create a task</h1>
          <form className="form-container" onSubmit={this.onClickAddTask}>
            <label htmlFor="enter-task" className="label">
              Task
            </label>
            <input
              type="text"
              id="enter-task"
              placeholder="Enter the task here"
              className="input"
              value={inputValue}
              onChange={this.onChangeInput}
            />
            <label htmlFor="tags" className="label">
              Tags
            </label>

            <select value={taskButton} onChange={this.onChangeButton} id="tags">
              {tagsList.map(eachOption => (
                <option
                  className="tags-dropdown"
                  key={eachOption.optionId}
                  value={eachOption.value}
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button
              onClick={this.onClickAddTask}
              type="submit"
              className="add-button"
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="tag-List-container">
          <h1 className="heading-tag">Tags</h1>
          <div>
            <ul className="tags-lists">
              {tagsList.map(eachTab => (
                <TabItem
                  key={eachTab.tabId}
                  tabDetails={eachTab}
                  setActiveTabId={this.setActiveTabId}
                  isActive={activeTabId === eachTab.displayText}
                />
              ))}
            </ul>
          </div>

          <div className="added-tasks-container">
            <h1 className="heading-tag">Tasks</h1>

            <div>
              {addedTasks.length === 0
                ? this.renderAddTask()
                : this.renderTasks()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks
