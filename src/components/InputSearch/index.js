import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import SearchSuggestionItem from '../SearchSuggestionItem'
import './index.css'

class InputSearch extends Component {
  state = {updatedStatesList: []}

  inputChanged = event => {
    const {statesList} = this.props
    const inputText = event.target.value

    const updatedStatesList = statesList.filter(eachState =>
      eachState.state_name.toLowerCase().includes(inputText.toLowerCase()),
    )

    this.setState({updatedStatesList})
  }

  render() {
    const {updatedStatesList} = this.state

    return (
      <div className="input-search-bg-container">
        <div className="input-search-container">
          <BsSearch className="input-search-icon" />
          <input
            onChange={this.inputChanged}
            type="search"
            placeholder="Enter the state"
            className="input-search-text"
          />
        </div>
        {updatedStatesList.map(eachState => (
          <SearchSuggestionItem
            key={eachState.state_code}
            eachStateSuggestion={eachState}
          />
        ))}
      </div>
    )
  }
}

export default InputSearch
