import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';

const Prescription = () => {
  const navigate = useNavigate();

  const renderPrescriptionTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          <p className='mainText'>Name: Ibuprofen</p>
          <p className='mainText'>Category: Nonsteroidal Anti-inflammatory Drug (NSAID)</p>
          <p className='mainText'>Quantity: 200mg tablets, 30 tablets</p>
          <p className='mainText'>Date given: 10/11/2023</p>
          <p className='mainText'>Current Day: Day 5/30</p>
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
      <p className='title'>Prescription #1044</p>
      <div className="mainTableDiv">
        {renderPrescriptionTable()}
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

export default Prescription