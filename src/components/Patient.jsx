import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';

const Patient = () => {
  const [view, setView] = useState('profile');
  const [viewIn, setViewIn] = useState('tests');
  const navigate = useNavigate();

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleViewChangeIn = (newView) => {
    setViewIn(newView);
  };

  const renderProfileTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className='patientInfo'>
          <p className='mainText'>First Name: Charbel</p>
          <p className='mainText'>Last Name: El Bateh</p>
          <p className='mainText'>Date of Birth: 1/1/2002</p>
          <p className='mainText'>Gender: M</p>
          <p className='mainText'>Main Healthcare Provider: Dr. Riwa</p>
        </div>
      </div>
    );
  };

  const renderRecordsTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className="viewButtonsTable">
          <button
            className={viewIn === 'tests' ? 'activeButton' : 'inactiveButton'}
            onClick={() => handleViewChangeIn('tests')}
          >
            Tests
          </button>
          <button
            className={viewIn === 'results' ? 'activeButton' : 'inactiveButton'}
            onClick={() => handleViewChangeIn('results')}
          >
            Lab Results
          </button>
        </div>
        {viewIn === 'tests' && renderTestsTable()}
        {viewIn === 'results' && renderResultsTable()}
      </div>
    );
  };

  const renderTestsTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className="tableRow">
          <div className='tableCell'>ID</div>
          <div className="tableCell">Date</div>
          <div className="tableCell">Results</div>
        </div>
        <div className="tableRow">
          <button className="tableRowFilled" onClick={() => navigate('/test')}>
            <div className="tableCell">19405</div>
            <div className="tableCell">10/11/2023</div>
            <div className="tableCell">Incomplete</div>
          </button>
        </div>
        <div className="tableRow">
          <button className="tableRowFilled" onClick={() => navigate('/test')}>
            <div className="tableCell">19404</div>
            <div className="tableCell">10/11/2023</div>
            <div className="tableCell">Complete</div>
          </button>
        </div>
      </div>
    );
  };

  const renderResultsTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className="tableRow">
          <div className='tableCell'>ID</div>
          <div className="tableCell">Date</div>
          <div className="tableCell">Results</div>
        </div>
        <div className="tableRow">
          <button className="tableRowFilled" onClick={() => navigate('/lab')}>
            <div className="tableCell">1045</div>
            <div className="tableCell">10/11/2023</div>
            <div className="tableCell">Incomplete</div>
          </button>
        </div>
        <div className="tableRow">
          <button className="tableRowFilled" onClick={() => navigate('/lab')}>
            <div className="tableCell">1044</div>
            <div className="tableCell">10/11/2023</div>
            <div className="tableCell">Complete</div>
          </button>
        </div>
      </div>
    );
  };

  const renderPrescriptionTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className="tableRow">
          <div className='tableCell'>ID</div>
          <div className="tableCell">Date</div>
          <div className="tableCell">Timing</div>
        </div>
        <div className="tableRow">
          <button className="tableRowFilled" onClick={() => navigate('/prescription')}>
            <div className="tableCell">456</div>
            <div className="tableCell">10/11/2023</div>
            <div className="tableCell">Ongoing</div>
          </button>
        </div>
        <div className="tableRow">
          <button className="tableRowFilled" onClick={() => navigate('/prescription')}>
            <div className="tableCell">455</div>
            <div className="tableCell">10/11/2023</div>
            <div className="tableCell">Complete</div>
          </button>
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
      <div className="viewButtonsMain">
        <button
          className={view === 'profile' ? 'activeButtonMain' : 'inactiveButtonMain'}
          onClick={() => handleViewChange('profile')}
        >
          Profile
        </button>
        <button
          className={view === 'records' ? 'activeButtonMain' : 'inactiveButtonMain'}
          onClick={() => handleViewChange('records')}
        >
          Records
        </button>
        <button
          className={view === 'prescription' ? 'activeButtonMain' : 'inactiveButtonMain'}
          onClick={() => handleViewChange('prescription')}
        >
          Prescription
        </button>
      </div>
      <div className="mainTableDiv">
        {view === 'profile' && renderProfileTable()}
        {view === 'records' && renderRecordsTable()}
        {view === 'prescription' && renderPrescriptionTable()}
      </div>
      <footer className="navbar">
        <div className="navbarContent">
          <div className="footerTitle">Charbel</div>
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

export default Patient;
