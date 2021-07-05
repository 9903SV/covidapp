/* eslint-disable */

import {Component} from 'react'
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts'
import './index.css'

class StatsAreaChart extends Component {
  state = {datewiseData: [], isLoading: true}

  componentDidMount() {
    this.getDatewiseData()
  }

  getDatewiseData = async () => {
    const {stateCode} = this.props

    const response = await fetch(
      'https://api.covid19india.org/v4/min/timeseries.min.json',
    )
    const data = await response.json()

    let lastNinetyDaysData = Object.keys(data[stateCode].dates)
      .slice(-90)
      .map(key => ({[key]: data[stateCode].dates[key]}))

    const chartTitles = [
      'confirmed',
      'active',
      'recovered',
      'deceased',
      'tested',
      'vaccinated',
      'positivityRatio',
    ]

    const areaChartData = []

    for (const title of chartTitles) {
      const crunchedData = {color: '', bgColor: '', title: '', datesData: []}
      for (let count = 0; count < 90; count += 1) {
        let countObj = {}
        for (const key in lastNinetyDaysData[count]) {
          countObj.date = key

          const confirmedCases = lastNinetyDaysData[count][key].delta.confirmed
          const recoveredCases = lastNinetyDaysData[count][key].delta.recovered
          const deceasedCases = lastNinetyDaysData[count][key].delta.deceased
          const vaccinated1Cases =
            lastNinetyDaysData[count][key].delta.vaccinated1
          const vaccinated2Cases =
            lastNinetyDaysData[count][key].delta.vaccinated2
          const testedCases = lastNinetyDaysData[count][key].total.tested

          if (title === 'active') {
            countObj.count = confirmedCases - (recoveredCases + deceasedCases)
            crunchedData.color = '#007BFF'
            crunchedData.bgColor = '#132240'
            crunchedData.title = 'Active'
          } else if (title === 'vaccinated') {
            countObj.count = vaccinated1Cases + vaccinated2Cases
            crunchedData.color = '#F95581'
            crunchedData.bgColor = '#2E1E30'
            crunchedData.title = 'Vaccinated'
          } else if (title === 'positivityRatio') {
            countObj.count = confirmedCases / testedCases
            crunchedData.color = '#FD7E14'
            crunchedData.bgColor = '#332323'
            crunchedData.title = 'Positivity Ratio'
          } else if (title === 'confirmed') {
            countObj.count = confirmedCases
            crunchedData.color = '#FF073A'
            crunchedData.bgColor = '#331427'
            crunchedData.title = 'Confirmed'
          } else if (title === 'recovered') {
            countObj.count = recoveredCases
            crunchedData.color = '#27A243'
            crunchedData.bgColor = '#182829'
            crunchedData.title = 'Recovered'
          } else if (title === 'deceased') {
            countObj.count = deceasedCases
            crunchedData.color = '#6C757D'
            crunchedData.bgColor = '#1C1C2B'
            crunchedData.title = 'Deceased'
          } else if (title === 'tested') {
            countObj.count = testedCases
            crunchedData.color = '#9673B9'
            crunchedData.bgColor = '#230F41'
            crunchedData.title = 'Tested'
          }

          crunchedData.datesData.push(countObj)
        }
      }
      for (const obj of crunchedData.datesData) {
        obj.date = this.formatDate(obj.date)
      }
      areaChartData.push(crunchedData)
    }

    this.setState({datewiseData: areaChartData, isLoading: false})
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
    } else if (count < 1) {
      return count.toFixed(2)
    } else {
      return `${(count / 1000).toFixed(2)} k`
    }
  }

  formatTickCounter = count => {
    if (count / 1000 >= 100) {
      return `${count / 1000 / 100} L`
    } else {
      return `${count / 1000} k`
    }
  }

  renderAreaChart = (chartData, color, bgColor, title) => {
    return (
      <div className="area-chart-container" style={{background: bgColor}}>
        <p style={{color: color, textAlign: 'right'}}>{title}</p>
        <AreaChart
          width={1000}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="date"
            minTickGap={50}
            tickLine={false}
            tick={{fill: color}}
          />
          <YAxis
            tickLine={false}
            tick={{fill: color}}
            tickFormatter={
              title !== 'Positivity Ratio' && this.formatTickCounter
            }
          />
          <Tooltip
            formatter={title !== 'Positivity Ratio' && this.formatCount}
          />
          <Area type="monotone" stroke={color} activeDot={{r: 8}} />
          <Area type="monotone" dataKey="count" stroke="none" fill={color} />
        </AreaChart>
      </div>
    )
  }

  render() {
    const {datewiseData, isLoading} = this.state

    return (
      <div>
        {datewiseData.map(eachData =>
          this.renderAreaChart(
            eachData.datesData,
            eachData.color,
            eachData.bgColor,
            eachData.title,
          ),
        )}
      </div>
    )
  }
}

export default StatsAreaChart
