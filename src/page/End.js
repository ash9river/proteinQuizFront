import { useState, useEffect } from "react";
import axios from 'axios';

function End(){
    const [dashboard,setDashBoard] = useState([])
    const [player,setPlayer] = useState({})
    useEffect(() => {
        axios.get('/api/dashboard/player')
        .then(response => {console.log((response.data))
        setDashBoard(response.data.dashBoard)
        setPlayer(response.data.player)
    })
        .catch(error => console.log(error))
    }, []);
    return (
        <div className="container">

        <div></div>
          <h2>Dashboard</h2>
          {dashboard.length > 0 ? (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>NickName</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {dashboard.map((item, index) => (
                    <tr key={index}>
                    <td>{item.nickName}</td>
                    <td>{item.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <p>Loading...</p>
            )}
        </div>
      );
}
export default End;