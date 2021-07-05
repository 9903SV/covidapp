import './index.css'

const QnAItem = props => {
  const {qna} = props
  return (
    <div>
      <p className="qna-question">{qna.question}</p>
      <p className="qna-answer">{qna.answer}</p>
    </div>
  )
}

export default QnAItem
