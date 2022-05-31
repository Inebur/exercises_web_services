import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import NotificationAdded from './NotificationAdded'
import NotificationSuccessUpdate from './NotificationSuccessUpdate'
import NotificationFailUpdate from './NotificationFailUpdate'



const App = () => {
  const [persons, setPersons] = useState([])
  const [createdUser, setCreatedUser] = useState("")
  const [updatedName, setUpdatedName] = useState({
    success : "", 
    fail : ""
  })

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        console.log("response data : " + initialPersons)
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState([])
  
  const addPhone = (event) => {
    event.preventDefault()
    
    var occur = false
    const personObject = {
      name : newName,
      number : newNumber, 
      id : persons.lastIndexOf(persons.slice(-1)) + 1
    }
    
    var existingPerson = null

    persons.map(person => {
          if(person.name == personObject.name){
            occur = true
            existingPerson = person
          }
        }
      )

    if(occur){
      if(window.confirm(existingPerson.name + " is already added to phonebook, replace the old number with a new one ?")){
        const changePerson = { ...existingPerson, number: newNumber }
        
        personService
        .updateNumber(existingPerson.id, changePerson)
        .then( response => {
          
          setUpdatedName({...updatedName, success: changePerson.name, fail: ""})
          setTimeout(() => {setUpdatedName({...updatedName, success: "", fail: ""})}, 2500)
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
          
          /**
           * Success Notification here
           */
          setUpdatedName({...updatedName, success: changePerson.name, fail: ""})
          setTimeout(() => {setUpdatedName({...updatedName, success: "", fail: ""})}, 2500)
        })
        .catch( () => {
          /**
           * Fail notification here
           */
          setUpdatedName({...updatedName, fail: changePerson.name, success: ""})
          setTimeout(() => {setUpdatedName({...updatedName, success: "", fail: ""})}, 2500)

        })
      }
    }
    else{
      personService
        .create(personObject)
        .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')

        /**
         * add code to display notification here
         */
        setCreatedUser(personObject.name)
        setTimeout(() => {setCreatedUser("")}, 2500)

      })
     // setPersons(persons.concat(personObject))

    }
      

    
  }
  
  const handleInputNameChanging = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumberChanging = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInputFilterChanging = (event) => {

    var names = []
    if(event.target.value != '')
      names = persons.filter(person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    setFilteredNames(names)
  }


    return (
      <div>
        <h2>Phonebook</h2>
        <NotificationAdded name={createdUser} />
        <NotificationSuccessUpdate updatedName={updatedName} />
        <NotificationFailUpdate updatedName={updatedName} />
        <Filter filteredPersons={filteredNames} callback={handleInputFilterChanging}/>

        <h2>add a new</h2>
        <PersonForm callbackSubmit={addPhone} valueName={newName} onChangeName={handleInputNameChanging} 
        valueNumber={newNumber} onChangeNumber={handleInputNumberChanging} />
        
        <h2>Numbers</h2>
        <Persons people={persons} setPersons={setPersons} /> 
        
      </div>
    )
}



export default App
