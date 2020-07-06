import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const request =
        axios
            .get(baseUrl)
    return request.then((request) => {
        console.log('server getAll function output', request.data)
        return (request.data)
    })
}

const add = (newObject) => {
    console.log('server.add input', newObject)
    const request =
        axios
            .post(baseUrl, newObject)
    return request.then((response) => {
        console.log('server.add output', response.data)
        return response.data
    })
    .catch(error => {
        console.log('delete from server failed',error)
    })
    
}

const remove = (id) => {
    console.log('remove func id is,', id)
    const request =
        axios
            .delete(`${baseUrl}/${id}`)
    return request.then(
        (response => console.log(response))
    )
    .catch(error => {
        console.log('delete from server failed',error)
    })
}
const update = (id,newObject) => {
    console.log('is updating',newObject)
    const request =
        axios
            .put(`${baseUrl}/${id}`, newObject)
    return  request.then(response => {
            console.log('update raw output',response)
            return response.data})
            .catch(error=> {
                console.log('error',error)
            })
        
}


export default {
    getAll,
    add,
    remove,
    update
}