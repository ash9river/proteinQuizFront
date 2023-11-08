import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const url=process.env.React_APP_API_URL;
    
    const [nickName,setNickName]=useState('');
    const [message,setMessage]=useState('');
    const [randomNickName, setRandomNickName]=useState('');

    const navigate=useNavigate();

    useEffect(()=>{
        if(message==="ok"){
            const timer=setInterval(() => {
                navigate('/quiz');
            },1000);
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