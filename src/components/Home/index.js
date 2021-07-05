import {Component} from 'react'
import Loader from 'react-loader-spinner'
import InputSearch from '../InputSearch'
import ConsolidatedStats from '../ConsolidatedStats'
import IndiaStatesStats from '../IndiaStatesStats'
import Footer from '../Footer'
import './index.css'

class Home extends Component {
  state = {indiaStatsCount: {}, isLoading: true}

  componentDidMount() {
    this.getCovidStats()
  }

  getCovidStats = async () => {
    const {statesList} = this.props
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const data = await response.json()

    this.setState({
      indiaStatsCount: this.getIndiaStatsCount(data, statesList),
      isLoading: false,
    })
  }

  getIndiaStatsCount = (data, statesList) => {
    const indiaStatsCount = {
      Confirmed: 0,
      Active: 0,
      Recovered: 0,
      Deceased: 0,
    }

    statesList.forEach(eachState => {
      const stateCode = eachState.state_code
      indiaStatsCount.Confirmed += data[stateCode].total.confirmed
      indiaStatsCount.Recovered += data[stateCode].total.recovered
      indiaStatsCount.Deceased += data[stateCode].total.deceased
    })
    indiaStatsCount.Active +=
      indiaStatsCount.Confirmed -
      (indiaStatsCount.Recovered + indiaStatsCount.Deceased)

    return indiaStatsCount
  }

  statsTabClicked = () => null

  render() {
    const {statesList} = this.props
    const {indiaStatsCount, isLoading} = this.state

    return (
      <div className="home-bg-container">
        <InputSearch statesList={statesList} />
        {isLoading ? (
          <Loader type="TailSpin" color="#007bff" height={50} width={50} />
        ) : (
          <div>
            <ConsolidatedStats
              indiaStatsCount={indiaStatsCount}
              activeTab={null}
              statsTabClicked={this.statsTabClicked}
            />
            <IndiaStatesStats statesList={statesList} />
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default Home
