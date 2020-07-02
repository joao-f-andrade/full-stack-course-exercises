import React, { useState, useEffect } from 'react';
import axios from 'axios'

// Component creates list of numbers
const Numbers = ({ persons }) => {

    const list = persons.map(
        (person) => { return (<PersonInfo person={person} key={person.name}></PersonInfo>) }
    )
    return (
        <div>
            <h2>Numbers</h2>
            <ul>{list}</ul>
        </div>
    )
}
const PersonInfo = ({ person }) => {
    return <li >{person.name} {person.number}</li>
}
const FormAddPeople = ({
    addPerson,
    newName,
    handleNameChange,
    newNum,
    handleNumChange
}) => {
    return (
        <form onSubmit={addPerson}>
            <h2>add a new</h2>
            <div>
                name:
                    <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number:
                    <input
                    value={newNum}
                    onChange={handleNumChange}
                />
            </div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )
}
const App = () => {
    // States
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [personsToShow, setPersonsToShow] = useState(persons)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
      }, [])

    // Function adds new person to the list
    const addPerson = (event) => {
        var foo = false
        event.preventDefault()
        persons.forEach(person => {
            if (person.name === newName) {
                alert(`${newName} is already added to the phonebook`)
                setNewName('')
                setNewNum('')
                foo = true
            }
        })
        if (foo) return
        const nameObject = {
            name: newName,
            number: newNum
        }
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNum('')
        var cenas = personsToShow.concat(nameObject)
        setPersonsToShow(() => filter === '' ? cenas :
            cenas.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())
            ))
    }

    //Functions add new Name and Number
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumChange = (event) => {
        setNewNum(event.target.value)
    }
    //Function event filter
    const handleFilterChange = (event) => {
        console.log(event.target.value)
        var filterTemp = event.target.value
        setPersonsToShow(() => filterTemp === '' ? persons :
            persons.filter(person => person.name.toLowerCase().includes(filterTemp.toLowerCase())
            ))
        setFilter(filterTemp)

    }

    //Body of Page
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with
                    <input
                    onChange={handleFilterChange}
                />
            </div>
            <FormAddPeople addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange}></FormAddPeople>
            <Numbers persons={personsToShow}></Numbers>
        </div>
    )
}

export default App