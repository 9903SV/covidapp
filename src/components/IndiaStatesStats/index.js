import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class IndiaStatesStats extends Component {
  state = {statesStats: {}, isLoading: true}

  componentDidMount() {
    this.getStatesStats()
  }

  getStatesStats = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()

    this.setState({statesStats: data, isLoading: false})
  }

  render() {
    const {statesList} = this.props
    const {statesStats, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <Loader type="TailSpin" color="#007bff" height={50} width={50} />
        ) : (
          <div className="states-stats-bg-container">
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
            <hr className="states-stats-hr-line" />
            <div>
              {statesList.map(eachState => (
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
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default IndiaStatesStats
