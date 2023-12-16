import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';
import back from '../assets/back.svg';

const Provider = () => {
    const [view, setView] = useState('upcoming'); // 'patient' or 'provider'
    const navigate = useNavigate();

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const renderPatientsTable = () => {
        return (
            <div className="mainTable" style={{ backgroundColor: '#2a589c', color: 'white' }}>
                <div className="tableRow">
                    <div className='tableCell'>Patient ID</div>
                    <div className="tableCell">First Name</div>
                    <div className="tableCell">Last Name</div>
                    <div className="tableCell">Last Appointment</div>
                </div>
                {/* Add data rows here */}
                <div className="tableRow">
                    <button className="tableRowFilled">
                        <div className="tableCell">211603</div>
                        <div className="tableCell">John</div>
                        <div className="tableCell">Doe</div>
                        <div className="tableCell">2023-11-19</div>
                    </button>
                </div>
                <div className="tableRow">
                    <button className="tableRowFilled">
                        <div className="tableCell">211603</div>
                        <div className="tableCell">John</div>
                        <div className="tableCell">Doe</div>
                        <div className="tableCell">2023-11-19</div>
                    </button>
                </div>
                <div className="tableRow">
                    <button className="tableRowFilled">
                        <div className="tableCell">211603</div>
                        <div className="tableCell">John</div>
                        <div className="tableCell">Doe</div>
                        <div className="tableCell">2023-11-19</div>
                    </button>
                </div>
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
                <div className="tableRow">
                    <button className="tableRowFilled" onClick={() => navigate('/appointment')}>
                        <div className="tableCell">211603</div>
                        <div className="tableCell">John Doe</div>
                        <div className="tableCell">Incomplete</div>
                        <div className="tableCell">Surgery</div>
                        <div className="tableCell">2023-11-19</div>
                    </button>
                </div>
                <div className="tableRow">
                    <button className="tableRowFilled" onClick={() => navigate('/appointment')}>
                        <div className="tableCell">211603</div>
                        <div className="tableCell">John Doe</div>
                        <div className="tableCell">Incomplete</div>
                        <div className="tableCell">Surgery</div>
                        <div className="tableCell">2023-11-19</div>
                    </button>
                </div>
                <div className="tableRow">
                    <button className="tableRowFilled" onClick={() => navigate('/appointment')}>
                        <div className="tableCell">211603</div>
                        <div className="tableCell">John Doe</div>
                        <div className="tableCell">Incomplete</div>
                        <div className="tableCell">Surgery</div>
                        <div className="tableCell">2023-11-19</div>
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
