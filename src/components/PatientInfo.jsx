import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import ct from '../assets/ct.svg';

const PatientInfo = () => {
  const [view, setView] = useState('records');
  const navigate = useNavigate();

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const renderProfileTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className='patientInfo'>
          <p className='mainText'>Gender: M</p>
          <p className='mainText'>Date of Birth: 10/9/2020</p>
        </div>
        <div className="viewButtonsTable">
          <button
            className={view === 'records' ? 'activeButton' : 'inactiveButton'}
            onClick={() => handleViewChange('records')}
          >
            Records
          </button>
          <button
            className={view === 'tests' ? 'activeButton' : 'inactiveButton'}
            onClick={() => handleViewChange('tests')}
          >
            Tests
          </button>
          <button
            className={view === 'prescription' ? 'activeButton' : 'inactiveButton'}
            onClick={() => handleViewChange('prescription')}
          >
            Prescription
          </button>
          <button
            className={view === 'laboratory' ? 'activeButton' : 'inactiveButton'}
            onClick={() => handleViewChange('laboratory')}
          >
            Laboratory
          </button>
        </div>
        {view === 'records' && renderRecordsTable()}
        {view === 'tests' && renderTestsTable()}
        {view === 'prescription' && renderPrescriptionTable()}
        {view === 'laboratory' && renderLaboratoryTable()}
      </div>
    );
  };

  const renderRecordsTable = () => {
    return (
      <div className='patientInfo'>
        <p className='mainText'>Last Appointment: 10/9/2020</p>
        <p className='mainText'>Diagnosis:</p>
        <p className='mainText'>Treatment:</p>
      </div>
    );
  };

  const renderTestsTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          <p className='mainText'>ID: 19404</p>
          <p className='mainText'>Type: CT-Scan</p>
          <p className='mainText'>Date: 10/9/2020</p>
        </div>
        <div className='imageSurgery'>
          <img src={ct}></img>
        </div>
      </div>
    );
  };

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
  }

  const renderLaboratoryTable = () => {
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
  }



  useEffect(() => {
    document.body.classList.add('landingPageBody');
    return () => {
      document.body.classList.remove('landingPageBody');
    };
  }, []);

  return (
    <div className="mainPage">
      <h1 className="medigraph-title">MediGraph</h1>
      <p className='title'>John Doe</p>
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
                navigate('/landing');
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

export default PatientInfo;
