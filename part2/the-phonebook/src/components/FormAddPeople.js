import React from 'react';

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

export default FormAddPeople