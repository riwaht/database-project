import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';

const LandingPage = () => {
  const location = useLocation();
  const view = location.state?.view || 'patient';
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('landingPageBody');
    return () => {
      document.body.classList.remove('landingPageBody');
    };
  }, []);

  // get click event on the page
  useEffect(() => {
    const handleClick = () => {
      if (view === 'patient') {
        navigate('/patient', { state: { view } });
      } else {
        navigate('/provider', { state: { view } });
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [navigate, view]);

  return (
    <div className="landingPageWrapper">
      <div className="landingPage">
        <h1 className="medigraph-title">MediGraph</h1>
        {view === 'patient' && (
          <div className='patientDiv'>
            <div className="welcome">Welcome Charbel.</div>
            <div className='Notifications'>You have 10 pending notifications.</div>
          </div>
        )}
        {view === 'provider' && (
          <div>
            <div className='patientDiv'>
              <div className="welcome">Welcome Dr. Riwa.</div>
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
