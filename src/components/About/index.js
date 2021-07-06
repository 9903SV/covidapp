import {Component} from 'react'
import Loader from 'react-loader-spinner'
import QnAItem from '../QnAItem'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {questionsList: [], isLoading: false}

  componentDidMount() {
    this.getQuestionsList()
  }

  getQuestionsList = async () => {
    try {
      this.setState({isLoading: true})
      const response = await fetch(
        'https://api.covid19india.org/website_data.json',
      )
      const data = await response.json()

      this.setState({questionsList: data.faq, isLoading: false})
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    const {questionsList, isLoading} = this.state
    return (
      <div className="about-bg-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#007bff" height={50} width={50} />
        ) : (
          <div>
            <h1 className="about-heading">About</h1>
            <p className="about-date">Last update on March 28th, 2021</p>
            <h1 className="about-vaccine-text">
              COVID-19 vaccines be ready for distribution
            </h1>
            {questionsList.map(eachQuestion => (
              <QnAItem key={eachQuestion.qno} qna={eachQuestion} />
            ))}
            <Footer />
          </div>
        )}
      </div>
    )
  }
}

export default About
