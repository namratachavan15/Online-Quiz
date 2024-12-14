import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import AddQuestion from './components/question/AddQuestion'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import QuizStepper from './components/quiz/QuizStepper'
import Quiz from './components/quiz/Quiz'
import Admin from './components/Admin'
import UpdateQuestion from './components/question/UpdateQuestion';
import GetAllQuiz from './components/quiz/GetAllQuiz';

import Navbar from "./components/layout/NavBar";
import QuizResult from './components/quiz/Quizresult'

function App() {
  

  return (
    <main className='container mt-5 mb-5'>
    <Router>
    <Navbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/quiz-stepper" element={<QuizStepper/>}/> 
      <Route path="/take-quiz" element={<Quiz/>}/>
      <Route path="/admin" element={<Admin />} />
      <Route path="/create-quiz" element={<AddQuestion/>}/>
      <Route path="/update-quiz/:id" element={<UpdateQuestion/>}/>
      <Route path="/all-quizzes" element={<GetAllQuiz/>}/>
      <Route path="/quiz-result" element={<QuizResult/>}/>
      </Routes>
      
    </Router>
    </main>
  )
}

export default App
