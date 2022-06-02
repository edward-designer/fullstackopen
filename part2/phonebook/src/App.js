import { useState, useEffect } from 'react'
import serverComm from './server'

const Filter = ({searchText, seachChangeHandler}) => <div>filter shown with <input value={searchText} onChange={seachChangeHandler} /></div>

const PersonsForm = ({onSubmitHandler,onNameChangeHandler,onNumberChangeHandler,newName,newNumber}) => (
      <form onSubmit={onSubmitHandler}>
        <div>
          name: <input required={true} value={newName} onChange={onNameChangeHandler}/>
        </div>
        <div>
          number: <input required={true} type='tel' value={newNumber} onChange={onNumberChangeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)      

const Persons = ({persons,searchText, deleteHandler}) => {
  const regex = new RegExp(searchText, 'i'); // for regex
  return (persons.filter(person=>person.name.match(regex)).map(person=><li key={person.name}>{person.name} {person.number} <button type="button" onClick={deleteHandler(person)}>delete</button></li>))
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(()=>{
    const promise = serverComm.getAll();
    promise.then(data=>{setPersons(data)})
  },[])

  const onNameChangeHandler = (e) => setNewName(e.target.value)
  const onNumberChangeHandler = (e) => setNewNumber(e.target.value)  
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if(!newName||!newNumber){alert(`Name and/or phone number cannot be empty`); return}
    if(persons.some(person => person.name === newName && person.phone === newNumber)){alert(`${newName} is already added to phonebook`); return}
    if(persons.some(person => person.name === newName && person.phone !== newNumber)){
      if(window.confirm(`${newName} is already added to phonebook, replace with the new number ${newNumber}?`)){
          const personID = persons.find(person=>person.name===newName&&person.phone!==newNumber).id;
          const updatedPerson = {name: newName, number: newNumber, id: personID};
          serverComm.update(personID,updatedPerson).then(response=>{setPersons(persons.filter(persons => persons.id !== personID).concat(updatedPerson))})
      }
    }else{
      serverComm.create({name:newName, number:newNumber}).then(response=>{setNewName('');setNewNumber('');setPersons(persons.concat(response))})
    }
  }
  const seachChangeHandler = (e) => {
    setSearchText(e.target.value);
  }
  const deleteHandler = ({id,name}) => (e) => {
    if(window.confirm(`Delete ${name}?`)){
      serverComm.deleteEntry({id}).then(response => {setPersons(persons.filter(person=>person.id!==id))})
    }
  }
  const personsFormProps = {newName, newNumber,onSubmitHandler,onNameChangeHandler,onNumberChangeHandler}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} seachChangeHandler={seachChangeHandler} />
      <h2>Add a New Contact</h2>
      <PersonsForm {...personsFormProps}/>
      <h2>Numbers</h2>
      <Persons searchText={searchText} persons={persons} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App
