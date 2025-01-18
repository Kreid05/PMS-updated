import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/navigation/sidebar';
import Dashboard from './components/dashboard/dashboard';
import Room from './components/room/room';
import Booking from './components/booking/booking';
import Guest from './components/guest/guest';
import Facilities from './components/facilities/facilities';
import Billing from './components/billing/billing';
import Reports from './components/report/report';
import Employee from './components/employees/employee';
import Login from './components/login/Login';
import ProfileModal from './components/Profile/ProfileModal';
import Profile from './assets/profile.jpg';
import './App.css';

function Header({ currentPage, onProfileClick }) {
    return (
        <header className="header">
            <div className="header-title">
                <h2>{currentPage}</h2>
            </div>
            <button className="date-btn">
                {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </button>
            <div className="profile-dropdown">
                <img
                    src={Profile}
                    alt="profile"
                    className="profile-img"
                    onClick={onProfileClick}
                />
            </div>
        </header>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState('Dashboard'); // Default page
    const [isModalVisible, setModalVisible] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false); // Log the user out
        setModalVisible(false);   // Close the modal
    };

    const profileData = {
        image: Profile,
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'Administrator',
        onLogout: handleLogout, // Pass the logout function here
    };

    const toggleModal = () => setModalVisible(!isModalVisible);

    return (
        <Router>
            <div className="app-container">
                {isAuthenticated ? (
                    <>
                        <Sidebar setCurrentPage={setCurrentPage} />
                        <div className="main-content">
                            <Header currentPage={currentPage} onProfileClick={toggleModal} />
                            <div className="dashboard-container">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/room" element={<Room />} />
                                    <Route path="/booking" element={<Booking />} />
                                    <Route path="/guest" element={<Guest />} />
                                    <Route path="/facilities" element={<Facilities />} />
                                    <Route path="/billing" element={<Billing />} />
                                    <Route path="/reports" element={<Reports />} />
                                    <Route path="/employee" element={<Employee />} />
                                </Routes>
                            </div>
                        </div>
                        <ProfileModal
                            isVisible={isModalVisible}
                            onClose={toggleModal}
                            profileData={profileData}
                        />
                    </>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </Router>
    );
}

export default App;
