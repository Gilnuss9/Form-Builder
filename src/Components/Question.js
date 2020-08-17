import React from 'react'

function Question({question, removeTodo}){
    
    function handleButton(){
        removeTodo(question.id)
    }
    return(
        <div style ={{display: "flex"}}>
        <li style={{
            color: "black",
            textDecoration: question.completed ?"line-through" :null
        }}>
            {question.fieldLable}
            {question.inputName}
            {question.inputType}
            </li>
        <button onClick={handleButton}>x</button>
        </div>
    )
}

export default Question