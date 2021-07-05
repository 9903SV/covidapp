import {AiOutlineRight} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

const SearchSuggestionItem = props => {
  const {eachStateSuggestion} = props

  return (
    <Link
      to={`state/${eachStateSuggestion.state_code}`}
      className="state-suggestion-container"
    >
      <p className="state-suggestion-name">{eachStateSuggestion.state_name}</p>
      <button className="state-suggestion-button" type="button">
        {eachStateSuggestion.state_code}
        <AiOutlineRight className="state-suggestion-icon" />
      </button>
    </Link>
  )
}

export default SearchSuggestionItem
