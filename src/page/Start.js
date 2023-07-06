import React, { useState } from 'react';
import {useNavigate} from'react-router-dom';

function Start(){

    const [nickName, setnickName] = useState('');
    const url ='';

    const navigate = useNavigate();

    function sleep(ms) {
      const wakeUpTime = Date.now() + ms;
      while (Date.now() < wakeUpTime) {}
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // 이메일 값을 서버로 전송
        fetch('/api/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body:  nickName ,
        })
          .then(response => response) //json으로 할 수 있도록 메세지 처리 고려
          .then(data => {
            // POST 요청이 성공한 경우의 처리
            console.log('서버 응답:', data);
          })
          .catch(error => {
            // POST 요청이 실패한 경우의 처리
            console.error('에러:', error);
          });

        setnickName(''); // 폼 초기화
        console.log("Wait");

        //세션이 완성되는 동안의 로딩
        //기다리는 대기 모달을 만들 것
        sleep(1000);
        navigate('/quiz');
      };
    
    
    return (
        <div className="container">
        <div className="py-5 text-center">
          <h2>프로틴 퀴즈</h2>
        </div>
        <h4 className="mb-3">닉네임 입력</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nickName">닉네임</label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              className="form-control"
              placeholder="닉네임을 입력하세요"
              value={nickName}
              onChange={(e) => setnickName(e.target.value)}
              required
            />
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col">
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                시작하기
              </button>
            </div>
          </div>
        </form>


      </div>
    );
}
export default Start;