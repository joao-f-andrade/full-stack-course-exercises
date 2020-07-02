import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Function to fetch weather
const WeatherInfo = ({ city }) => {
    const [weather, setWeather] = useState({
        main: {
            temp: 3,
        },
        wind: {
            speed: 3,
        },
        weather: 'clear',
    })

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "https://community-open-weather-map.p.rapidapi.com/weather",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "88293be7aemsh30a57e451312b8fp116471jsnef713fa59936",
                "useQueryString": true
            }, "params": {
                "units": 'metric',
                "mode": "xml%2C html",
                "q": city,
            }
        })
            .then((response) => {
                console.log(response.data)
                setWeather(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [city])
    return (
        <div>
            <h2>Weather of {city}</h2>
            <div>temperature: {weather.main.temp}ºC</div>
            <div>{weather.weather[0].description} <img src={`http://api.openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt='image corresponding of its weather'></img></div>
            <div>wind: {weather.wind.speed}k/h</div>
            <div>humidity: {weather.main.humidity}%</div>
        </div>
    )
}
//    useEffect(() => fetchWeather('lisbon') , []) test function

// Display the list of countries names
const DisplayCountries = ({ countries }) => {
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
        const countryVector = [country]
        return (<DisplayCountryInfo countries={countryVector}></DisplayCountryInfo>)

    }

    return (
        <div>
            <button type='button' onClick={() => {
                setShowComponent(!showComponent)
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
            <WeatherInfo city={country.capital}></WeatherInfo>
        </div>
    )
}
// Display which decides if it shows list of countries or country info
const MainDisplay = ({ list }) => {

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