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

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    const fetchInfo = async () => {
      try {
        if (userID) {
          const response = await axios.get(`http://localhost:8000/user/${userID}`);
          setInfo(response.data); // Update state with fetched patient info
        }
      } catch (error) {
        console.error('Error fetching patient info:', error);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    document.body.classList.add('landingPageBody');
    return () => {
      document.body.classList.remove('landingPageBody');
    };
  }, []);

  // get click event on the page
  useEffect(() => {
    const landingPageWrapper = document.querySelector('.landingPageBody');
    console.log('landingPageWrapper', landingPageWrapper);

    const handleClick = (event) => {
      if (event.target === landingPageWrapper) {
        console.log('clicked on landing page');
        if (view === 'patient') {
          navigate('/patient', { state: { view } });
          console.log('navigated to patient');
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
            <div className="welcome">Welcome, {name}.</div>
            <div className='Notifications'>You have 10 pending notifications.</div>
          </div>
        )}
        {view === 'provider' && (
          <div>
            <div className='patientDiv'>
              <div className="welcome">Welcome, Dr. Riwa.</div>
              <div className='Notifications'>You have 10 pending notifications.</div>
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
                navigate('/');
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
