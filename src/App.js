import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filtered,setFiltered] = useState([]);



  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlerNumberChange = (event) =>{
    setNewNum(event.target.value)
  }


  
  const addName = (event) =>{
    event.preventDefault();
    let added = false;

    // eslint-disable-next-line
    persons.map(person => {if(person.name.toLowerCase() === (newName.toLowerCase())){ added = true}});
  
    if(!added){
      const personObj = {
        name : newName,
        number : newNum
      }
      setPersons(persons.concat(personObj));
        alert(`${newName} is added `)
        setNewName("");
        setNewNum('');
      }else{
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNum("");
    }
  }

  const  filterPeople = (event) =>{
    if(event.target.value.length > 0){
    setFiltered(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }else{
      setFiltered([]);
    }
  }
    
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter persons={filtered} func={filterPeople}/>
     
      <h2>Add a new</h2>
      <PersonForm func={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handlerNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}
//1. component
const Persons = ({persons}) =>{return (
<ul>
  {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
</ul>)}

//2. component
const PersonForm = ({children ,func}) =>{
  return (
    <form onSubmit={func}>
      {children}
    </form>
  )
}
//3. component 
const Filter = ({persons,func}) => {
  return(
    <div>
    <p>filter shown with <input onChange={func}></input> </p>
  <ul>
    {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
  </div>
)}

export default App