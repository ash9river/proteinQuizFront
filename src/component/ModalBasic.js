// ModalBasic.js

import React, { useState } from 'react';

const ModalBasic = ({ answer, protein,onClose }) => {
  const [returnValue,setValue] =useState(10);

  const handleButtonClick = () => {
    // 원하는 로직 처리 후 반환값을 전달
    onClose(returnValue);
  };

  return (
    

    <div className='container'>
      {/* 모달 내용 */}
      <h2>당신의 답안 : {answer}</h2>
      <h2>정답 : {protein}</h2>
      <h2>이번 라운드 점수</h2>
      <h1>{returnValue}</h1>
      <button className='btn btn-primary' onClick={handleButtonClick}>닫기</button>
    </div>
  );
};

export default ModalBasic;
