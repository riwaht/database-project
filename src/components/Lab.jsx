import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';

const Lab = () => {
  const navigate = useNavigate();

  const renderLabTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          <p className='mainText'>ID: 1044</p>
          <p className='mainText'>Date: 19/11/2023</p>
          <p className='mainText'>Type: Blood Test</p>
          <p className='mainText'>Results:</p>
          <p className='mainText'>Complete Blood Count (CBC):
            White Blood Cell Count (WBC): 7.2 x10^9/L (Normal range: 4.0-11.0 x10^9/L)
            Red Blood Cell Count (RBC): 5.0 x10^12/L (Normal range: 4.2-6.1 x10^12/L)
            Hemoglobin: 14.5 g/dL (Normal range: 13.5-17.5 g/dL)
            Platelet Count: 250 x10^9/L (Normal range: 150-400 x10^9/L)</p>
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
      <p className='title'>Lab #1044</p>
      <div className="mainTableDiv">
        {renderLabTable()}
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
                navigate('/patient', { view: 'records', viewIn: 'results' });
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

export default Lab