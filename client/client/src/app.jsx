import React from 'react';
import {useEffect} from 'react';
const App = () =>{
    useEffect(()=>{
        fetch('http://localhost:3000/api/items')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    },[]);
}
export default App;