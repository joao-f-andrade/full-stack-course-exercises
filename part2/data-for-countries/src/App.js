import React, { useState, useEffect } from 'react'
import axios from 'axios'


// Display the list of countries names
const DisplayCountries = ({ countries }) => {
    console.log(countries)
    const list = countries.map(
        country => { return (<li key={country.name}>{country.name} <ButtonView country={country}></ButtonView></li>) }
    )
    return (
        <div>
            <h2>Countries matched</h2>
            <ul>{list}</ul>
        </div>
    )
}
// Button to display view of the country
const ButtonView = ({ country }) => {
    const [showComponent, setShowComponent] = useState(false)

    const showView = (country) => {
        console.log('showView works')
        const countryVector = [country]
        return (<DisplayCountryInfo countries={countryVector}></DisplayCountryInfo>)

    }

    return (
    <div>
    <button type='button' onClick={() => {
        setShowComponent(!showComponent)
        console.log('button works', showComponent)
        }}>show</button>
            {showComponent === true ? showView(country) : console.log('nao mostra view')}
            </div>
    )
}
// Form para escolher países
const Form = ({ handleInput }) => {
    return (
        <div>find countries
            <input onChange={(event) => handleInput(event.target.value)}></input>
        </div>
    )
}
// View of the country with info
const DisplayCountryInfo = ({ countries }) => {
    const country = countries[0]

    const languages = country.languages.map(language => {
        return (<li key={language.name}> {language.name} </li>)
    })
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>{languages}</ul>
            <img src={country.flag} alt={'flag'} height='100px'></img>
        </div>
    )
}
// Display which decides if it shows list of countries or country info
const MainDisplay = ({ list }) => {
    console.log('props of MainDisplay is', { list })

    if (list.length === 1) {
        return <DisplayCountryInfo countries={list}></DisplayCountryInfo>
    }
    else if (list.length <= 10) {
        return <DisplayCountries countries={list}></DisplayCountries>
    }
    else if (list.length === 0) {
        return <div>Search a country above for information about it</div>
    }
    else {
        return <div>Too many countries match. Try writing more letters</div>
    }
}
const App = () => {
    const [countries, setCountries] = useState([
        //  { name: 'portugal' },
        //  { name: 'spain' }
    ])
    const [filter, setFilter] = useState('')
    // Obtains the countries data from API
    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fufilled')
                setCountries(response.data)
            })
    }, [])

    const filterCountries = () => {
        console.log('the filter function returns', filter, countries)
        if (filter === '') { return countries }
        const list = countries.filter(country =>
            country.name.toLocaleLowerCase().includes(filter.toLowerCase())
        )
        return list
    }

    const handleInput = (filter) => {
        setFilter(filter)
    }
    return (
        <div>
            <Form handleInput={handleInput}></Form>
            <div>
                <MainDisplay list={filterCountries()}></MainDisplay>
            </div>
        </div>
    )
}

export default App