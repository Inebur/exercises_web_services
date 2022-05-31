import React from 'react'

const Filter = (props) => {

    return(
        <div>
        filter shown with <input  onChange={props.callback} />
        {props.filteredPersons.map(person => <p key={person.id}>{person.name} 
         </p>)}
      </div>
      
  
    )
  }

  export default Filter