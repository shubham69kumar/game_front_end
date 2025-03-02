import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GameScreen = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [emojiCount, setEmojiCount] = useState(0);  // Track the number of sad emojis to show
  const navigate = useNavigate(); // React Router for navigation

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      setShowResult(false);
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/game/question`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestionData(response.data[0]);
      setShuffledOptions(shuffleArray(response.data[0].options)); // Shuffle options on load
      setLoading(false);
    } catch (error) {
      console.error("Error fetching question data:", error);
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  const handleAnswer = async (answer) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/game/result/${questionData._id}?answer=${answer}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsCorrect(response?.data?.correct);
      if (!response?.data?.correct) {
        setEmojiCount(5); // Set number of sad emojis to show if answer is incorrect
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setShowResult(true);
    }
  };

  const handlePlayAgain = () => {
    setIsCorrect(false);
    setShowResult(false);
    setEmojiCount(0); // Reset emoji count
    fetchQuestion();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <GameContainer>
      {isCorrect && <Confetti />}
      {/* Show multiple sad emojis if the answer is incorrect */}
      <Heading>Guess the Destination! 🌍</Heading>
      {questionData && (
        <div>
          <Clue>
            {questionData.clues[Math.floor(Math.random() * questionData.clues.length)]}
          </Clue>
          <Options>
            {shuffledOptions.map((option, index) => (
              <OptionButton key={index} onClick={() => handleAnswer(option)}>
                {option}
              </OptionButton>
            ))}
          </Options>
          {showResult && (
            <Result>
              {isCorrect ? (
                <Correct>🎉 Correct! {questionData.fun_fact[0]}</Correct>
              ) : (
                <Incorrect>😢 Incorrect! {questionData.trivia[0]}</Incorrect>
              )}
              <PlayAgainButton onClick={handlePlayAgain}>Play Again</PlayAgainButton>
            </Result>
          )}
        </div>
      )}
    </GameContainer>
  );
};

// Styled-components for the game page
const GameContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Clue = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 20px;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const OptionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Result = styled.div`
  margin-top: 20px;
`;

const Correct = styled.h2`
  color: #28a745;
`;

const Incorrect = styled.h2`
  color: #dc3545;
`;

const PlayAgainButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const SadEmojiDrop = styled(motion.div)`
  font-size: 3rem;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

export default GameScreen;
