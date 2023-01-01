import SearchHistory from "../SearchHistory/SearchHistory";
import React, { useState, useEffect } from "react";
import "./WeatherPage.css";

function WeatherPage() {
  const [countrySearchName, setCountrySearchName] = useState("");
  const [citySearchName, setCitySearchName] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [countryNameText, setCountryNameText] = useState("");
  const [cityNameText, setCityNameText] = useState("");
  const [currentWeatherData, setCurrentWeatherData] = useState({});

  const [mainWeather, setMainWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [time, setTime] = useState("");
  const [errorSearchStatus, setSearchErrorStatus] = useState(false);
  const [searchErrorMsg, setSearchErrorMsg] = useState("");
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const getWeather = (cityName, countryName) => {
    let currentSearchHistory = searchHistory;
    let fetchUrl = process.env.REACT_APP_WEATHER_API;
    let apiKey = process.env.REACT_APP_API_KEY;
    let stringData = cityName + "," + countryName;
    let date,
      formattedDate,
      formattedTime,
      responseDataCountryName,
      responseDataCityName;

    setSearchErrorStatus(false);
    fetch(fetchUrl + "?q=" + stringData + "&appid=" + apiKey, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== "404") {
          setCurrentWeatherData(data);
          date = data.dt;
          formattedDate = unixToDate(date, true);
          formattedTime = unixToDate(date, false);
          setTime(formattedDate);
          if (cityName !== "") {
            responseDataCityName = cityName;
          } else {
            responseDataCityName = data.name;
          }

          if (countryName !== "") {
            responseDataCountryName = countryName.toUpperCase();
          } else {
            responseDataCountryName = data.sys.country;
          }
          currentSearchHistory.push({
            city: responseDataCityName,
            country: responseDataCountryName,
            time: formattedTime,
          });
          setCountryNameText(responseDataCountryName);
          setCityNameText(responseDataCityName);
          setSearchHistory(currentSearchHistory);
          setShowSearchHistory(true);
          setMainWeather(data.weather[0].main);
          setDescription(data.weather[0].description);
          setHumidity(data.main.humidity);
          setTemperature(data.main.temp);
        } else {
          setCurrentWeatherData({});
          setSearchErrorStatus(true);
          setSearchErrorMsg(data.message);
        }
      })
      .catch((error) => {
        setSearchErrorMsg("Invalid country and city. Please try again.");
        setCurrentWeatherData({});
        setSearchErrorStatus(true);
      });
  };

  const unixToDate = (unixTimestamp, fullDate) => {
    var date = new Date(unixTimestamp * 1000);
    var formattedDate = date.toLocaleDateString();
    var formattedTime = date.toLocaleTimeString();
    if (fullDate) {
      return formattedDate + " " + formattedTime;
    } else {
      return formattedTime;
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const handleDeleteHistory = (index) => {
    let tempArr = [...searchHistory];
    clearHistory();
    tempArr.splice(index, 1);
    setSearchHistory(tempArr);
  };

  const handleSearchPastHistory = (value) => {
    getWeather(value.city, value.country);
  };

  return (
    <div>
      <div>
        <div className="container">
          <div className="margin-left input-label">
            City:
            <input
              className="input-field"
              type="text"
              onChange={(e) => setCitySearchName(e.target.value)}
            />
          </div>
          <div className="margin-left input-label">
            Country:
            <input
              className="input-field"
              type="text"
              onChange={(e) => setCountrySearchName(e.target.value)}
            />
          </div>
          <div className="margin-left buttonGroupPadding">
            <button
              onClick={() => getWeather(citySearchName, countrySearchName)}
            >
              Search
            </button>
            <button style={{ marginLeft: "0.5rem" }} onClick={clearHistory}>
              Clear
            </button>
          </div>
        </div>

        <div style={{ marginTop: "0.8rem" }}>
          {errorSearchStatus && (
            <div className="errorBox">{searchErrorMsg}</div>
          )}

          {Object.keys(currentWeatherData).length !== 0 && (
            <div className="weatherContainer">
              <div>
                {cityNameText}, {countryNameText}
              </div>
              <div className="weather-text">{mainWeather}</div>
              <div>Description: {description}</div>
              <div>Temperature: {temperature}</div>
              <div>Humidity: {humidity}</div>
              <div>Time: {time}</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <div className="App-header">
          <div className="headerText">Search history</div>
        </div>
        {showSearchHistory !== [] && (
          <SearchHistory
            newSearchHistory={searchHistory}
            searchButtonClick={handleSearchPastHistory}
            deleteButtonClick={handleDeleteHistory}
          />
        )}
      </div>
    </div>
  );
}

export default WeatherPage;
