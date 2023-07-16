import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function End(){
    const url =process.env.REACT_APP_API_URL
    const [dashboard,setDashBoard] = useState([])
    const [player,setPlayer] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/dashboard/player',
        { withCredentials: true })
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
            <h2>당신의 순위는 {player.rank}위입니다.</h2>
            <table className="table table-striped">
                <thead>
                  <tr>
                      <th>Rank</th>
                      <th>NickName</th>
                      <th>Score</th>
                  </tr>
                </thead>
                <tbody> 
                  <tr key={0}>
                      <td>{player.rank}</td>
                      <td>{player.nickName}</td>
                      <td>{player.score}</td>
                  </tr>
                </tbody>
            </table>
        </div>
        ) : null}
        <img src="/images/running.gif" alt="grade" className="img-fluid"
              style={{ width: '30%', height: '30vh' }} ></img>

          <h2>Top10</h2>
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
                    <td>{index+1}</td>
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