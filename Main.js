import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import LightModeIcon from '@mui/icons-material/LightMode';
import "./card.css";

export const Main = () => {
    const [w,setW] = useState({});
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async() => {
        try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=bf4ac675d906ccf9e34071c722121079`
          )
          const resJson = await response.json()
          console.log(resJson);
          setCity(resJson.main);
          setW(resJson.weather[0])
        }
        catch(error){
            console.log(error);
        }
    }
    fetchData();
  }, [search]);
 
  return (
    <div>
      <Typography variant="h2" color={"white"} align="center" sx={{paddingTop:'75px'}} gutterBottom>
        MAUSAM APP
      </Typography>
      <div className="card">
        <div className="innerCard">
          <input
            className="search"
            placeholder="Enter City Name"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            align="center"
          />
        </div>
      </div>
      { !city ? ( <div className="errorVal"><h3>Data Not Found!</h3></div> ) : (<div>
        <div className="display">
        <div className="displayCard">
            <div className="temp">
          <h1>
            {city.temp}°C
            {" "}
            {w.main === 'Clouds' ? <CloudIcon/>:<LightModeIcon/>}
          </h1>
          </div>
          <div className="city">
          <h3>
          {search}
          </h3>
          </div>
          <div className="container1">
          <h3>
            Max Temperature: {city.temp_max}°C
          </h3>
          <h3>
            Min Temperature: {city.temp_min}°C
          </h3>
          </div>
            <div className="container2">
          <h3>
            Humidity: {city.humidity}
          </h3>
          <h3>
            Weather Type: {w.main}
          </h3>
          </div>
        </div>
      </div></div>)}
      
    </div>
  );
};
