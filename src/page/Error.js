import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error(){
const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
return(
<div className="container">
    <img src="/images/error404.jpg" alt="404Error" className="img-fluid"></img>
    <div>
    <button className="btn btn-primary" onClick={handleClick}>
      퀴즈 풀러가기
    </button>
    </div>
</div>
)}
export default Error;