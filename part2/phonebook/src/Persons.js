import React from 'react'
import personService from './services/persons'

const Persons = (props) => {

    const handleClickDelete = (person) => {
        console.log(person)
        if(window.confirm("Delete " + person.name + " ?")){
            personService
            .deletePerson(person.id)
            .then(() => { 
                var temp = [...props.people]
                var index = props.people.indexOf(person)
                if(index != -1){
                    temp.splice(index, 1)
                    props.setPersons(temp)
                }
            })
        }
    }

    return(
        props.people.map(person => <p key={person.id}> {person.name} {person.number}
        <input onClick={ (event) => handleClickDelete(person) } type="button" value="delete"  />
        </p> )
    )
}

export default Persons