import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import ct from '../assets/ct.svg';
import axios from 'axios';

const PatientInfo = () => {
  const [view, setView] = useState('records');
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const patientID = localStorage.getItem('patientID');
  const [prescriptions, setPrescriptions] = useState(null);
  const [providerInfo, setProviderInfo] = useState(null);
  const [tests, setTests] = useState(null);
  const [results, setResults] = useState(null);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${patientID}`);
        setPatientInfo(response.data); // Update state with fetched patient info
      } catch (error) {
        console.error('Error fetching patient info:', error);
      }
    };

    fetchPatientInfo();
  }, []);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/prescription/${patientID}`);
        setPrescriptions(response.data); // Update state with fetched prescriptions
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);


  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/medical-imaging/${patientID}`);
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
        const response = await axios.get(`http://localhost:8000/lab-result/${patientID}`);
        setResults(response.data); // Update state with fetched results
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);


  const renderProfileTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
        <div className='patientInfo'>
          <p className='mainText'>Gender: {patientID.gender}</p>
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
        <p className='mainText'>Last Appointment:</p>
        <p className='mainText'>Diagnosis:</p>
        <p className='mainText'>Treatment:</p>
      </div>
    );
  };

  const renderTestsTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          {tests &&
            <div className="mainText">
              {tests.testID}
              {tests.testDate}
              {tests.resultsData}
            </div>
          }
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
          {prescriptions &&
            <div className="mainText">
              {prescriptions.prescriptionID}
              {prescriptions.prescriptionDate}
              {prescriptions.prescriptionData}
            </div>
          }
        </div>
      </div>
    );
  }

  const renderLaboratoryTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          {results &&
            <div className="mainText">
              {results.resultID}
              {results.resultDate}
              {results.resultData}
            </div>
          }
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
      <p className='title'>{patientInfo.firstName} {patientInfo.lastName}</p>
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
