import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import axios from 'axios';

const Lab = () => {
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);

  useEffect(() => {
    const getLab = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/lab-results/${labID}`);
        setLab(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Lab retrieval failed:', error.response.data.error.message);
      }
    };
    getLab();
  }, []);

  const renderLabTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          <p className='mainText'>Last Date: {lab.testDate}</p>
          <p className='mainText'>Results: {lab.testResult} </p>
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
      <p className='title'>Lab #{lab.resultID}</p>
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