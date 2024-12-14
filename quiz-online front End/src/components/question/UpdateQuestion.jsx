import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getQuestionById, updateQuestion } from "../../utils/QuizService"

const UpdateQuestion = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [question, setQuestion] = useState("")
  const [choices, setChoices] = useState([""])
  const [correctAnswers, setCorrectAnswers] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchQuestion()
  }, [])

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id)
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question)
        setChoices(questionToUpdate.choices)
        setCorrectAnswers(questionToUpdate.correctAnswers)
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value)
  }

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices]
    updatedChoices[index] = e.target.value
    setChoices(updatedChoices)
  }

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswers(e.target.value)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers: correctAnswers
          .toString()
          .split(",")
          .map((answer) => answer.trim())
      }
      await updateQuestion(id, updatedQuestion)
      navigate("/all-quizzes")
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header text-center">
              <h5 className="card-title">Update Question</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="form-group mb-3">
                  <label className="text-info">Question:</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={question}
                    onChange={handleQuestionChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="text-info">Choices:</label>
                  {choices.map((choice, index) => (
                    <input
                      key={index}
                      type="text"
                      className="form-control mb-3"
                      value={choice}
                      onChange={(e) => handleChoiceChange(index, e)}
                    />
                  ))}
                </div>

                <div className="form-group mb-3">
                  <label className="text-info">Correct Answer(s):</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={correctAnswers}
                    onChange={handleCorrectAnswerChange}
                  />
                </div>

                <div className="btn-group d-flex justify-content-between">
                  <button type="submit" className="btn btn-outline-warning">
                    Update Question
                  </button>
                  <Link to="/all-quizzes" className="btn btn-outline-primary">
                    Back to All Questions
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateQuestion
