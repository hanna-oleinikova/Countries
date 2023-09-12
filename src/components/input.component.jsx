import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

Input.propTypes = {
  data: PropTypes.array.isRequired,
  setFoundCountries: PropTypes.func.isRequired,
};

export function Input ({data, setFoundCountries}) {
  const [searchString, setSearchString] = useState("");

  function onChangeHandler(event) {
    const searchValue = event.target.value;
    setSearchString(searchValue);
  }

  useEffect(() => {
    const newArray = data.filter((i) => {
      return i.name.common.toLowerCase().includes(searchString.toLowerCase());
    });
    setFoundCountries(newArray);

    // if (!searchString) {
    //   setFoundCountries(data);
    // }
    // setFoundCountries(newArray);
  }, [searchString]); 

  return (
    <>
    <input 
      type="search" 
      name="search" 
      id="search-input"
      placeholder='Enter the country name...' 
      onChange={onChangeHandler} 
      />
    </>
  )
}