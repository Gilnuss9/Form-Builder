import React, {useState} from 'react'
import {useForm} from 'react-hook-form'

function FillableField({todo ,addAnswer}){
    const [answer , setAnswer] = useState({
        id: '',
        content: ''
    })
    const {register , handleSubmit} = useForm();

    function onSubmit(data) 
    {
        
        addAnswer(answer)
    }

    function handleAnswerChange(e){
        setAnswer({ ...answer, id:todo.id, content: e.target.value });
    }
    console.log(todo)
    return(
        <div>
            {todo.fieldLable}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type={todo.inputType} placeholder={todo.inputName} name={todo.fieldLable} ref={register} onChange={handleAnswerChange}></input>
            <input type="submit"/>
        </form>
        </div>
    )

}

export default FillableField