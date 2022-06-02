import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({onChangeHandler, searchText}) => <div>find countries <input onChange={onChangeHandler} value={searchText} /></div>
const CountryInfo = ({countries, searchText, showCountry}) => {
  const regex = new RegExp(searchText,'i')
  let filteredCountries = countries?.filter(country => country.name.common.match(regex));
  const exactMatchCountries = countries?.filter(country => country.name.common===searchText);
  if(exactMatchCountries.length===1){
    filteredCountries = exactMatchCountries;
  }
  if(filteredCountries.length===0){
    return (
      <div>Sorry, no country matched the search string</div>
    )
  }else if(filteredCountries.length===1){
    return (
      <CountryView country={filteredCountries[0]} />
    )
  }else if(filteredCountries.length>10){
    return <div>Too many matches, specify another filter</div>
  }else{
    return (
      <div>
        {filteredCountries?.map(country =>
          <li key={country.cca3}>{country.name.common} <button onClick={showCountry(country.name.common)}>show</button></li>
        )}
      </div>
    )
  }
}


const Weather = ({latlng,capital}) =>{
  const [weather,setWeather] = useState({});
  
  useEffect(()=>{
    const api_key = process.env.REACT_APP_API_KEY
    const promise=axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${api_key}`)
      promise.then(response => setWeather(response.data)).catch(e=>console.log(e.message))
    return (()=>{setWeather({})})},[latlng, capital]
  )

  if(Object.keys(weather).length!==0){
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature {weather?.main?.temp}<sup>o</sup>C</p>
        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@4x.png`} alt={weather?.weather[0]?.description} width="300px" />
        <p>Wind {weather?.wind?.speed} m/s</p>
      </div>  
    )
  }else{
    return (<div>loading weather info...</div>)
  }
}
const CountryView = ({country:{name,capital,languages,area,flags,latlng}}) => {
  
  return (
    <div>
        <h1>{name.common}</h1>
        <p>capital: {capital.join(' ')}</p>
        <p>area: {area}km<sup>2</sup></p>
        <p><strong>languages:</strong></p>
        <ul>
          {Object.keys(languages).map((key)=><li key={key}>{languages[key]}</li>)} 
        </ul>
        <img src={flags.svg} alt={`flag of ${name.common}`} width="300px" />
        <Weather latlng={latlng} capital={capital[0]} />
      </div>
  )
}

function App() {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const promise = axios.get('https://restcountries.com/v3.1/all');
    promise.then(response => setCountries(response.data))
  },[]);

  const showCountry = (countryName) => (e) => {
    setSearchText(countryName);
  }
  const onChangeHandler = (e) => {
    setSearchText(e.target.value)
  }
  return (
    <div>
      <SearchBar onChangeHandler={onChangeHandler} searchText={searchText} />
      <CountryInfo countries={countries} searchText={searchText} showCountry={showCountry} />
    </div>
  );
}

export default App;
