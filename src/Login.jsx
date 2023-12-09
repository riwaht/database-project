import React, { useState } from 'react';

const Login = () => {
    const [view, setView] = useState('patient'); // 'patient' or 'provider'

    const handleViewChange = (newView) => {
        setView(newView);
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
                </div>
                <div className="loginForm">
                    {view === 'patient' && (
                        <div className="patientLogin">
                            <div className="inputGroup">
                                <label className='patientID'>Patient ID</label>
                                <input type="text" id="patientId" placeholder="Insert Patient ID..." />
                            </div>
                            <div className="inputGroup">
                                <label className='password'>Password</label>
                                <input type="password" id="patientPassword" placeholder="Insert Password..." />
                                <button className='forgotPassword'>Forgot your password?</button>
                            </div>
                            <button className="loginButton">Login</button>
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
                                <button className='forgotPassword'>Forgot your password?</button>
                            </div>
                            <button className="loginButton">Login</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
