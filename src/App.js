import React, { useState, useEffect } from 'react';
import './App.css';
import sun_and_cloud from './icons/Sun_And_Cloud_Icon.svg'

function App() {

  const [today, setDate] = useState(new Date());
  const [time, setTime] = useState(() => "05:30");
  const [date, set_date] = useState(() => "*17 August 2022");
  const [wish, setWish] = useState(() => "");

  const [temp, setTemp] = useState(() => { return null })
  const [tempF, setTempF] = useState(() => { return "" })
  const [country, setCountry] = useState(() => { return "Country" })
  const [feelsLike, setFeelsLike] = useState(() => { return "Feels like : Sleepy" })
  const [city, setCity] = useState(() => { return "City" })
  const [humidity, setHumidity] = useState(() => { return "Humidity : 00%" })
  const [windKmPh, setWindKmPh] = useState(() => { return "Wind : Speed" })
  const [conditionText, setConditionText] = useState(() => { return "Weather" })
  const [wIcon, set_W_Icon] = useState(() => { return sun_and_cloud })
  const [tempBG, set_TempBG] = useState(() => { return "#ffffff1c" })

  const [userSearchedCity, setUserCity] = useState(() => { return "" })
  const [user_conditionText, set_conditionsText] = useState(() => { return "" })
  const [userSIcon, set_userSIcon] = useState(() => { return sun_and_cloud })
  const [userSearchedTemp, setUserSearchedTemp] = useState(() => { return "" })

  useEffect(() => {
    let tempDiv = document.getElementById("tempDiv")
    tempDiv.style.background = tempBG
    const updateWeather = async () => {
      // ____getting current user location___
      let geoLication = 'https://geolocation-db.com/json/'
      let locationData = await fetch(geoLication)
      let parsedLocation = await locationData.json()
      let currentUserLocation = parsedLocation.IPv4
      let weatherApi = `https://api.weatherapi.com/v1/current.json?key=c8ec5c78e09448f6bce75309220907&q=${currentUserLocation}&aqi=no`
      let data = await fetch(weatherApi)
      let parsedData = await data.json()

      set_W_Icon(parsedData.current.condition.icon)
      setTemp(`${parsedData.current.temp_c}°C`)
      setTempF(`${parsedData.current.temp_f}°F`)
      setCountry(parsedData.location.country)
      setCity(parsedLocation.city)
      setFeelsLike(`Feels like : ${parsedData.current.feelslike_c}°C`)
      setHumidity(`Humidity : ${parsedData.current.humidity}%`)
      setWindKmPh(`Wind : ${parsedData.current.wind_kph} Km/ph`)
      setConditionText(`${parsedData.current.condition.text}`)


      if (parsedData.current.temp_c >= 30) {
        set_TempBG("linear-gradient(95.64deg, #E8D884 12.5%, #FD9676 95.72%)")
      }
      if (parsedData.current.temp_c <= 29) {
        set_TempBG("linear-gradient(95.64deg, #8BD96F 12.5%, #5BD8FF 95.72%)")
      }
      if (parsedData.current.temp_c <= 17) {
        set_TempBG(" linear-gradient(95.64deg, #69ADED 12.5%, #37C6CF 58.42%, #5F6FFF 95.72%)")
      }
    }
    updateWeather()

    const timer = setInterval(() => {
      setDate(new Date());
    }, 50000);

    const dateTime = () => {
      const locale = 'en';
      const day = today.toLocaleDateString(locale, { weekday: 'long' });
      const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;
      const hour = today.getHours();
      const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'} `;
      setWish(wish)
      const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
      setTime(time)
      set_date(date)
    };
    dateTime()
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, [today, temp])

  // ________Setting temperature in farenheit when hover in temperature___
  let temp_ = document.getElementById("temp");
  if (temp_ != null) {
    temp_.addEventListener('mouseover', function () {
      temp_.innerText = tempF
    })
    temp_.addEventListener("mouseleave", function () {
      temp_.innerText = temp
    })
  }

  // ___SearchFunc_______________________
  const searchFunc = () => {
    let userInput = document.getElementById('userSearchInput').value
    let bottomDiv = document.getElementById('bottomDiv')
    let userSearchBox = document.getElementById('userSearch')

    const showSearchDiv = () => {
      bottomDiv.style.borderRadius = "0px"
      userSearchBox.style.display = "flex"
    }

    if ((userInput.trim()).toLowerCase() === "hangno" || (userInput.trim()).toLowerCase() === "hangno city") {
      const updateInfo = () => {
        set_conditionsText(`Human friendly`)
        set_userSIcon(sun_and_cloud)
        setUserSearchedTemp(`NH`)
        setUserCity(`HangNo City : India`)
      }
      updateInfo()
      showSearchDiv()
    }
    else if ((userInput.trim()).toLowerCase() === "code" || (userInput.trim()).toLowerCase() === "github") {
      document.getElementById("infoCode").style.display = "block"
    }
    else if (userInput !== "") {
      const updateInfo = async () => {
        let weatherApi = `https://api.weatherapi.com/v1/current.json?key=c8ec5c78e09448f6bce75309220907&q=${userInput}&aqi=no`
        let data = await fetch(weatherApi)
        let parsedData = await data.json()
        set_conditionsText(`${parsedData.current === undefined ? "Error" : parsedData.current.condition.text}`)
        set_userSIcon(`${parsedData.current === undefined ? sun_and_cloud : parsedData.current.condition.icon}`)
        setUserSearchedTemp(`${parsedData.current === undefined ? "Oops" : parsedData.current.temp_c + "°C"}`)

        let country = parsedData.location === undefined ? "" : parsedData.location.country
        let trimedUserValue = userInput.trim()
        setUserCity(`${trimedUserValue.charAt(0).toUpperCase() + trimedUserValue.slice(1)} : ${country}`)
      }
      updateInfo()
      showSearchDiv()
    }
  }
  // _____________End of searchFunc______________

  return (
    <>
      <p className='invisibleTrue'>Made by Imtiyaz,</p>
      <p className="invisibleTrue">In August 2022 </p>

      <div className="container">

        <div className='gap bgGlassy' id='infoCode'>
          <span className='iconAndTextSpan'><div className="icon"><div className="githubIcon iconItSelf"></div></div>
            <p><a target={"_blank"} href="https://github.com/" className='hrefLink'>Click here to get the code</a></p>
          </span>
        </div>

        <div className="topGridBox">
          {/* _____.topLeftDiv______________________ */}
          <div className="topLeftDiv bgGlassy gap">
            <span className='iconAndTextSpan'>
              <div className="icon">
                <div className="locationIcon iconItSelf"></div>
              </div>
              <p>{city} : {country}</p>
            </span>
            <div className="weatherIcon_and_text_container">
              <div className="largeText conditionText mt">{conditionText}</div>
              <img className="weatherIcon" src={wIcon} />
            </div>
            <span className='iconAndTextSpan mt'><div className="icon"><div className="feelsLikeIcon iconItSelf"></div></div>
              <p>{feelsLike}</p>
            </span>
            <span className='iconAndTextSpan mt'><div className="icon"><div className="humidityIcon iconItSelf"></div></div>
              <p>{humidity}</p>
            </span>
            <span className='iconAndTextSpan mt'><div className="icon"><div className="windIcon iconItSelf"></div></div>
              <p>{windKmPh}</p>
            </span>
          </div>
          {/* _____end of .topLeftDiv______________________ */}

          {/* _________.topRightGridBox________________________ */}
          <div className="topRightGridBox">
            <div id='tempDiv' className="temp gap bgGlassy">
              <p>Temperature</p>
              <div className="weatherIcon_and_text_container">
                <div id='temp' className="largeText conditionText mt">{temp != null ? temp : "00°C"}</div>
                <div className="tempIcon"></div>
              </div>
            </div>
            {/* ___________________________________ */}
            <div className="dateContainer gap bgGlassy">
              <div className="largeText">{time}</div>
              <p>{date}</p>
            </div>
          </div>
          {/* _________end of .topRightGridBox___________________ */}
        </div>

        <div id='bottomDiv' className="bottomDiv gap bgGlassy">
          {!temp &&
            <div className="iconAndTextSpan">
              <div className="loadingIcon"></div>
              <p>Loading</p>
            </div>}
          {temp &&
            <div className='greeting'>
              <p>Hello there! {wish}</p>
            </div>}
          <div className="searchBoxContainer">
            <input id='userSearchInput' type="text" placeholder='Search for another city' />
            <div className="searchIcon" onClick={searchFunc}></div>
          </div>
        </div>

        {/* ______________________After user search__________________ */}
        <div id='userSearch' className="userSearched_City_Container mt gap bgGlassy">
          <div>
            <span className='iconAndTextSpan'>
              <div className="icon">
                <div className="locationIcon iconItSelf"></div>
              </div>
              <p>{userSearchedCity}</p>
            </span>
            <div className="weatherIcon_and_text_container _if_">
              <div className="largeText conditionText mt mr">{user_conditionText}</div>
              <img className="weatherIcon weatherIconUserSearch" src={userSIcon} />
            </div>
          </div>
          <div>
            <div className="largeText tempUserSearch">{userSearchedTemp}</div>
          </div>
        </div>
        {/* _____________________End ofb _After user search__________________ */}

        <div className="uselessBottomBar"></div>
      </div>
    </>
  );
}

export default App;

/* Weahter API shows this kind of results. this comment is for fixing the issue in the future for example if the weahterAPi doesn't work in the future (date.now=16August2022_4:43pHaR)*/
// location	
//   name	"Chennai"
//   region	"Tamil Nadu"
//   country	"India"
//   lat	13.08
//   lon	80.28
//   tz_id	"Asia/Kolkata"
//   localtime_epoch	1661512183
//   localtime	"2022-08-26 16:39"
// current	
//   last_updated_epoch	1661511600
//   last_updated	"2022-08-26 16:30"
//   temp_c	28
//   temp_f	82.4
//   is_day	1
// condition	
//   text	"Mist"
//   icon	"//cdn.weatherapi.com/weather/64x64/day/143.png"
//   code	1030
//   wind_mph	2.2
//   wind_kph	3.6
//   wind_degree	85
//   wind_dir	"E"
//   humidity	94
//   cloud	75
//   feelslike_c	29.9
//   uv	8
