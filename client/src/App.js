import React, { useState, useEffect, Component } from "react";
import { useParams } from "react-router";
import './App.css';
import './App.scss';
import Axios from 'axios';
import RecentlyBoughtList from './components/RecentlyBoughtList';
import RecommendedList from './components/RecommendedList';

function App() {

  function importAll(r) {
    let images = {};
     r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
   }
  
  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
  
  const name = window.location.pathname.split("/").pop();

  const endpoint = window.location.pathname.split("/");


  const [vehicleslist, setVehiclesList] = useState([]);

  const [recentlyBoughtList, setRecentlyBoughtList] = useState([]);

  const [recommendedList, setRecommendedList] = useState([]);

  const [imagesList, setImagesList] = useState([]);

  useEffect(()=> {

    Axios.get('http://localhost:3000/').then((response) => {
      
      console.log(response.data);
      
      setVehiclesList(response.data);


    });


    Axios.get(`http://localhost:8080/recommendedVehicles/${name}`).then((response) => {
      
      console.log(response.data);
      
      setRecommendedList(response.data);

      setImagesList(images);
    });

    Axios.get(`http://localhost:8080/recentlyBoughtVehicles/${name}`).then((response) => {
      
      console.log(response.data);
      
      setRecentlyBoughtList(response.data);

      setImagesList(images);


    });
  }, [])

  const path = endpoint[1];

  return (

    <div className="App">
        { path == 'recommendedVehicles' ? (
          <RecommendedList recommendedList={recommendedList} name={name} imagesList={imagesList} />
        ) : (
          <RecentlyBoughtList recentlyBoughtList={recentlyBoughtList} name={name} imagesList={imagesList}/>
        ) }
    </div>
  );
}

export default App;
