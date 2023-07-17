import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalBasic = ({ user_answer, outcome, onClose }) => {
  const [score, setScore] = useState(null);
  const [answer, setAnswer] = useState(null);
  const navigate = useNavigate();
  const url =process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (outcome && score === null) {
      axios
        .post(url + '/api/outcome', outcome, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response.data);
          setAnswer(response.data.answer);
          setScore(response.data.score);
        })
        .catch(error => {
          console.log(error.response.data.status);
          if (error.response.data.status === -10) {
            navigate('/');
          }
        });
    }
  }, [outcome, score]);

  const handleButtonClick = () => {
    onClose(score);
  };

  // Memoize the JSX elements to avoid unnecessary re-renders
  const modalContent = useMemo(() => {
    return (
      <div className="container">
        {/* 모달 내용 */}
        <h2>당신의 답안: {user_answer?user_answer:0}</h2>
        <h2>정답: {answer}</h2>
        <h2>이번 라운드 점수</h2>
        <h1>{score}</h1>
        <button className="btn btn-primary" onClick={handleButtonClick}>
          닫기
        </button>
      </div>
    );
  }, [user_answer, answer, score, handleButtonClick]);

  return modalContent;
};

export default ModalBasic;
