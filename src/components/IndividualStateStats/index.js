/* eslint-disable */

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ConsolidatedStats from '../ConsolidatedStats'
import StatsBarChart from '../StatsBarChart'
import StatsLineChart from '../StatsLineChart'
import StatsAreaChart from '../StatsAreaChart'
import './index.css'

class IndividualStateStats extends Component {
  state = {
    stateData: null,
    isLoading: false,
    activeTab: 'Active',
    showCumulativeChart: true,
  }

  componentDidMount() {
    this.getStateStats()
  }

  getStateStats = async () => {
    try {
      this.setState({isLoading: true})
      const {match} = this.props
      const {params} = match
      const {stateCode} = params

      const response = await fetch(
        'https://api.covid19india.org/v4/min/data.min.json',
      )
      const data = await response.json()

      const stateData = data[stateCode]

      this.setState({stateData: stateData, isLoading: false})
    } catch (error) {
      console.log(error.message)
    }
  }

  getStateName = (code, list) => {
    const state = list.find(eachState => eachState.state_code === code)
    return state.state_name
  }

  formatDate = date => {
    const dateArray = date.split('-')
    const months = {
      '01': 'Jan',
      '02': 'Jan',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec',
    }

    return dateArray[2] + ' ' + months[dateArray[1]] + ' ' + dateArray[0]
  }

  getUpdatedDate = stateData => {
    if (stateData !== null) {
      const updatedStatesData = {
        date: stateData.meta.date,
        lastUpdated: stateData.meta.last_updated,
        population: stateData.meta.population,
        tested: stateData.meta.tested,
      }

      const {lastUpdated} = updatedStatesData
      return this.formatDate(lastUpdated.split('T')[0])
    }
  }

  getStateStatsCount = stateData => ({
    Confirmed: stateData.total.confirmed,
    Active:
      stateData.total.confirmed -
      (stateData.total.recovered + stateData.total.deceased),
    Recovered: stateData.total.recovered,
    Deceased: stateData.total.deceased,
  })

  statsTabClicked = title => {
    this.setState({activeTab: title})
  }

  getHexCode = tab => {
    if (tab === 'Confirmed') {
      return 'confirmed-hex-code'
    }
    if (tab === 'Active') {
      return 'active-hex-code'
    }
    if (tab === 'Recovered') {
      return 'recovered-hex-code'
    }
    return 'deceased-hex-code'
  }

  getTopDistricts = title => {
    const {stateData} = this.state
    /* eslint-disable */
    const districtDataArray = []

    if (title === 'Active') {
      for (const key in stateData.districts) {
        districtDataArray.push({
          name: key,
          cases:
            stateData.districts[key].total.confirmed -
            (stateData.districts[key].total.recovered +
              stateData.districts[key].total.deceased),
        })
      }
    } else {
      for (const key in stateData.districts) {
        districtDataArray.push({
          name: key,
          cases: stateData.districts[key].total[title.toLowerCase()],
        })
      }
    }

    districtDataArray.sort(
      (district1, district2) => district2.cases - district1.cases,
    )

    const countTopDistricts = parseInt(districtDataArray.length / 2)

    const topDistricts = districtDataArray.slice(0, countTopDistricts)
    return topDistricts
  }

  showCumulativeCharts = () => {
    this.setState({showCumulativeChart: true})
  }

  showDailyCharts = () => {
    this.setState({showCumulativeChart: false})
  }

  renderHeaderContainer = (statesList, stateCode, stateData) => (
    <div className="individual-state-stats-heading-container">
      <div>
        <span className="individual-state-stats-heading">
          {this.getStateName(stateCode, statesList)}
        </span>
        <p className="individual-state-stats-date">
          Last update on {this.getUpdatedDate(stateData)}
        </p>
      </div>
      <div className="individual-state-stats-tested-container">
        <span className="individual-state-stats-tested">Tested</span>
        <span className="individual-state-stats-tested-count">
          {stateData.total.tested}
        </span>
      </div>
    </div>
  )

  renderTopDistrictsContainer = activeTab => (
    <div>
      <h1
        className={`individual-state-top-districts ${this.getHexCode(
          activeTab,
        )}`}
      >
        Top Districts
      </h1>
      <div className="individual-state-top-districts-container">
        {this.getTopDistricts(activeTab).map(eachDistrict => (
          <p key={eachDistrict.name}>
            <span className="individual-state-top-districts-count">
              {eachDistrict.cases}
            </span>
            <span>{eachDistrict.name}</span>
          </p>
        ))}
      </div>
    </div>
  )

  renderSpreadTrendsContainer = (showCumulativeChart, stateCode) => (
    <div>
      <h1 className="individual-state-spread-trends-heading">Spread Trends</h1>
      <button
        onClick={this.showCumulativeCharts}
        className={`individual-state-spread-trends-button ${
          !showCumulativeChart &&
          'individual-state-spread-trends-button-inactive'
        }`}
      >
        Cumulative
      </button>
      <button
        onClick={this.showDailyCharts}
        className={`individual-state-spread-trends-button ${
          showCumulativeChart &&
          'individual-state-spread-trends-button-inactive'
        }`}
      >
        Daily
      </button>
      {showCumulativeChart && <StatsLineChart stateCode={stateCode} />}
      {!showCumulativeChart && <StatsAreaChart stateCode={stateCode} />}
    </div>
  )

  render() {
    const {match, statesList} = this.props
    const {params} = match
    const {stateCode} = params

    const {stateData, isLoading, activeTab, showCumulativeChart} = this.state

    return (
      <div>
        {isLoading || stateData === null ? (
          <div className="loader-container">
            <Loader type="TailSpin" color="#007bff" height={50} width={50} />
          </div>
        ) : (
          <div className="individual-state-stats-bg-container">
            {this.renderHeaderContainer(statesList, stateCode, stateData)}
            <ConsolidatedStats
              indiaStatsCount={this.getStateStatsCount(stateData)}
              statsTabClicked={this.statsTabClicked}
              activeTab={activeTab}
            />
            {this.renderTopDistrictsContainer(activeTab)}
            <StatsBarChart activeTab={activeTab} stateCode={stateCode} />
            {this.renderSpreadTrendsContainer(showCumulativeChart, stateCode)}
          </div>
        )}
      </div>
    )
  }
}

export default IndividualStateStats
