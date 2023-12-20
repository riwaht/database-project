import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import axios from 'axios';

const Provider = () => {
    const [view, setView] = useState('upcoming'); // 'patient' or 'provider'
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const userID = localStorage.getItem('userID');
    const patientID = localStorage.setItem('patientID', 1);

    const handleViewChange = (newView) => {
        setView(newView);
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/${userID}`);
                setPatients(response.data); // Update state with fetched patients
            }
            catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/appointment/${userID}`);
                setAppointments(response.data); // Update state with fetched appointments
            }
            catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const renderPatientsTable = () => {
        return (
            <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
                <div className="tableRow">
                    <div className='tableCell'>Patient ID</div>
                    <div className="tableCell">First Name</div>
                    <div className="tableCell">Last Name</div>
                    <div className="tableCell">Last Appointment</div>
                </div>
                {patients.map((patient) => {
                    patientID = patient.id;
                    return (
                        <div className="tableRow">
                            <button className="tableRowFilled" onClick={() => navigate('/patient')}>
                                <div className="tableCell">{patient.id}</div>
                                <div className="tableCell">{patient.first_name}</div>
                                <div className="tableCell">{patient.last_name}</div>
                                <div className="tableCell">
                                    // TODO: Get last appointment date
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderUpcomingTable = () => {
        return (
            <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
                <div className="tableRow">
                    <div className="tableCell">Upcoming</div>
                    <div className="tableCell">Patient</div>
                    <div className="tableCell">Status</div>
                    <div className="tableCell">Type</div>
                    <div className="tableCell">Date</div>
                </div>
                {/* Add data rows here */}
                {appointments.map((appointment) => {
                    return (
                        <div className="tableRow">
                            <button className="tableRowFilled" onClick={() => navigate('/appointment')}>
                                <div className="tableCell">{appointment.id}</div>
                                <div className="tableCell">{appointment.patient_id}</div>
                                <div className="tableCell">{appointment.status}</div>
                                <div className="tableCell">{appointment.appointmentType}</div>
                                <div className="tableCell">{appointment.date}</div>
                            </button>
                        </div>
                    );
                })}
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
                    className={view === 'upcoming' ? 'activeButtonMain' : 'inactiveButtonMain'}
                    onClick={() => handleViewChange('upcoming')}
                >
                    Upcoming
                </button>
                <button
                    className={view === 'patients' ? 'activeButtonMain' : 'inactiveButtonMain'}
                    onClick={() => handleViewChange('patients')}
                >
                    Patients
                </button>
            </div>
            <div className="mainTableDiv">
                {view === 'patients' && renderPatientsTable()}
                {view === 'upcoming' && renderUpcomingTable()}
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

export default Provider;
