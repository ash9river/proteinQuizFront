import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import ModalBasic from '../component/ModalBasic';
import Error from './Error';
function Quiz() {
  // const url = 'http://localhost:8080';
  const navigate = useNavigate();

  const [turn, setTurn] = useState(1); //몇번째 턴
  const [answer, setAnswer] = useState('');

  const [score, setScore] = useState(0); //점수
  const [player, setPlayer] = useState();

  const [quiz, setQuiz] = useState();
  const [quizList, setQuizList] = useState([]); //퀴즈 목록
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [outcome, setOutcome] = useState();

  //퀴즈 받아오기
  useEffect(() => {
    console.log('Get Quiz');

    axios
      .get('/api/quizs')
      .then(response => {
        setQuiz(response.data.quiz);
        setPlayer(response.data.player);
      })
      .catch(error => {//에러 발생시 홈으로
        console.log(error.response.data.status);
        if(error.response.data.status==-10)
          navigate('/');
        else
          navigate('/error');
          //error url은 없지만 없으면 error 컴포넌트로 보냄
        }
        

      );
  }, []);

  //몇번째 턴인지와 점수
  useEffect(() => {
    if (player) {
      console.log('After Getting quiz');
      setTurn(player.turn);
      setScore(player.score);
      setQuizList(player.foodList);
    }
  }, [player]);

  const handleSubmitAnswer = e => {
    e.preventDefault();

    console.log(answer);

    // 전송할 폼 작성
    const outcomeData = {
      answer: Number(answer), // 유저 답안
      quizId: quiz.key // 푼 문제
    };

    setOutcome(outcomeData);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    //답안 입력 초기화
    setAnswer('');
    handleNextQuiz();
  };
  
  const handleNextQuiz = () => {
    console.log('Next Quiz');
    //마지막 퀴즈이면
    if (turn === 10) {
      navigate('/end');
    } else {
      setAnswer('');
      setOutcome(null);
      setModalIsOpen(false);
      axios
        .get('/api/quizs')
        .then(response => {
          setQuiz(response.data.quiz);
          setPlayer(response.data.player);
        })
        .catch(error => {
          if(error.response.data.status==-10)
            navigate('/');
          else
            navigate('/error');
        });
    }
  };
  

  return (
    <div className="container">
      {player ? (
        <div>
          <h3>{turn}/10 턴</h3>
          <h3>현재 점수: {score}</h3>
        </div>
      ) : null}

      {quiz ? (
        <div key={quiz.key}>
          <h2>{quiz.name}</h2>
          <img src={quiz.file_path} alt={quiz.name} style={{ width: '60%', height: '50vh' }} />
          <hr/>
          <form onSubmit={handleSubmitAnswer}>
            <div className="form-group">
              <h4 htmlFor="answer">단백질이 몇 그램일까요?</h4>
              <input
                type="text"
                id="answer"
                name="answer"
                className="form-control"
                placeholder="답안을 입력하세요"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                // required
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={modalIsOpen}>
              답안 제출
            </button>
          </form>
          <Modal appElement={document.getElementById('root')} isOpen={modalIsOpen}>
            <ModalBasic user_answer={answer} outcome={outcome} modalIsOpen={modalIsOpen} onClose={handleModalClose} />
          </Modal>
        </div>
      ) : (
        <div>Wait</div>
      )}
    </div>
  );
}

export default Quiz;
