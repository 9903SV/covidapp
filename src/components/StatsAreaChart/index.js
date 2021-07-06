/* eslint-disable */

import {Component} from 'react'
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class StatsAreaChart extends Component {
  state = {datewiseData: [], isLoading: true}

  componentDidMount() {
    this.getDatewiseData()
  }

  getDatewiseData = async () => {
    try {
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
        let crunchedData = {
          color: '',
          bgColor: '',
          chartTitle: '',
          datesData: [],
        }
        for (let count = 0; count < 90; count += 1) {
          let countObj = {}
          let color = ''
          let bgColor = ''
          let chartTitle = ''

          for (const key in lastNinetyDaysData[count]) {
            countObj.date = key

            const confirmedCases =
              lastNinetyDaysData[count][key].delta.confirmed
            const recoveredCases =
              lastNinetyDaysData[count][key].delta.recovered
            const deceasedCases = lastNinetyDaysData[count][key].delta.deceased
            const vaccinated1Cases =
              lastNinetyDaysData[count][key].delta.vaccinated1
            const vaccinated2Cases =
              lastNinetyDaysData[count][key].delta.vaccinated2
            const testedCases = lastNinetyDaysData[count][key].total.tested

            if (title === 'active') {
              countObj.count = confirmedCases - (recoveredCases + deceasedCases)
              color = '#007BFF'
              bgColor = '#132240'
              chartTitle = 'Active'
            } else if (title === 'vaccinated') {
              countObj.count = vaccinated1Cases + vaccinated2Cases
              color = '#F95581'
              bgColor = '#2E1E30'
              chartTitle = 'Vaccinated'
            } else if (title === 'positivityRatio') {
              countObj.count = confirmedCases / testedCases
              color = '#FD7E14'
              bgColor = '#332323'
              chartTitle = 'Positivity Ratio'
            } else if (title === 'confirmed') {
              countObj.count = confirmedCases
              color = '#FF073A'
              bgColor = '#331427'
              chartTitle = 'Confirmed'
            } else if (title === 'recovered') {
              countObj.count = recoveredCases
              color = '#27A243'
              bgColor = '#182829'
              chartTitle = 'Recovered'
            } else if (title === 'deceased') {
              countObj.count = deceasedCases
              color = '#6C757D'
              bgColor = '#1C1C2B'
              chartTitle = 'Deceased'
            } else if (title === 'tested') {
              countObj.count = testedCases
              color = '#9673B9'
              bgColor = '#230F41'
              chartTitle = 'Tested'
            }

            crunchedData.datesData.push(countObj)
          }

          crunchedData = {
            ...crunchedData,
            color: color,
            bgColor: bgColor,
            chartTitle: chartTitle,
          }
        }
        for (const obj of crunchedData.datesData) {
          obj.date = this.formatDate(obj.date)
        }
        areaChartData.push(crunchedData)
      }

      this.setState({datewiseData: areaChartData, isLoading: false})
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
    } else if (count < 1) {
      return count.toFixed(2)
    } else {
      return `${(count / 1000).toFixed(2)} k`
    }
  }

  formatTickCounter = count => {
    if (count / 1000 >= 100) {
      return `${count / 1000 / 100} L`
    } else if (count < 1000) {
      return count
    } else {
      return `${count / 1000} k`
    }
  }

  renderAreaChart = (chartData, color, bgColor, chartTitle) => {
    return (
      <div className="area-chart-container" style={{background: bgColor}}>
        <p style={{color: color, textAlign: 'right'}}>{chartTitle}</p>
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
              chartTitle !== 'Positivity Ratio' && this.formatTickCounter
            }
          />
          <Tooltip
            formatter={chartTitle !== 'Positivity Ratio' && this.formatCount}
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
        {isLoading ? (
          <div className="loader-container">
            <Loader type="TailSpin" color="#007bff" height={50} width={50} />
          </div>
        ) : (
          <div>
            {datewiseData.map(eachData =>
              this.renderAreaChart(
                eachData.datesData,
                eachData.color,
                eachData.bgColor,
                eachData.chartTitle,
              ),
            )}
          </div>
        )}
      </div>
    )
  }
}

export default StatsAreaChart
