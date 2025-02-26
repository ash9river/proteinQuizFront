import React, { useEffect,useState } from 'react';
import {useNavigate} from'react-router-dom';

const Start=()=>{

    const [nickName, setnickName] = useState('');
    const url =process.env.REACT_APP_API_URL;
    const [message,setMessage] = useState();
    const navigate = useNavigate();
    const [randomNickname, setRandomNickname] = useState('');

    useEffect(() => {
      const adjectives = ['Happy', 'Silly', 'Funny', 'Crazy', 'Lovely', 'Gentle', 'Brave', 'Cheerful', 'Sunny', 'Playful', 'Charming', 'Fierce', 'Adventurous', 'Clever', 'Delightful', 'Jolly', 'Kind', 'Lively', 'Majestic', 'Noble', 'Optimistic', 'Pleasant', 'Quick-witted', 'Radiant', 'Spirited', 'Talented', 'Vibrant', 'Witty', 'Youthful'];
      const nouns = ['Panda', 'Tiger', 'Kangaroo', 'Dolphin', 'Butterfly', 'Elephant', 'Zebra', 'Koala', 'Giraffe', 'Lion', 'Peacock', 'Penguin', 'Owl', 'Squirrel', 'Jaguar', 'Raccoon', 'Koala', 'PolarBear', 'Turtle', 'Penguin', 'Seahorse', 'Gorilla', 'Puffin', 'Hedgehog', 'Jellyfish', 'Chameleon', 'Koala', 'RedPanda', 'Toucan'];
  
      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
      const generatedNickname = randomAdjective +'-'+randomNoun + String(Math.ceil(10000*Math.random()));
      
      setRandomNickname(generatedNickname);
      },[message])
    
    function sleep(ms) {
      const wakeUpTime = Date.now() + ms;
      while (Date.now() < wakeUpTime) {}
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 이메일 값을 서버로 전송

        await fetch(url+'/api/test/players', {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body:  JSON.stringify({nickName: randomNickname}),
        })
          .then(response => response.json()) //json으로 할 수 있도록 메세지 처리 고려
          .then(data => {
            // POST 요청이 성공한 경우의 처리
            setMessage(data.message);
          }).then( 

          ).catch(error => {
            // POST 요청이 실패한 경우의 처리
            navigate('/error');
          });


        console.log("Wait");


        }

    
          

    //백엔드 세션이 완성되는 동안의 로딩
    //기다리는 대기 모달을 만들 것    
    useEffect(()=>{        
        if(message =="ok"){
        sleep(500);
        navigate('/quiz');
      }
    }, [message]) 
    
    return (
        <div className="container">
        <div className="py-5 text-center">
          <h2>프로틴 퀴즈</h2>
          {Math.ceil(10000*Math.random())%2==0?
          (<img src="/images/potato.gif" alt="Loading" className="img-fluid"
              style={{ width: '30%', height: '30vh' }} ></img>):
          (<img src="/images/workout.gif" alt="Loading" className="img-fluid"
              style={{ width: '30%', height: '30vh' }} ></img>)              
          }
        </div>
        <h4 className="mb-3">닉네임</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nickName"></label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              className="form-control"
              placeholder="닉네임을 입력하세요"
              value={randomNickname}
              onChange={(e) => setnickName(e.target.value)}
              autoComplete="off"
              required
              disabled
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
        {message? (<div className="alert-danger" role="alert">{message}</div>): null}
        <a href='https://www.data.go.kr/data/15100070/standard.do'><p>데이터 출처</p></a>
      </div>
    );
}
export default Start;