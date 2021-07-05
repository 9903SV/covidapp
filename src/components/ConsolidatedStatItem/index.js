import {Component} from 'react'
import './index.css'

class ConsolidatedStatItem extends Component {
  getHexCode = id => {
    if (id === 0) {
      return 'confirmed-hex-code'
    }
    if (id === 1) {
      return 'active-hex-code'
    }
    if (id === 2) {
      return 'recovered-hex-code'
    }
    return 'deceased-hex-code'
  }

  getBgColor = title => {
    const {eachStat} = this.props
    if (title === eachStat.title && title === 'Confirmed') {
      return 'confirmed-bg-color'
    }
    if (title === eachStat.title && title === 'Active') {
      return 'active-bg-color'
    }
    if (title === eachStat.title && title === 'Recovered') {
      return 'recovered-bg-color'
    }
    if (title === eachStat.title && title === 'Deceased') {
      return 'deceased-bg-color'
    }
    return null
  }

  countTabClicked = () => {
    const {statsTabClicked, eachStat} = this.props
    statsTabClicked(eachStat.title)
  }

  render() {
    const {eachStat, activeTab} = this.props
    return (
      <div
        className={`stat-container ${this.getHexCode(
          eachStat.id,
        )} ${this.getBgColor(activeTab)}`}
        key={eachStat.id}
        onClick={this.countTabClicked}
        aria-hidden="true"
      >
        <p>{eachStat.title}</p>
        <img
          className="stat-image"
          src={eachStat.imageUrl}
          alt={eachStat.title}
        />
        <p className="stat-count">{eachStat.count}</p>
      </div>
    )
  }
}

export default ConsolidatedStatItem
