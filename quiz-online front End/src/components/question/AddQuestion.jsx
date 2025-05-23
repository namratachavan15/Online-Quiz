import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getSubjects, createQuestion } from "../../utils/QuizService"

const AddQuestion = () => {
  const [question, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState("single")
  const [choices, setChoices] = useState([""])
  const [correctAnswers, setCorrectAnswers] = useState([""])
  const [subject, setSubject] = useState("")
  const [newSubject, setNewSubject] = useState("")
  const [subjectOptions, setSubjectOptions] = useState([""])

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const subjectsData = await getSubjects()
      setSubjectOptions(subjectsData)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddChoice = () => {
    const newChoice = `${String.fromCharCode(65 + choices.length)}.`
    setChoices([...choices, newChoice])
  }

  const handleRemoveChoice = (index) => {
    setChoices(choices.filter((choice, i) => i !== index))
  }

  const handleChoiceChange = (index, value) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)))
  }

  const handleCorrectAnswerChange = (index, value) => {
    setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
  }

  const handleAddCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""])
  }

  const handleRemoveCorrectAnswer = (index) => {
    setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = {
        question,
        questionType,
        choices,
        correctAnswers: correctAnswers.map((answer) => {
          const choiceLetter = answer.charAt(0).toUpperCase()
          const choiceIndex = choiceLetter.charCodeAt(0) - 65
          return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null
        }),
        subject,
      }

      console.log(result)
      await createQuestion(result)

      // Reset form
      setQuestionText("")
      setQuestionType("single")
      setChoices([""])
      setCorrectAnswers([""])
      setSubject("")
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubject(newSubject.trim())
      setSubjectOptions([...subjectOptions, newSubject.trim()])
      setNewSubject("")
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header text-center">
              <h5 className="card-title">Add New Question</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Subject Selection */}
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-info">
                    Select a Subject
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Subject</option>
                    <option value="New">Add New</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* New Subject Input */}
                {subject === "New" && (
                  <div className="mb-3">
                    <label htmlFor="new-subject" className="form-label text-info">
                      Add New Subject
                    </label>
                    <input
                      type="text"
                      id="new-subject"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="btn btn-outline-primary mt-2"
                    >
                      Add Subject
                    </button>
                  </div>
                )}

                {/* Question Input */}
                <div className="mb-3">
                  <label htmlFor="question-text" className="form-label text-info">
                    Question
                  </label>
                  <textarea
                    id="question-text"
                    className="form-control"
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>

                {/* Question Type */}
                <div className="mb-3">
                  <label htmlFor="question-type" className="form-label text-info">
                    Question Type
                  </label>
                  <select
                    id="question-type"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="form-control"
                  >
                    <option value="single">Single Answer</option>
                    <option value="multiple">Multiple Answer</option>
                  </select>
                </div>

                {/* Choices */}
                <div className="mb-3">
                  <label htmlFor="choices" className="form-label text-primary">
                    Choices
                  </label>
                  {choices.map((choice, index) => (
                    <div key={index} className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChoice(index)}
                        className="btn btn-outline-danger"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddChoice}
                    className="btn btn-outline-primary"
                  >
                    Add Choice
                  </button>
                </div>

                {/* Correct Answer(s) */}
                {questionType === "single" && (
                  <div className="mb-3">
                    <label htmlFor="correct-answer" className="form-label text-success">
                      Correct Answer
                    </label>
                    <input
                      id="correct-answer"
                      type="text"
                      className="form-control"
                      value={correctAnswers[0]}
                      onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                    />
                  </div>
                )}

                {questionType === "multiple" && (
                  <div className="mb-3">
                    <label htmlFor="correct-answers" className="form-label text-success">
                      Correct Answer(s)
                    </label>
                    {correctAnswers.map((answer, index) => (
                      <div key={index} className="d-flex mb-2">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={answer}
                          onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveCorrectAnswer(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={handleAddCorrectAnswer}
                    >
                      Add Correct Answer
                    </button>
                  </div>
                )}

                {/* Submit */}
                <div className="btn-group d-flex justify-content-between">
                  <button type="submit" className="btn btn-outline-success">
                    Save Question
                  </button>
                  <Link to="/all-quizzes" className="btn btn-outline-primary">
                    Back to Existing Questions
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

export default AddQuestion
