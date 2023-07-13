import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function End(){
    const [dashboard,setDashBoard] = useState([])
    const [player,setPlayer] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/dashboard/player')
        .then(response => {console.log((response.data))
        setDashBoard(response.data.dashBoard)
        setPlayer(response.data.player)
    })
        .catch(error =>{//에러 발생시 홈으로
            console.log(error.response.data.status);
            if(error.response.data.status==-10)
              navigate('/');
            else
              navigate('/error');
            })
    }, []);

    const handleClick = () => {
        navigate('/');
      };
    return (
        <div className="container">

        {player ? (
        <div>
            <h2>당신의 순위는 {player.rank}입니다.</h2>
                <tr>
                    <th>Rank</th>
                    <th>NickName</th>
                    <th>Score</th>
                </tr>
                <tr>
                    {/* <td>{player.rank}</td> */}
                    <td>{player.nickName}</td>
                    <td>{player.score}</td>
                </tr>

        </div>
        ) : null}


          <h2>Dashboard</h2>
          {dashboard.length > 0 ? (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>NickName</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {dashboard.map((item, index) => (
                    <tr key={index}>
                    <td>{index}</td>
                    <td>{item.nickName}</td>
                    <td>{item.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <p>Loading...</p>
            )}

    <button className="btn btn-primary" onClick={handleClick}>
      홈으로
    </button>
        </div>
      );
}
export default End;