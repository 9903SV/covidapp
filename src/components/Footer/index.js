import {FiGithub, FiInstagram, FiTwitter} from 'react-icons/fi'
import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <h1 className="footer-heading">
      COVID19<span className="footer-heading-highlight">INDIA</span>
    </h1>
    <p>we stand with everyone fighting on the front lines</p>
    <div>
      <a
        href="https://github.com/covid19india/covid19india-react"
        target="_blank"
        rel="noreferrer"
      >
        <FiGithub className="footer-icon" />
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noreferrer">
        <FiInstagram className="footer-icon" />
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noreferrer">
        <FiTwitter className="footer-icon" />
      </a>
    </div>
  </div>
)

export default Footer
