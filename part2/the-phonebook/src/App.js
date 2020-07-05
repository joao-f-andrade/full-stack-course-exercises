import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import FormAddPeople from './components/FormAddPeople'

// Component creates list of numbers
const Numbers = ({ persons, handleRemove }) => {
    console.log('numbers input', persons)
    const list = persons.map(
        (person) => {
            return (<li key={`${person.id}`}>
                {person.name} {person.number} <button onClick={() => handleRemove(person.id)}>delete</button>
            </li>)
        }
    )
    return (
        <div>
            <h2>Numbers</h2>
            <ul>{list}</ul>
        </div>
    )
}


const App = () => {
    // States
    const [persons, setPersons] = useState([
        { name: '', number: '',id:'' },

    ])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [personsToShow, setPersonsToShow] = useState(persons)
    const [filter, setFilter] = useState('')


    // Gets persons from server
    useEffect(() => {
        personsService
            .getAll()
            .then(persons => {
                console.log('effect output', persons)
                setPersons(persons)
                setFilter('')
                setPersonsToShow(persons)
                console.log('initial persons e show,e filter', persons)
            })
    }, [])

    useEffect(() =>
        console.log('personsToShowUpdate', personsToShow)
        , [personsToShow])
    useEffect(() => {
        console.log('filtragem', persons)
        setPersonsToShow(() => filter === '' ? persons :
            persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())
            ))
    }, [persons, filter])
    // Function adds new person to the list
    const addPerson = (event) => {
        var foo = false
        console.log('addPerson new', newName, newNum)
        event.preventDefault()
        persons.forEach(person => {
            if (person.name === newName) {
                handleUpdate(person.id,newName,newNum)
                setNewName('')
                setNewNum('')
                foo = true
            }
        })
        if (foo) return
        console.log('addPerson input', event)

        const nameObject = {
            name: newName,
            number: newNum
        }
        console.log('add person before input', nameObject)
        personsService
            .add(nameObject)
            .then((personAdded) => {
                const personsAfterAdd = persons.concat(personAdded)
                console.log('setpersons input', personsAfterAdd)
                setPersons(personsAfterAdd)
            })
        setNewName('')
        setNewNum('')
    }

    //Functions add new Name and Number
    const handleNameChange = (event) => {
        console.log('setNewName and persons', event.target.value, persons)
        setNewName(event.target.value)
    }
    const handleNumChange = (event) => {
        console.log('setNewNum', event.target.value)
        setNewNum(event.target.value)
        return console.log('updated')
    }
    //Function event filter
    const handleFilterChange = (event) => {
        var filterTemp = event.target.value
        setFilter(filterTemp)
        console.log('filter')
    }
    //Function remove entry
    const handleRemove = (id) => {
        const person=persons.find(obj=>{
            return obj.id===id
        })
        console.log('removing entry', id)
        const confirmation=window.confirm(`Are you sure you want to delete ${person.name}'s contact?` )
        if (!confirmation) { return console.log('removal aborted')}
        personsService.remove(id)
            .then(() => {
                console.log('remove part 2')
                personsService
                    .getAll()
                    .then((persons) => {
                        console.log('effect output', persons)
                        setPersons(persons)
                    })
            })
    }
    //Function update
    const handleUpdate = (id,newName, newNum) => {
        const newPerson = {
            name: newName,
            number: newNum,
            id:id
        }
        console.log('handle update',newPerson)
        const confirmation=window.confirm(
        `${newPerson.name}'s contact already exists. Do you wish to update it?`
        )
        if(!confirmation) {return console.log('update aborted')}

        personsService
        .update(id,newPerson)
        .then(()=>{
            personsService.getAll()
            .then((persons)=>{
                console.log('update output',persons)
                setPersons(persons)
            })
        })
    }
    //Body of Page
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with
                    <input
                    onChange={handleFilterChange} value={filter}
                />
            </div>
            <FormAddPeople addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange}
            ></FormAddPeople>
            <Numbers persons={personsToShow} handleRemove={handleRemove}></Numbers>
        </div>
    )
}

export default App