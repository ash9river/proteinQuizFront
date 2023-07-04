import { useState, useEffect } from "react";
import axios from 'axios';

function End(){
    const [dashboard,setDashBoard] = useState()

    useEffect(() => {
        axios.get('/api/dashboard')
        .then(response => {console.log((response.data))
        setDashBoard(response.data)
        console.log(dashboard)
    })
        .catch(error => console.log(error))
    }, []);
    return(
        <div>Hello</div>
    )
}
export default End;