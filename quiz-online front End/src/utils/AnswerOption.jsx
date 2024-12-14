import React from 'react'

const AnswerOption = ({question,isChecked,handleAnswerChange,handleCheckboxChange}) => {
    console.log("inside answer option")
    if(!question)
    {
        return <div>No questions available</div>
    }

    const {id,questionType,choices}=question
    console.log(questionType)
    if(questionType==="single")
    {
        return (
            <div>
				{choices.sort().map((choice, index) => (
					<div key={choice} className="form-check mb-3">
						<input
							className="form-check-input"
							type="radio"
							id={choice}
							name={question.id}
							value={choice}
							checked={isChecked(question.id, choice)}
							onChange={() => handleAnswerChange(id, choice)}
						/>
						<label htmlFor={choice} className="form-check-label ms-2">
							{choice}
						</label>
					</div>
				))}
			</div>   )

    }
    else if(questionType==="multiple")
    {
        console.log(choices)
        return(
            <div>
            {choices.sort().map((choice, index) => (
                <div key={choice} className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={choice}
                        name={question.id}
                        value={choice}
                        checked={isChecked(question.id, choice)}
                        onChange={() => handleCheckboxChange(id, choice)}
                    />
                    <label htmlFor={choice} className="form-check-label ms-2">
                        {choice}
                    </label>
                </div>
            ))}
        </div>
        )

    }
    else{
        return null
    }
}

export default AnswerOption