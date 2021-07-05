/* eslint-disable */

import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data1 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

class StatsLineChart extends Component {
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

    let lastTenDaysData = Object.keys(data[stateCode].dates)
      .slice(-100)
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

    const lineChartData = []

    for (const title of chartTitles) {
      const crunchedData = []
      for (let count = 0; count < 100; count += 1) {
        let countObj = {}
        for (const key in lastTenDaysData[count]) {
          countObj.date = key
          if (title === 'active') {
            countObj.count =
              lastTenDaysData[count][key].total.confirmed -
              (lastTenDaysData[count][key].total.recovered +
                lastTenDaysData[count][key].total.deceased)
          } else if (title === 'vaccinated') {
            countObj.count =
              lastTenDaysData[count][key].total.vaccinated1 +
              lastTenDaysData[count][key].total.vaccinated2
          } else if (title === 'positivityRatio') {
            countObj.count =
              lastTenDaysData[count][key].total.confirmed +
              lastTenDaysData[count][key].total.tested
          } else {
            countObj.count = lastTenDaysData[count][key].total[title]
          }
          crunchedData.push(countObj)
        }
      }
      lineChartData.push(crunchedData)
    }

    this.setState({datewiseData: lineChartData, isLoading: false})
  }

  renderLineChart = chartData => {
    return (
      <div>
        <LineChart
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            // dataKey="pv"
            stroke="#8884d8"
            activeDot={{r: 8}}
          />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </div>
    )
  }

  render() {
    const {datewiseData, isLoading} = this.state

    return (
      <div>{datewiseData.map(eachData => this.renderLineChart(eachData))}</div>
    )
  }
}

export default StatsLineChart
