import React from 'react';
import './ProfileModal.css';

function ProfileModal({ isVisible, onClose, profileData }) {
    if (!isVisible) return null;

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="profile-modal-header">
                    <img src={profileData.image} alt="Profile" className="profile-image" />
                </div>
                <div className="profile-modal-body">
                    <h2>{profileData.name}</h2>
                    <p className="role">{profileData.role}</p>
                    <p className="email">{profileData.email}</p>
                    <button className="logout-btn" onClick={profileData.onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;
