import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';

const Patient = () => {
  const [view, setView] = useState('upcoming'); // 'patient' or 'provider'
  const navigate = useNavigate();

  const handleViewChange = (newView) => {
    setView(newView);
  };

  useEffect(() => {
    document.body.classList.add('landingPageBody');
    return () => {
      document.body.classList.remove('landingPageBody');
    };
  }, []);

  return (
    <div className="mainPage">
      <h1 className="medigraph-title">MediGraph</h1>
      <div className="viewButtonsMain">
        <button
          className={view === 'upcoming' ? 'activeButtonMain' : 'inactiveButtonMain'}
          onClick={() => handleViewChange('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={view === 'patients' ? 'activeButtonMain' : 'inactiveButtonMain'}
          onClick={() => handleViewChange('patients')}
        >
          Patients
        </button>
      </div>
      <div className="mainTable">
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

export default Patient;
