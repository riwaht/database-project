import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import ct from '../assets/ct.svg';
import axios from 'axios';

const Test = () => {
  const navigate = useNavigate();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const getTest = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/medical-imaging/${testID}`);
        setTest(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Test retrieval failed:', error.response.data.error.message);
      }
    };
    getTest();
  }, []);

  const renderTestTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          <p className='mainText'>ID: {test.testID}</p>
          <p className='mainText'>Type: {test.testType}</p>
          <p className='mainText'>Date: {test.testDate}</p>
        </div>
        <div className='imageSurgery'>
          <img src={ct}></img>
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
      <p className='title'>Test #{testID}</p>
      <div className="mainTableDiv">
        {renderTestTable()}
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
                // ?????
                navigate('/patient', { view: 'records', viewIn: 'tests' });
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

export default Test