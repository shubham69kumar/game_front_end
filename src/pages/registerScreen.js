import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = ({ code, setUserId, setToken }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null); // New state for avatar
  const navigate = useNavigate();

  const validateName = (name) => {
    const regex = /^[a-zA-Z0-9_]{4,}$/;
    return regex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName(name)) {
      setError('4 characters with letters, numbers, and underscores allowed!!');
      return;
    }
    const endpoint = isLogin ? `${process.env.REACT_APP_API_BASE_URL}/user/login` : `${process.env.REACT_APP_API_BASE_URL}/user/create`;

    try {
      const response = await axios.post(endpoint, {
        userName: name,
        avatar: selectedAvatar, // Send avatar to the backend
      });

      if (response.status === 200 && isLogin) {
        const { _id, sessionId } = response.data;
        // Save to localStorage
        localStorage.setItem('userId', _id);
        localStorage.setItem('token', sessionId);
        // Update state in the parent component (App)
        setUserId(_id);
        setToken(sessionId);
        setError(isLogin ? 'Login successful!' : 'Registration successful!');
        navigate('/play');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again');
    }
  };

  // Avatar options for the user to choose from
  const avatars = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg"
  ];

  return (
    <RegisterContainer>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <AppLogo src={selectedAvatar || "/1.jpg"} alt="User Avatar" />
      {!isLogin && (
        <AvatarSelection>
          {avatars.map((avatar, index) => (
            <AvatarImage
              key={index}
              src={avatar}
              alt={`Avatar ${index}`}
              onClick={() => setSelectedAvatar(avatar)}
              isSelected={selectedAvatar === avatar}
            />
          ))}
        </AvatarSelection>
      )}
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}
        <SubmitButton type="submit">{isLogin ? 'Login' : 'Register'}</SubmitButton>
      </form>
      <ToggleButton onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need to register? Click here' : 'Already have an account? Login here'}
      </ToggleButton>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  width: 500px;
  height: 480px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AppLogo = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const AvatarSelection = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: ${({ isSelected }) => (isSelected ? '2px solid #007bff' : 'none')};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const InputField = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 90%;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    outline: none;
  }

  &:hover {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: rgb(235, 99, 113);
  font-size: 14px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ToggleButton = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
`;

export default RegisterScreen;
