import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';
import axios from 'axios';

const Admin = () => {
    const [view, setView] = useState('providers'); // 'patient' or 'provider'
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [providers, setProviders] = useState([]);
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
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/${userID}`);
                setProviders(response.data); // Update state with fetched providers
            }
            catch (error) {
                console.error('Error fetching providers:', error);
            }
        };

        fetchProviders();
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

    const renderProvidersTable = () => {
        return (
            <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
                <div className="tableRow">
                    <div className='tableCell'>Provider ID</div>
                    <div className="tableCell">First Name</div>
                    <div className="tableCell">Last Name</div>
                    <div className="tableCell">Specialty</div>
                </div>
                {/* Add data rows here */}
                {providers && providers.map((provider) => {
                    return (
                        <div className="tableRow">
                            <button className="tableRowFilled" onClick={() => navigate('/provider')}>
                                <div className="tableCell">{provider.id}</div>
                                <div className="tableCell">{provider.first_name}</div>
                                <div className="tableCell">{provider.last_name}</div>
                                <div className="tableCell">{provider.profession}</div>
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
                    className={view === 'providers' ? 'activeButtonMain' : 'inactiveButtonMain'}
                    onClick={() => handleViewChange('providers')}
                >
                    Providers
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
                {view === 'providers' && renderProvidersTable()}
            </div>
            <footer className="navbar">
                <div className="navbarContent">
                    <div className="footerTitle">Admin</div>
                    <div className="footerIcons">
                        <button className="footerIcon" onClick={() => navigate('/login')}>
                            <img src={home}></img>
                        </button>
                        <button className="footerIcon"
                            onClick={() => {
                                navigate('/login');
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

export default Admin;
