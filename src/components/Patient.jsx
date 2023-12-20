import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import axios from 'axios';

const Patient = () => {
  const [view, setView] = useState('profile');
  const [viewIn, setViewIn] = useState('tests');
  const [prescriptions, setPrescriptions] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [providerInfo, setProviderInfo] = useState(null);
  const [tests, setTests] = useState(null);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleViewChangeIn = (newView) => {
    setViewIn(newView);
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/prescription/${userID}`);
        setPrescriptions(response.data); // Update state with fetched prescriptions
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        if (userID) {
          const response = await axios.get(`http://localhost:8000/user/${userID}`);
          setPatientInfo(response.data); // Update state with fetched patient info
        }
      } catch (error) {
        console.error('Error fetching patient info:', error);
      }
    };

    fetchPatientInfo();
  }, []);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/medical-imaging/${userID}`);
        setTests(response.data); // Update state with fetched tests
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/lab-result/${userID}`);
        setResults(response.data); // Update state with fetched results
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  useEffect(() => {
    const fetchProviderInfo = async () => {
      try {
        if (userID) {
          const response = await axios.get(`http://localhost:8000/user/${userID}`);
          setProviderInfo(response.data); // Update state with fetched provider info
        }
      } catch (error) {
        console.error('Error fetching provider info:', error);
      }
    };

    fetchProviderInfo();
  }, []);

  const renderProfileTable = () => {
    if (!patientInfo) {
      return <p>Loading...</p>;
    }
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className='patientInfo'>
          <p className='mainText'>First Name: {patientInfo.firstName}</p>
          <p className='mainText'>Last Name: {patientInfo.lastName}</p>
          <p className='mainText'>Date of Birth: {patientInfo.dateOfBirth}</p>
          <p className='mainText'>Gender: {patientInfo.gender}</p>
          <p className='mainText'>Main Provider: {providerInfo.firstName} {providerInfo.lastName}</p>
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
        {tests && tests.map(test => (
          <div className="tableRow" key={test.testID}>
            <button className="tableRowFilled" onClick={() => navigate('/test')}>
              <div className="tableCell">{test.testID}</div>
              <div className="tableCell">{test.testDate}</div>
              <div className="tableCell">{test.resultsData}</div>
            </button>
          </div>
        ))}
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
        {results && results.map(result => (
          <div className="tableRow" key={result.resultID}>
            <button className="tableRowFilled" onClick={() => navigate('/result')}>
              <div className="tableCell">{result.resultID}</div>
              <div className="tableCell">{result.resultDate}</div>
              <div className="tableCell">{result.testResult}</div>
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderPrescriptionTable = () => {
    if (!prescriptions) {
      return <p>Loading...</p>;
    }
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className="tableRow">
          <div className='tableCell'>ID</div>
          <div className="tableCell">Date</div>
        </div>
        {prescription && prescriptions.map(prescription => (
          <div className="tableRow" key={prescription.prescriptionID}>
            <button className="tableRowFilled" onClick={() => navigate('/prescription')}>
              <div className="tableCell">{prescription.prescriptionID}</div>
              <div className="tableCell">{prescription.dispenseDate}</div>
            </button>
          </div>
        ))}
      </div >
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
