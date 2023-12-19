import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import knee from '../assets/knee.svg';

const Appointment = () => {
  const navigate = useNavigate();

  const renderProfileTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          <p className='mainText'>Patient: John Doe</p>
          <p className='mainText'>Type: Surgery</p>
          <p className='mainText'>Status: Incomplete</p>
          <p className='mainText'>Date: 19/11/2023 20:35</p>
          <p className='mainText'>Description: Knee Arthoscopy</p>
        </div>
        <div className='imageSurgery'>
          <img src={knee}></img>
        </div>
      </div>
    );
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
      <p className='title'>211603</p>
      <div className="mainTableDiv">
        {renderProfileTable()}
      </div>
      <footer className="navbar">
        <div className="navbarContent">
          <div className="footerTitle">Dr. Riwa</div>
          <div className="footerIcons">
            <button className="footerIcon" onClick={() => navigate('/landing')}>
              <img src={home}></img>
            </button>
            <button className="footerIcon"
              onClick={() => {
                navigate('/provider', { view: 'upcoming' });
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

export default Appointment