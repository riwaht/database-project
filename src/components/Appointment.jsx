import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import knee from '../assets/knee.svg';
import axios from 'axios';

const Appointment = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/appointment/${appointmentID}`);
        setAppointment(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Appointment retrieval failed:', error.response.data.error.message);
      }
    };
    getAppointment();
  }, []);

  const renderProfileTable = () => {
    return (
      <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
        <div className='patientInfo'>
          <p className='mainText'>Patient: {appointment.patientID}</p>
          <p className='mainText'>Type: {appointment.appointmentType}</p>
          <p className='mainText'>Date: {appointment.date}</p>
          <p className='mainText'>Description: {appointment.description}</p>
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
      <p className='title'>{appointment.appointmentID}</p>
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