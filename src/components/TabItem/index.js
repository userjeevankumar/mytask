// Write your code here
import './index.css'

const TabItem = props => {
  const {tabDetails, setActiveTabId, isActive} = props

  const {displayText} = tabDetails

  const onClickTab = () => {
    setActiveTabId(displayText)
  }

  const tabBtnClassName = isActive ? 'tab-button-active' : 'tag-name-button'

  return (
    <li>
      <button type="button" onClick={onClickTab} className={tabBtnClassName}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
