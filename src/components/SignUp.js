import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (email && password) {
            localStorage.setItem(email, JSON.stringify({ password }));
            alert('Signup successful! You can now sign in.');
            navigate('/signin');
        } else {
            alert('Please fill in both fields.');
        }
    };

    // Inline styles
    const inputStyle = {
        padding: '12px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '15px',
    };

    const buttonStyle = {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#218838',
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-header">Sign Up</h2>
                <form onSubmit={handleSignup} className="signup-form">
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
