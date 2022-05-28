import React, { useState, useEffect, Component } from "react";
import { useParams } from "react-router";
import './App.css';
import './App.scss';
import Axios from 'axios';
import RecentlyBoughtList from './components/RecentlyBoughtList';
import RecommendedList from './components/RecommendedList';

function App() {

  // const { face } = useParams();

  const name = window.location.pathname.split("/").pop();

  const endpoint = window.location.pathname.split("/");

  // console.log(endpoint[1]);

  const [vehicleslist, setVehiclesList] = useState([]);

  const [recentlyBoughtList, setRecentlyBoughtList] = useState([]);

  const [recommendedList, setRecommendedList] = useState([]);

  useEffect(()=> {

    Axios.get('http://localhost:3000/').then((response) => {
      
      console.log(response.data);
      
      setVehiclesList(response.data);


    });


    Axios.get(`http://localhost:8080/recommendedVehicles/${name}`).then((response) => {
      
      console.log(response.data);
      
      setRecommendedList(response.data);


    });

    Axios.get(`http://localhost:8080/recentlyBoughtVehicles/${name}`).then((response) => {
      
      console.log(response.data);
      
      setRecentlyBoughtList(response.data);


    });
  }, [])

  const path = endpoint[1];

  return (

    <div className="App">
        { path == 'recommendedVehicles' ? (
          <RecommendedList recommendedList={recommendedList} name={name} />
        ) : (
          <RecentlyBoughtList recentlyBoughtList={recentlyBoughtList} name={name}/>
        ) }
    </div>
  );
}

export default App;
