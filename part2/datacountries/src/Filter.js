import React, { useState} from 'react'


const displayCountryInfos = (country) => {
  if(country){
  
    var languages = []
    Object.keys(country.languages).map(function(key, value){
      languages.push({"codeLanguage" : key, "languageName" : country.languages[key]})
    })
  
    return(
      <div>
  
        <p>capital : {country.capital}</p>
        <p>area : {country.area}</p>
  
        <p><strong>languages</strong></p>
        <ul>
          {
            languages.map(language => <li key={language.codeLanguage}>{language.languageName}</li>)
          }
        </ul>
  
        <img src={country.flags["png"]} />
      </div>  
    )

  }
  
}


const CountryAndShowButton = (props) =>{

    return(
      <div>
        <p key={props.country.name.common}>{props.country.name.common} 
        <input onClick={(e) => {props.handleOnClickShow(props.country.name.common)}} value="show" type="button" />
        </p>
      </div>
    )
  
}



const Filter = (props) => {
    const [onClickShow, setOnClickShow] = useState("")

  
    const handleOnClickShow = (name) =>{

      setOnClickShow(name)
      
    }

    if(props.filteredCountries.length > 10){
      
      return (
        <div>
          find countries <input  onChange={props.callback} />
          <p>Too many matches, specify another filter</p>
        </div>
      )
    }

    else if(props.filteredCountries.length > 1 && props.filteredCountries.length <= 10){
      return(
          <div>
            find countries <input  onChange={props.callback} />
            {
            props.filteredCountries.map(country =>{
               return(
                 <div key={country.name.common} >
                
                  <CountryAndShowButton key={country.name.common} country={country} handleOnClickShow={handleOnClickShow} />
                 </div>
               )
              })
            }
            {displayCountryInfos(props.filterByName(onClickShow))}
            
            
          </div> 
        )
    }

    else if (props.filteredCountries.length == 1){
      
      var languages = []
      Object.keys(props.filteredCountries[0].languages).map(function(key, value){
        languages.push({"codeLanguage" : key, "languageName" : props.filteredCountries[0].languages[key]})
      })

      return(
        <div>
          find countries <input  onChange={props.callback}  />
          <h2>
            {props.filteredCountries[0].name.common}
          </h2>

          <p>capital : {props.filteredCountries[0].capital}</p>
          <p>area : {props.filteredCountries[0].area}</p>

          <p><strong>languages</strong></p>
          <ul>
            {
              languages.map(language => <li key={language.codeLanguage}>{language.languageName}</li>)
            }
          </ul>

          <img src={props.filteredCountries[0].flags["png"]} />
        </div>  
      )
      
    }

    else 

      return(
        <div>
          find countries <input  onChange={props.callback} />
        </div>  
      )



  }

  export default Filter