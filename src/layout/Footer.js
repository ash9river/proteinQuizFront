import React from "react";
import "../scss/Footer.scss"

const Footer=()=>{
    const sourceUrl="https://www.data.go.kr/data/15100070/standard.do";

    const onClick=()=>{
        window.open(sourceUrl,'_blank');
    }
    
    return (
        <>
            <div className="footer">
                <button onClick={onClick}>데이터 출처</button>
            </div> 
        </>
    )
}

export default Footer