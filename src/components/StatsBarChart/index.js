/* eslint-disable */

import {Component} from 'react'
import {BarChart, Bar, XAxis, YAxis, Tooltip, LabelList} from 'recharts'
import './index.css'

class StatsBarChart extends Component {
  state = {datewiseData: [], isLoading: true}

  componentDidMount() {
    this.getDatewiseData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeTab !== prevProps.activeTab) {
      this.getDatewiseData()
    }
  }

  getDatewiseData = async () => {
    try {
      const {activeTab, stateCode} = this.props

      const response = await fetch(
        'https://api.covid19india.org/v4/min/timeseries.min.json',
      )
      const data = await response.json()

      let lastTenDaysData = Object.keys(data[stateCode].dates)
        .slice(-10)
        .map(key => ({[key]: data[stateCode].dates[key]}))

      const crunchedData = []
      for (let count = 0; count < 10; count += 1) {
        let countObj = {}
        for (const key in lastTenDaysData[count]) {
          countObj.date = key
          if (activeTab === 'Active') {
            countObj.count =
              lastTenDaysData[count][key].total.confirmed -
              (lastTenDaysData[count][key].total.recovered +
                lastTenDaysData[count][key].total.deceased)
          } else {
            countObj.count =
              lastTenDaysData[count][key].total[activeTab.toLowerCase()]
          }
          crunchedData.push(countObj)
        }
      }

      for (const obj of crunchedData) {
        obj.date = this.formatDate(obj.date)
      }

      this.setState({datewiseData: crunchedData, isLoading: false})
    } catch (error) {
      console.log(error.message)
    }
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

    return dateArray[2] + ' ' + months[dateArray[1]]
  }

  formatCount = count => {
    if (count / 1000 >= 100) {
      return `${(count / 1000 / 100).toFixed(2)} L`
    } else if (count < 1000) {
      return count
    } else {
      return `${(count / 1000).toFixed(2)} k`
    }
  }

  getHexCode = tab => {
    if (tab === 'Confirmed') {
      return '#ff073a'
    }
    if (tab === 'Active') {
      return '#007bff'
    }
    if (tab === 'Recovered') {
      return '#28a745'
    }
    return '#6c757d'
  }

  render() {
    const {datewiseData, isLoading} = this.state
    const {activeTab, hexCode} = this.props

    return (
      <div>
        {!isLoading && (
          <div className="bar-chart-container">
            <BarChart
              width={1000}
              height={350}
              data={datewiseData}
              tickLine={false}
            >
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis
                label={this.formatCount}
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <Tooltip
                cursor={{fill: 'transparent'}}
                formatter={this.formatCount}
              />
              <Bar dataKey="count" fill={this.getHexCode(activeTab)}>
                <LabelList
                  dataKey="count"
                  position="top"
                  fill={this.getHexCode(activeTab)}
                  formatter={this.formatCount}
                />
              </Bar>
            </BarChart>
          </div>
        )}
      </div>
    )
  }
}

export default StatsBarChart
