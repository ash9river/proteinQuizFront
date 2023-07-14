import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error(){
const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
return(
<div className="container">
    <h1>죄송해요! 운영자가 운동을 하러 갔어요!</h1>
    <img src="/images/error.jpg" alt="404Error" className="img-fluid"
    style={{ width: '50%', height: '50vh' }} ></img>
    
    <div>
    <p>
      <a href="https://www.freepik.com/free-vector/workout-concept-illustration_7069793.htm#query=excercise&position=2&from_view=search&track=sph">
        Image by storyset </a>on Freepik
        <p>신속히 오류를 잡도록 하겠습니다!</p>
    </p>
  
    <button className="btn btn-primary" onClick={handleClick}>
      홈으로
    </button>
    </div>
</div>
)}
export default Error;