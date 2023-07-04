import React, {useEffect, useState} from 'react';
import axios from 'axios';
function ApiCheck(){
    const [hello, setHello] = useState([])
    const url =""
    useEffect(() => {
        axios.get(url+'/api/quizs')
        .then(response => {console.log((response.data))
        setHello(response.data)
    })
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
    {hello.map((item) => (
      <p key={item.id}>{item.name}</p>
    ))}
        </div>

    );
}
export default ApiCheck