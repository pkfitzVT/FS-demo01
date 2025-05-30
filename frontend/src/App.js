// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import FindByEmail from './FindByEmail';

export default function App() {
    return (
        <BrowserRouter>
            <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>Sign Up</Link>
                <Link to="/find">Find User</Link>
            </header>

            <main style={{ padding: '1rem' }}>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/find" element={<FindByEmail />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}
