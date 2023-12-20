import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import axios from 'axios';

const LandingPage = () => {
  const location = useLocation();
  const view = location.state?.view || 'patient';
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);

  const username = localStorage.getItem('username');

  useEffect(() => {
    document.body.classList.add('landingPageBody');
    return () => {
      document.body.classList.remove('landingPageBody');
    };
  }, []);

  // get click event on the page
  useEffect(() => {
    const landingPageWrapper = document.querySelector('.landingPageBody');

    const handleClick = (event) => {
      if (event.target === landingPageWrapper) {
        if (view === 'patient') {
          navigate('/patient', { state: { view } });
        } else {
          navigate('/provider', { state: { view } });
        }
      }
    };

    landingPageWrapper.addEventListener('click', handleClick);

    return () => {
      landingPageWrapper.removeEventListener('click', handleClick);
    };
  }, [navigate, view]);

  return (
    <div className="landingPageWrapper">
      <div className="landingPage">
        <h1 className="medigraph-title">MediGraph</h1>
        {view === 'patient' && (
          <div className='patientDiv'>
            <div className="welcome">Welcome, {username}.</div>
          </div>
        )}
        {view === 'provider' && (
          <div>
            <div className='patientDiv'>
              <div className="welcome">Welcome, Dr. {username}.</div>
            </div>
          </div>
        )}
      </div>
      <footer className="navbar">
        <div className="navbarContent">
          <div className="footerTitle">Click anywhere to continue</div>
          <div className="footerIcons">
            <button className="footerIcon">
              <img src={home}></img>
            </button>
            <button className="footerIcon"
              onClick={() => {
                navigate('/'), localStorage.clear();
              }}
            >
              
              <img src={back}></img>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
