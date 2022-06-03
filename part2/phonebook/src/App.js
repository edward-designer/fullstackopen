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

const Persons = ({persons,searchText, deleteHandler, setMessage}) => {
  const regex = new RegExp(searchText, 'i'); // for regex
  return (persons.filter(person=>person.name.match(regex)).map(person=><li key={person.name}>{person.name} {person.number} <button type="button" onClick={deleteHandler(person,setMessage)}>delete</button></li>))
}

const Notification = ({message, setMessage}) => {
  if(Object.keys(message).length === 0) return;
  setTimeout(()=>setMessage({}),5000)
  let msgStyle={marginBottom:'10px',border:'1px solid green',backgroundColor:'#feffeb',color:'darkgreen',padding:'10px'}
  if(message.error){msgStyle={marginBottom:'10px',border:'1px solid red',backgroundColor:'#feffeb',color:'darkred',padding:'10px'}}
  return <div style={msgStyle}>{message[Object.keys(message)[0]]}</div>;
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState({})
  
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
          serverComm.update(personID,updatedPerson).then(response=>{setPersons(persons.filter(persons => persons.id !== personID).concat(updatedPerson));setNewName('');setNewNumber('');setMessage({success:`Updated the phone number for ${newName}`})})
          .catch(err => console.error(err))
      }
    }else{
      serverComm.create({name:newName, number:newNumber}).then(response=>{setNewName('');setNewNumber('');setPersons(persons.concat(response));setMessage({succeess:`Added ${newName}`});}).catch(err => console.error(err))
    }
  }
  const seachChangeHandler = (e) => {
    setSearchText(e.target.value);
  }
  const deleteHandler = (person,setMessge) => (e) => {
    const {id,name} = person;
    if(window.confirm(`Delete ${name}?`)){
      serverComm.deleteEntry({id}).then(response => {setPersons(persons.filter(person=>person.id!==id))}).catch(err =>{setMessge({error:`Information of ${name} has already been removed from the server.`});setPersons(persons.filter(person=>person.id!==id));console.error(err)})
    }
  }
  const personsFormProps = {newName, newNumber,onSubmitHandler,onNameChangeHandler,onNumberChangeHandler}

  console.log(message);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage} />
      <Filter searchText={searchText} seachChangeHandler={seachChangeHandler} />
      <h2>Add a New Contact</h2>
      <PersonsForm {...personsFormProps}/>
      <h2>Numbers</h2>
      <Persons searchText={searchText} persons={persons} setMessage={setMessage} deleteHandler={deleteHandler}/>
    </div>
  )
}

export default App
