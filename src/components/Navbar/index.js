import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Navbar extends Component {
  state = {activeTab: 'Home'}

  linkClicked = event => {
    if (event.target.text === 'COVID19INDIA') {
      this.setState({activeTab: 'Home'})
    } else {
      this.setState({activeTab: event.target.text})
    }
  }

  render() {
    const {activeTab} = this.state

    return (
      <div className="navbar-bg-container">
        <Link to="/" className="navbar-heading" onClick={this.linkClicked}>
          COVID19<span className="navbar-heading-highlight">INDIA</span>
        </Link>
        <div>
          <Link
            to="/"
            className={`navbar-link ${
              activeTab === 'Home' ? 'navbar-highlight-link' : ''
            }`}
            onClick={this.linkClicked}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`navbar-link ${
              activeTab === 'About' ? 'navbar-highlight-link' : ''
            }`}
            onClick={this.linkClicked}
          >
            About
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar
