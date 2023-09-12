import './App.scss';
import { useEffect, useState } from 'react';
import { Input } from './components/input.component';

function App() {
  const [data, setData] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      // setFoundCountries(data);
      })
    .catch((error) => {console.log(error);})
  }, [])
  console.log(data)


  return (
      <>
      <h1 className='title'>Countries</h1>

      <div className='search-container'>
      <Input data={data} setFoundCountries={setFoundCountries}/>

      <div className='cont-country'>
        <h3>You chose</h3>
        {foundCountries.map((country) => {
          return (
            <h2 key={country.name.common}>{country.name.common}</h2>
          )
        })}
        </div>
      </div>

      <div className='container'>
        <div className='cont-capital'>
          <h3>The capital is </h3>
          {foundCountries.map((country) => {
          return (
            <h2 key={country.name.common}>{country.capital}</h2>
          )
        })}
        </div>

        <div className='cont-time'>
          <h3>The time-zone is</h3>
         {foundCountries.map((country) => {
          return (
            <h2 key={country.name.common}>{country.timezones}</h2>
          )
        })}
        </div>

        <div className='cont-many'>
          <h3>The currency used</h3>
          {/* {foundCountries.map((country) => {
          return (
            <h2 key={country.name.common}>{Object.keys(country.currencies)[0]}</h2>
          )
        })} */}
        </div>
        <div className='cont-flag'>
          <h3>The flag looks</h3>
          {foundCountries.map((country) => {
          return (
            <h2 key={country.name.common}>{country.flag}</h2>
          )
        })}
        </div>
        <div className='cont-language'>
          <h3>They speak here</h3>
          {/* {foundCountries.map((country) => {
          return (
            <h2 key={country.name.common}>{Object.keys(country.languages)[0]}</h2>
          )
        })} */}
        </div>
        <div className='cont-border'>
          <h3>The country borders</h3>
          {foundCountries.map((country) => {
          return (
            <h2 key={country.name.common}>{country.borders}</h2>
          )
        })}
        </div>
      </div>
    </>
  )
}

export default App;
