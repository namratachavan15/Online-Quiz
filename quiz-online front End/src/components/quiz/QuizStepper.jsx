import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjects } from './../../utils/QuizService';
import { FaChevronRight ,FaChevronLeft} from 'react-icons/fa';

const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedNumOfQuestions, setSelectedNumOfQuestions] = useState('');
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const allSubjects = await getSubjects();
      setSubjects(allSubjects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (selectedSubject && selectedNumOfQuestions) {
        navigate("/take-quiz", { state: { selectedNumOfQuestions, selectedSubject } });
      } else {
        alert("Please select a subject and number of questions.");
      }
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSelectedSubject = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleNumOfQuestionsChange = (e) => {
    setSelectedNumOfQuestions(e.target.value);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h5 className="text-info mb-3">Select a Subject:</h5>
            <select 
              className="form-select"
              value={selectedSubject}
              onChange={handleSelectedSubject}
            >
              <option>Select a Subject...</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        );
      case 2:
        return (
          <div>
            <h5 className="text-info mb-3">How many questions would you like to attempt?</h5>
            <input
              type="number"
              className="form-control"
              value={selectedNumOfQuestions}
              onChange={handleNumOfQuestionsChange}
              placeholder="Enter number of questions"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h5 className="text-info mb-3">Confirmation</h5>
            <p><strong>Subject:</strong> {selectedSubject}</p>
            <p><strong>Number of Questions:</strong> {selectedNumOfQuestions}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100;
    return (
      <div className="progress mb-4" style={{ height: '5px' }}>
        <div 
          className="progress-bar bg-primary" 
          role="progressbar" 
          style={{ width: `${progress}%` }}
          aria-valuenow={progress} 
          aria-valuemin="0" 
          aria-valuemax="100"
        />
      </div>
    );
  };

  return (
    <section className="mt-5">
      <div className="container">
        <h3 className="text-center text-secondary mb-4">Welcome to Quiz Online</h3>
        {renderProgressBar()}
        
        <div className="card shadow-lg mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            {renderStepContent()}

            <div className="d-flex justify-content-between">
              {currentStep > 1 && (
                <button 
                  className="btn btn-primary mt-2"
                  onClick={handlePreviousStep}
                >
                 <FaChevronLeft /> Previous
                </button>
              )}
              <div>
                {currentStep < 3 && (
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={handleNext}
                    disabled={(currentStep === 1 && !selectedSubject) || (currentStep === 2 && !selectedNumOfQuestions)}
                  >
                    Next <FaChevronRight />
                  </button>
                )}
                {currentStep === 3 && (
                  <button 
                    className="btn btn-success mt-2"
                    onClick={handleNext}
                  >
                    Start Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizStepper;
