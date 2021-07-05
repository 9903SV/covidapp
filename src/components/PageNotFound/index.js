import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="pagenotfound-bg-container">
    <img
      src="https://res.cloudinary.com/dfheomufg/image/upload/v1625203103/Movies%20App/Group_7484_s0dvsc.png"
      alt="not found"
    />
    <h1>PAGE NOT FOUND</h1>
    <p className="pagenotfound-description">
      We are sorry, the page you requested could not be found
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button className="pagenotfound-button" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default PageNotFound
