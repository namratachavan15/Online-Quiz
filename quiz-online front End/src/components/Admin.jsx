import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'; 
const Admin = () => {
  return (
    <section className="container my-5">
      {/* Welcome Section */}
      <h2 className="text-center mb-4 text-primary">Welcome to the Admin Dashboard</h2>
      <p className="text-center text-muted">Manage your quizzes and create new ones</p>
      
      <hr />
      
      {/* Cards Section */}
      <div className="row justify-content-center">
        {/* Create New Quiz Card */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 d-flex flex-column shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">
                <i className="bi bi-plus-circle-fill me-2"></i>
                Create a New Quiz
              </h5>
              <p className="card-text text-muted">
                Start building a new quiz with questions and answers.
              </p>
              <Link to={"/create-quiz"} className="btn btn-primary w-100 mt-auto">
                <i className="bi bi-pencil-square me-2"></i> Go to Create Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Manage Existing Quizzes Card */}
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card h-100 d-flex flex-column shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">
                <i className="bi bi-gear-fill me-2"></i>
                Manage Existing Quizzes
              </h5>
              <p className="card-text text-muted">
                Edit, delete or review your existing quizzes.
              </p>
              <Link to={"/all-quizzes"} className="btn btn-primary w-100 mt-4">
                <i className="bi bi-list-ul me-2"></i> Go to Manage Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
