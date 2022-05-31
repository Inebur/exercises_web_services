import { useState, useEffect } from "react"
import axios from 'axios'
import Filter from './Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        const json_response = JSON.stringify(response.data)
        //console.log("response data string: " + json_response)
        console.log("response data " + response.data[0].name.common)
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  

  
  const handleInputFilterChanging = (event) => {

    var names = []
    if(event.target.value != '')
      names = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredCountries(names)
  }

  const filterByName = (name) => {
    
    return countries.find(country => country.name.common === name)
   
  }
  

  return (
    <div>
      <Filter filteredCountries={filteredCountries} callback={handleInputFilterChanging} filterByName={(e)=>filterByName(e)} />
    </div>
  )
}

export default App;
