import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import GameScreen from '../components/GameScreen';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';

const Game = ({ setUserId, setToken }) => {
  const navigate = useNavigate();
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showGlobal, setShowGlobal] = useState(true); 
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false); // New state for invite modal
  const [inviteLink, setInviteLink] = useState("");

  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout confirmation modal

  const userName = localStorage.getItem("userName") || "Guest"; // Get user name from localStorage
  const token = localStorage.getItem("token"); // Check if user is logged in
  const avatarUrl = "/avatar.png"; // Replace with dynamic avatar URL if available

  // Mock leaderboard data (replace with API fetch)
  const globalData = [
    { name: 'John Doe', score: 100 },
    { name: 'Jane Smith', score: 90 },
    { name: 'Max Payne', score: 80 }
  ];
  
  const friendsData = [
    { name: 'You', score: 50 },
    { name: 'Friend 1', score: 40 },
    { name: 'Friend 2', score: 30 }
  ];

  const handleLeaderboard = () => {
    if (!token) {
      navigate("/register");
    } else {
      setShowLeaderboardModal(true); // Show leaderboard if logged in
    }
  };

  const handleLogout = () => setShowLogoutModal(true); // Show logout confirmation modal

  const confirmLogout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("userName"); // Clear username
    navigate("/login"); // Redirect to login
    setShowLogoutModal(false); // Close logout modal
  };

  const cancelLogout = () => setShowLogoutModal(false); // Close logout modal without logging out

    // Generate an invite link
    const generateInviteLink = () => {
      const randomCode = Math.random().toString(36).substr(2, 8);
      return `${window.location.origin}/register?ref=${randomCode}`;
    };

  const handleWhatsAppShare = () => {
    if (!token) {
      navigate("/register");
    } else {
      setInviteLink(generateInviteLink());
      setShowInviteModal(true); // Show the invite modal
    }
  };

  const confirmWhatsAppShare = () => {
    const shareText = `Join ${userName} in this fun game! 🎮 Click here to register: ${inviteLink}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

    window.open(whatsappURL, "_blank");
    setShowInviteModal(false); // Close the modal after sharing
  };


  useEffect(() => {
    setLeaderboardData(showGlobal ? globalData : friendsData);
  }, [showGlobal]);

  return (
    <div>
      <div className="extra-buttons">
        <Button onClick={handleLeaderboard}>🏆 Leaderboard</Button>
        { <Button onClick={handleWhatsAppShare}>📲 Share on WhatsApp</Button>}
        {token && <Button onClick={handleLogout}>🚪 Logout</Button>}
      </div>

      <GameScreen />

      {showLeaderboardModal && token && (
        <ModalOverlay>
          <ModalContent>
            <h2>Leaderboard</h2>
            <ToggleButtons>
              <ToggleButton onClick={() => setShowGlobal(true)} active={showGlobal}>Global</ToggleButton>
              <ToggleButton onClick={() => setShowGlobal(false)} active={!showGlobal}>Friends</ToggleButton>
            </ToggleButtons>

            <DataTable
              columns={[
                { name: 'Name', selector: row => row.name, sortable: true },
                { name: 'Score', selector: row => row.score, sortable: true }
              ]}
              data={leaderboardData}
              pagination
            />

            <CloseButton onClick={() => setShowLeaderboardModal(false)}>❌ Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}

       {/* WhatsApp Invite Modal */}
       {showInviteModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Invite Friends</h2>
            <p>Share this link with your friends to join:</p>
            <InviteLink>{inviteLink}</InviteLink>
            <Button onClick={confirmWhatsAppShare}>Share on WhatsApp</Button>
            <CloseButton onClick={() => setShowInviteModal(false)}>❌ Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}


      {/* Logout Modal */}
      {showLogoutModal  &&(
        <ModalOverlay>
          <ModalContent>
            <h2>Confirm Logout</h2>
            <div>
              <Avatar src={avatarUrl} alt="Avatar" />
              <UserName>{userName}</UserName>
            </div>
            <p>Are you sure you want to log out?</p>
            <Button onClick={confirmLogout}>Yes, Log Out</Button>
            <Button onClick={cancelLogout}>Cancel</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

// Styled Components
const Button = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
`;

const ToggleButtons = styled.div`
  margin: 10px 0;
`;

const ToggleButton = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: ${({ active }) => (active ? '#28a745' : '#ccc')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#218838' : '#bbb')};
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background: none;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserName = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const InviteLink = styled.p`
  background: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  word-break: break-word;
  font-size: 14px;
  color: #333;
  text-align: center;
`;


export default Game;
