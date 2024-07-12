import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/quiz/create",
        {
          question,
          options,
          correctOptionIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Quiz created:", response.data);
      navigate("/admin");
    } catch (error) {
      console.error("Error creating quiz:", error);
      if (error.response) {
        console.error("Server response:", error.response.data); // Log server response for debugging
      }
      setError("Error creating quiz. Please try again.");
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-5 col-lg-4">
            <div className="">
              <Link to="/admin" className="text-dark text-decoration-none">
                Admin
              </Link>{" "}
              |{" "}
              <Link className="text-dark text-decoration-none" to="/">
                Home
              </Link>
              <h2>Create New Quiz</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="question" className="my-2">
                    Question:
                  </label>
                  <input
                    type="text"
                    id="question"
                    className="form-control my-2"
                    value={question}
                    style={{ borderRadius: "0" }}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  />
                </div>
                {options.map((option, index) => (
                  <div key={index} className="form-group">
                    <label
                      htmlFor={`option-${index}`}
                      className="my-2"
                    >{`Option ${index + 1}:`}</label>
                    <input
                      type="text"
                      id={`option-${index}`}
                      className="form-control my-2"
                      value={option}
                      style={{ borderRadius: "0" }}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      required
                    />
                  </div>
                ))}
                <div className="form-group">
                  <label htmlFor="correctOptionIndex" className="my-2">
                    Correct Option Index:
                  </label>
                  <select
                    id="correctOptionIndex"
                    className="form-control my-2"
                    value={correctOptionIndex}
                    onChange={(e) =>
                      setCorrectOptionIndex(parseInt(e.target.value))
                    }
                    required
                  >
                    {options.map((_, index) => (
                      <option key={index} value={index}>{`Option ${
                        index + 1
                      }`}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-dark btn-block my-2"
                  style={{ borderRadius: "0" }}
                >
                  Create Quiz
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
