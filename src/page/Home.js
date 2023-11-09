import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const url=process.env.React_APP_API_URL;
    
    const [nickName,setNickName]=useState('');
    const [message,setMessage]=useState('');
    const [randomNickName, setRandomNickName]=useState('');

    const navigate=useNavigate();

    //message가 ok면 백엔드세션 로딩 대기(필수적)
    // 아니면 랜덤 닉네임 생성
    useEffect(()=>{
        if(message==="ok"){
            const timer=setInterval(() => {

        //타이머가 실행되는 동안 사용자의 대기 경험 향상시킬 무언가 넣기
                navigate('/quiz');
            },500);
        }
        else{
            const adjectives = ['Happy', 'Silly', 'Funny', 'Crazy', 'Lovely', 'Gentle', 'Brave', 'Cheerful', 'Sunny', 'Playful', 'Charming', 'Fierce', 'Adventurous', 'Clever', 'Delightful', 'Jolly', 'Kind', 'Lively', 'Majestic', 'Noble', 'Optimistic', 'Pleasant', 'Quick-witted', 'Radiant', 'Spirited', 'Talented', 'Vibrant', 'Witty', 'Youthful'];
            const nouns = ['Panda', 'Tiger', 'Kangaroo', 'Dolphin', 'Butterfly', 'Elephant', 'Zebra', 'Koala', 'Giraffe', 'Lion', 'Peacock', 'Penguin', 'Owl', 'Squirrel', 'Jaguar', 'Raccoon', 'Koala', 'PolarBear', 'Turtle', 'Penguin', 'Seahorse', 'Gorilla', 'Puffin', 'Hedgehog', 'Jellyfish', 'Chameleon', 'Koala', 'RedPanda', 'Toucan'];
        
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
          
            const generatedNickname = randomAdjective +'-'+randomNoun + String(Math.ceil(10000*Math.random()));
            
            setRandomNickName(generatedNickname);
        }
    },[message])
    
    const handleSubmit=async(e)=>{
        //이벤트 상위로 번지는거 방지
        e.preventDefault();

        await fetch(url+'/api/test/players',{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickName:randomNickName
            }),
        })
            .then(res=>res.json())
            .then(data=>{
                setMessage(data.message);
            })
            .catch(err=>{
                navigate('/error');
            });
            console.log('Wait '+1000+'ms');
    }

    return (
        <>
        
        </>
    )
}

export default Home