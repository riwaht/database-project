import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import axios from 'axios';

const Prescription = () => {
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const getPrescription = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/prescription/${prescriptionID}`);
        setPrescription(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Prescription retrieval failed:', error.response.data.error.message);
      }
    };
    getPrescription();
  }, []);

  const renderPrescriptionTable = () => {
    if (!prescription) {
      return <p className='mainText'>Loading...</p>;
    }

    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          <p className='mainText'>Name: {prescription.prescriptionName}</p>
          <p className='mainText'>Category: {prescription.prescriptionCategory}</p>
          <p className='mainText'>Quantity: {prescription.quantity}</p>
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
      <p className='title'>Prescription #{prescription.prescriptionID}</p>
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