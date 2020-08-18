import React from 'react'

function Question({question, removeQuestion}){
    
    function handleButton(){
        removeQuestion(question.id)
    }
    return(
        <div>
            <div className='text-center font-weight-bold'>
                <u>
                List of Form Fields
                </u>
            </div>
            <strong>Field Lable: {' '}</strong>
            {question.fieldLable}
            <strong>Input Name: {' '}</strong>
            {question.inputName}
            <strong>Input Type: {' '}</strong>
            {question.inputType}
        <button onClick={handleButton}>x</button>
        </div>
    )
}

export default Question