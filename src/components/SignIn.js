import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignin = (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem(email));

        if (userData && userData.password === password) {
            alert('Signin successful! Redirecting to home page.');
            navigate('/home');
        } else {
            alert('Invalid email or password.');
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
        backgroundColor: '#007bff',
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
        backgroundColor: '#0056b3',
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2 className="signin-header">Sign In</h2>
                <form onSubmit={handleSignin} className="signin-form">
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
                        Sign In
                    </button>
                </form>
                <p className="signin-footer">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
