import {Component} from 'react'
import ConsolidatedStatItem from '../ConsolidatedStatItem'
import './index.css'

const consolidatedStats = [
  {
    id: 0,
    title: 'Confirmed',
    imageUrl:
      'https://res.cloudinary.com/dfheomufg/image/upload/v1625226260/Movies%20App/check-mark_1_tllt7o.png',
  },
  {
    id: 1,
    title: 'Active',
    imageUrl:
      'https://res.cloudinary.com/dfheomufg/image/upload/v1625226260/Movies%20App/protection_1_m87ptw.png',
  },
  {
    id: 2,
    title: 'Recovered',
    imageUrl:
      'https://res.cloudinary.com/dfheomufg/image/upload/v1625226260/Movies%20App/recovered_1_lyb3ae.png',
  },
  {
    id: 3,
    title: 'Deceased',
    imageUrl:
      'https://res.cloudinary.com/dfheomufg/image/upload/v1625226260/Movies%20App/breathing_1_a5fhfr.png',
  },
]

class ConsolidatedStats extends Component {
  render() {
    const {indiaStatsCount, statsTabClicked, activeTab} = this.props

    for (
      let countRange = 0;
      countRange < consolidatedStats.length;
      countRange += 1
    ) {
      consolidatedStats[countRange].count =
        indiaStatsCount[consolidatedStats[countRange].title]
    }

    return (
      <div className="stats-bg-container">
        {consolidatedStats.map(eachStat => (
          <ConsolidatedStatItem
            eachStat={eachStat}
            key={eachStat.id}
            statsTabClicked={statsTabClicked}
            activeTab={activeTab}
          />
        ))}
      </div>
    )
  }
}

export default ConsolidatedStats
