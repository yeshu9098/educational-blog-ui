import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import Admin from './components/admin/Admin';
import CreateArticle from './components/forms/CreateArticle';
import CreateQuiz from './components/forms/CreateQuiz';
import ProtectedRoute from './components/ProtectedRoute';
import Articles from './components/admin/Articles';
import Quizzes from './components/admin/Quizzes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route exact path="/" element={<Home />} />

                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/admin/articles" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
                <Route path="/admin/quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
                <Route path="/create-article" element={<ProtectedRoute><CreateArticle /></ProtectedRoute>} />
                <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
