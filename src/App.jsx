import './App.scss';
import { useEffect, useState } from 'react';
import { Input } from './components/input.component';

function App() {
  const [data, setData] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      })
    .catch((error) => {console.log(error);})
  }, [])

  return (
      <div className='main-container'>
        <h1 className='title'>Countries</h1>
        <div className='search-container'>
        <Input  data={data}
                setFoundCountries={setFoundCountries}
                setCountryCode={setCountryCode}
        />
        </div>


        <div className='cont-country'>
          <h5>Your coutry is</h5>
          {foundCountries.map((country) => {
            return (
              <h2 key={country.name.common}>{country.name.common}</h2>
            )
          })}
        </div>
        
        <div className='container'>
        
        {/* The capital is */}
          <div className='card'>
          <img className='icon' src="/icons/government.png" alt="capital" />
          <h5>The capital is </h5>
            <div className='answer'>
              {foundCountries.map((country) => {
              return (
                <h2 className='found-data' key={country.name.common}>{country.capital.join(', ')}</h2>
              )
              })}
            </div>
          </div>
        
        {/* The time-zone is */}
          <div className='card'>
            <img className='icon' src="/icons/time-zone.png" alt="time-zone" />
            <h5>The time-zone is</h5>
              <div className='answer'>
                {foundCountries.map((country) => {
                return (
                  <h3 className={country.timezones.length < 3 ? 'found-data' : 'found-data-small'} key={country.name.common}>
                    {country.timezones.map((timezone, index) => (
                    <span key={index}>
                      {timezone}
                      {index < country.timezones.length - 1 && <br />}
                    </span>
                    ))}
                  </h3>
                )
              })}
              </div>
          </div>
        
        {/* The currency used */}
          <div className='card'>
            <img className='icon' src="/icons/4634986_moneys_financial_layers_money_icon.png" alt="money" />
            <h5>The currency used</h5>
            <div className='answer'>
              {foundCountries.map((country) => {
                if (country.currencies) {
              const currencyKeys = Object.keys(country.currencies);
              const currencyName = country.currencies[currencyKeys[0]].name;
              const currencySymbol = country.currencies[currencyKeys[0]].symbol;
                return (
                  <h2 className='found-data' key={country.name.common}>{`${currencyName} (${currencySymbol})`}</h2>
                );
              }
                return "Not found";
              })}
            </div>
          </div>
        
        {/* The flag looks */}
        <div className='card'>
          <img className='icon' src="/icons/172466_flag_alert_icon.png" alt="flag" />
          <h5>The flag looks</h5>
          <div className='answer'>
            {foundCountries.map((country) => (
              <div key={country.name.common}>
                {country.flags && country.flags.png ? (
                  <img className='found-data flag-pic' src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                ) : (
                  <p>No flag available</p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* They speak here */}
          <div className='card'>
            <img className='icon' src="/icons/speak.png" alt="speak" />
            <h5>They speak here</h5>
            <div className='answer'>
              {foundCountries.map((country) => {
                if (country.languages) {
                  const languageCodes = Object.keys(country.languages);
                  const languageNames = languageCodes.map((code) => country.languages[code]);
                  return (
                    <h2 
                      className={languageCodes.length < 3 ? 'found-data' : 'found-data-small'} 
                      key={country.name.common}>
                        {languageNames.join(', ')}
                    </h2>
                  );}
                })}
            </div>
          </div>
        
        {/* The country map */}
          <div className='card'>
          <img className='icon' src="/icons/pin_927667.png" alt="speak" />
            <h5>The country map</h5>
            <div className='answer'>
              {foundCountries.map((country) => (
                <div key={country.name.common}>
                  {country.maps && country.maps.googleMaps ? (
                    <div className="map-container">
                      <a
                        href={country.maps.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img className='icon icon-map found-data' src="/icons/map.png" alt="map" />
                      </a>
                    </div>
                  ) : (
                    <div>No map available</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default App;
