import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'

class IndiaStatesStats extends Component {
  state = {statesStats: {}, isLoading: true}

  componentDidMount() {
    this.getStatesStats()
  }

  getStatesStats = async () => {
    try {
      const response = await fetch(
        'https://api.covid19india.org/v4/min/data.min.json',
      )
      const data = await response.json()

      this.setState({statesStats: data, isLoading: false})
    } catch (error) {
      console.log(error.message)
    }
  }

  renderTableHeader = () => (
    <div className="states-stats-heading-container">
      <span className="states-stats-table-heading state-name-heading">
        States/UT
      </span>
      <span className="states-stats-table-heading stats-count-width">
        Confirmed
      </span>
      <span className="states-stats-table-heading stats-count-width">
        Active
      </span>
      <span className="states-stats-table-heading stats-count-width">
        Recovered
      </span>
      <span className="states-stats-table-heading stats-count-width">
        Deceased
      </span>
      <span className="states-stats-table-heading stats-count-width">
        Population
      </span>
    </div>
  )

  renderTableData = (statesList, statesStats) => (
    <div>
      {statesList.map(eachState => (
        <Link
          to={`state/${eachState.state_code}`}
          style={{textDecoration: 'none'}}
          key={eachState.state_code}
        >
          <div
            className="states-stats-count-container"
            key={eachState.state_code}
          >
            <span className="states-stats-state-name">
              {eachState.state_name}
            </span>
            <span className="confirmed-hex-code stats-count-width">
              {statesStats[eachState.state_code].total.confirmed}
            </span>
            <span className="active-hex-code stats-count-width">
              {statesStats[eachState.state_code].total.confirmed -
                (statesStats[eachState.state_code].total.recovered +
                  statesStats[eachState.state_code].total.deceased)}
            </span>
            <span className="recovered-hex-code stats-count-width">
              {statesStats[eachState.state_code].total.recovered}
            </span>
            <span className="deceased-hex-code stats-count-width">
              {statesStats[eachState.state_code].total.deceased}
            </span>
            <span className="population-hex-code stats-count-width">
              {statesStats[eachState.state_code].meta.population}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )

  render() {
    const {statesList} = this.props
    const {statesStats, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div className="loader-container">
            <Loader type="TailSpin" color="#007bff" height={50} width={50} />
          </div>
        ) : (
          <div className="states-stats-bg-container">
            {this.renderTableHeader()}
            <hr className="states-stats-hr-line" />
            {this.renderTableData(statesList, statesStats)}
          </div>
        )}
      </div>
    )
  }
}

export default IndiaStatesStats
