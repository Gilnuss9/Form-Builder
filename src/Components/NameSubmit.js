import React, {useState} from 'react'

function NameSubmit({changeName}){
    const [name, setName] = useState('');

    function handleInput(e) {
        setName(e.target.value)
    }

    function handleSubmit(e) {
        if (name.trim()){
            changeName(name);
        }
        }


    return(
        <div>
            <form onSubmit = {handleSubmit}>
            Choose Form Name
            <input
                value = {name}
                onChange={handleInput} />
            <button type="submit"> Submit </button>
            </form>
        </div>
    )
}

export default NameSubmit