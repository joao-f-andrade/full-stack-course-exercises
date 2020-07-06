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
// Component notification
const Notification = ({ message, className }) => {
    console.log('notification', message)
    if (message === null) {
        return null
    }
    return (
        <div className={className}>
            {message}
        </div>
    )
}

// Component app
const App = () => {
    // States
    const [persons, setPersons] = useState([{ name: '', number: '', id: '' }])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [personsToShow, setPersonsToShow] = useState(persons)
    const [filter, setFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


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

    // Effect filters contacts
    useEffect(() => {
        console.log('filtragem', persons)
        setPersonsToShow(() => filter === '' ? persons :
            persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())
            ))
    }, [persons, filter])
    // Function adds new person/updates to the list
    const addPerson = (event) => {
        var foo = false
        console.log('addPerson new', newName, newNum)
        event.preventDefault()
        persons.forEach(person => {
            if (person.name === newName) {
                handleUpdate(person.id, newName, newNum)
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
        const message = `${newName} was successfuly added`
        console.log('add person output message is', message)
        handleNotification(message)
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
        const person = persons.find(obj => {
            return obj.id === id
        })
        console.log('removing entry', id, person)
        const confirmation = window.confirm(`Are you sure you want to delete ${person.name}'s contact?`)
        if (!confirmation) { return console.log('removal aborted') }
        personsService.remove(id)
            .then(() => {
                console.log('remove part 2')
                personsService
                    .getAll()
                    .then((persons) => {
                        console.log('effect output', persons)
                        setPersons(persons)
                        const message = `${person.name} was successfuly deleted`
                        console.log('delete person output message is', message)
                        handleNotification(message)
                    })
            })
    }
    //Function update
    const handleUpdate = (id, newName, newNum) => {
        const newPerson = {
            name: newName,
            number: newNum,
            id: id
        }
        console.log('handle update', newPerson)
        const confirmation = window.confirm(
            `${newPerson.name}'s contact already exists. Do you wish to update it?`
        )
        if (!confirmation) { return console.log('update aborted') }

        personsService
            .update(id, newPerson)
            .then((response) => {
                if (response === undefined) {
                     console.log('error part of handle update')
                     handleErrorNotification(`Information of ${newPerson.name} was already deleted`)
                     personsService.getAll()
                        .then((persons) => {
                            console.log('update output', persons)
                            setPersons(persons)
                        })
                    }
                else {
                    console.log('worked')
                    handleNotification(`${newPerson.name} was successfuly updated`)
                    personsService.getAll()
                        .then((persons) => {
                            console.log('update output', persons)
                            setPersons(persons)
                        })
                    }
            })
    }

//Function handle notification
const handleNotification = (message) => {
    console.log('handle notification input is', message)
    setNotificationMessage(message)
    setTimeout(() => {
        setNotificationMessage(null)
    }, 5000)
}
//Function handle errorNotification
const handleErrorNotification = (message) => {
    console.log('handle errorNotification input is', message)
    setErrorMessage(message)
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
}
//Body of Page
return (
    <div>
        <h2>Phonebook</h2>
        <Notification className='notification' message={notificationMessage} />
        <Notification className='error' message={errorMessage} />

        <div>
            filter shown with
                    <input
                onChange={handleFilterChange} value={filter}
            />
        </div>
        <FormAddPeople addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} />
        <Numbers persons={personsToShow} handleRemove={handleRemove} />
    </div>
)
}

export default App