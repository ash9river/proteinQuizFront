import React, { useState, useEffect } from 'react';
import {useNavigate} from'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import ModalBasic from '../component/ModalBasic';

function Quiz(){
    const url ='http://localhost:8080';    
    const navigate = useNavigate();

    const [turn,setTurn] = useState(1); //몇번째 턴
    const [answer,setAnswer] = useState(); //몇번째 턴

    const [score,setScore] = useState(0); //점수
    const [quizList,setQuizList]=useState([]);//퀴즈 목록 
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0); //퀴즈 목록 index

    const [modalIsOpen, setModalIsOpen] = useState(false);



    useEffect(() => {
        axios.get('/api/quizs')
        .then(response => {console.log((response.data))
        setQuizList(response.data)
        console.log(quizList)
    })
        .catch(error => console.log(error))
    }, []);

    const handleNextQuiz = () => {
        // 다음 퀴즈로 이동
        setCurrentQuizIndex(prevIndex => prevIndex + 1);
        //마지막 퀴즈 이후
        if(turn==3)
            navigate('/end')
      };

    const handleSubmitAnswer = (e,answer,protein) => {
        e.preventDefault();
        console.log(answer,protein)
        
        //정답 팝업 띄우기 
        setModalIsOpen(true)
      };

      const handleModalClose = (score_get) => {
        // 반환값을 이용하여 원하는 로직 처리
        console.log('반환값:', score_get);
        setScore((prevScore) => prevScore + score_get); //정답 로직 설정하기
        setTurn((prevTurn) => prevTurn + 1);

        setModalIsOpen(false)
        handleNextQuiz();
      };


    return ( 
    <div className="container">
      <div>
        <h3>{turn}/10 턴</h3>
        <h3>현재 점수: {score}</h3>

      </div>

    {quizList.map((quiz, index) => (
        index === currentQuizIndex && (
          <div key={quiz.key}>
            <h2>{quiz.name}</h2>
            <img src={url + quiz.file_path} alt={quiz.name}  style={{ width: '60%', height: '50vh' }}/>
            <p>단백질: {quiz.protein}</p>

            <form onSubmit={(e) => handleSubmitAnswer(e, answer, quiz.protein)}>
              <div className="form-group">
                <label htmlFor="answer">답안 입력</label>
                <input
                  type="text"
                  id="answer"
                  name="answer"
                  className="form-control"
                  placeholder="답안을 입력하세요"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit">
              답안 제출
              </button>
            </form>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <ModalBasic answer={answer} protein={quiz.protein} onClose={handleModalClose} />
          </Modal>

          </div>
        )
      ))}
  </div>)
}
export default Quiz