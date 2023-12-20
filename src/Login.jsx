import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [view, setView] = useState('patient'); // 'patient' or 'provider'
    const [errorMessage, setErrorMessage] = useState(''); // Error message to display (if any)
    const [forgotPassword, setForgotPassword] = useState(false); // True if user clicked 'Forgot your password?'
    const navigate = useNavigate();

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const handleForgotPassword = () => {
        setForgotPassword(true);
    };


    const handleLogin = async () => {
        const userID = view === 'patient' ? document.getElementById('patientId').value : document.getElementById('providerId').value;
        const password = view === 'patient' ? document.getElementById('patientPassword').value : document.getElementById('providerPassword').value;

        try {
            const response = await axios.post('http://localhost:8000/login', {
                userID,
                password,
            });
            console.log(response);

            // save response data to local storage to be used in other pages
            localStorage.setItem('userID', response.data.data.userID);

            const token = localStorage.getItem('token');
            
            // Set the default Authorization header for all future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Redirect to '/landing' after successful login
            navigate('/landing', { state: { view } });
        } catch (error) {
            // Handle login failure (display error message, etc.)
            setErrorMessage('Login failed. Please try again.');
        }
    };

    const handleAdminLogin = async () => {
        const userID = document.getElementById('adminId').value;
        const password = document.getElementById('adminPassword').value;

        try {
            const response = await axios.post('http://localhost:8000/login', {
                userID,
                password,
            });
            console.log(response);

            // save response data to local storage to be used in other pages
            localStorage.setItem('userID', response.data.data.userID);

            const token = localStorage.getItem('token');
            
            // Set the default Authorization header for all future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Redirect to '/landing' after successful login
            navigate('/admin');
        } catch (error) {
            // Handle login failure (display error message, etc.)
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="fullPageContainer">
            <div className="loginContainer">
                <div className="loginHeader">
                    MediGraph
                </div>
                <div className="viewButtons">
                    <button
                        className={view === 'patient' ? 'activeButton' : 'inactiveButton'}
                        onClick={() => handleViewChange('patient')}
                    >
                        Patient
                    </button>
                    <button
                        className={view === 'provider' ? 'activeButton' : 'inactiveButton'}
                        onClick={() => handleViewChange('provider')}
                    >
                        Provider
                    </button>
                    <button
                        className={view === 'admin' ? 'activeButton' : 'inactiveButton'}
                        onClick={() => handleViewChange('admin')}
                    >
                        Admin
                    </button>
                </div>
                <div className="loginForm">
                    {errorMessage && (
                        <div className="errorMessage">
                            {errorMessage}
                        </div>
                    )}
                    {view === 'patient' && (
                        <div className="patientLogin">
                            <div className="inputGroup">
                                <label className='patientID'>Patient ID</label>
                                <input type="text" id="patientId" placeholder="Insert Patient ID..." />
                            </div>
                            <div className="inputGroup">
                                <label className='password'>Password</label>
                                <input type="password" id="patientPassword" placeholder="Insert Password..." />
                                <button className='forgotPassword' onClick={handleForgotPassword}>Forgot your password?</button>
                            </div>
                            <button className="loginButton" onClick={handleLogin}>Login</button>
                        </div>
                    )}
                    {view === 'provider' && (
                        <div className="providerLogin">
                            <div className="inputGroup">
                                <label className='providerID'>Provider ID</label>
                                <input type="text" id="providerId" placeholder="Insert Provider ID..." />
                            </div>
                            <div className="inputGroup">
                                <label className='password'>Password</label>
                                <input type="password" id="providerPassword" placeholder="Insert Password..." />
                                <button className='forgotPassword' onClick={handleForgotPassword}>Forgot your password?</button>
                            </div>
                            <button className="loginButton" onClick={handleLogin}>Login</button>
                        </div>
                    )}
                    {view === 'admin' && (
                        <div className="adminLogin">
                            {/* Admin login form goes here */}
                            {/* Example structure: */}
                            <div className="inputGroup">
                                <label className='adminID'>Admin ID</label>
                                <input type="text" id="adminId" placeholder="Insert Admin ID..." />
                            </div>
                            <div className="inputGroup">
                                <label className='password'>Password</label>
                                <input type="password" id="adminPassword" placeholder="Insert Password..." style = {{marginBottom: "20px"}} />
                            </div>
                            <button className="loginButton" onClick={handleAdminLogin}>Login</button>
                        </div>
                    )}
                    {forgotPassword && (
                        <div className="forgotError">
                            <h2>Please contact MedigraphIT@gmail.com for help.</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
