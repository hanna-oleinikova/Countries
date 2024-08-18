import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './input.style.scss'

export function Input ({data, setFoundCountries, setCountryCode}) {
  const [searchString, setSearchString] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const selectedCountry = data.find((country) => {
      return country.name.common.toLowerCase() === searchString.toLowerCase();
    });

    if (selectedCountry) {
      setFoundCountries([selectedCountry]);
      setCountryCode(selectedCountry.cca2);
    } else {
      setFoundCountries([]);
    }
  }, [searchString, data]);

  useEffect(() => {
    const names = data.map((item) => item.name.common);
    const uniqueNames = [...new Set(names)];
    setCountryList(uniqueNames);
  }, [data]); 

  function onChangeHandler(event) {
    const searchValue = event.target.value;
    setSearchString(searchValue);
  }

  return (
    <>
      <input 
        type="search" 
        name="search" 
        id="search-input"
        placeholder='Enter the country name...' 
        onChange={onChangeHandler}
        list="country-list"
        className="input-style"
      />
      <datalist id="country-list">
        {countryList.map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
    </>
  )
}

Input.propTypes = {
  data: PropTypes.array.isRequired,
  setFoundCountries: PropTypes.func.isRequired,
  setCountryCode: PropTypes.func.isRequired,
};
