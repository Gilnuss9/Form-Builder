import React, {useState} from 'react'

function FillableField({question,updateAnswer,answers}){
    const [answer , setAnswer] = useState({
        id: '',
        content: ''
    })



    function handleAnswerChange(e){
        console.log(e.target.value)
        updateAnswer(question.id, e.target.value)
        setAnswer({ ...answer, id:question.id, content: e.target.value });
    }
    console.log(answers)
    return(
        <div>
            <div><strong><u>Question:</u></strong> {' '}
            {question.fieldLable}
            </div>
            <input type={question.inputType} placeholder={question.inputName} name={question.fieldLable} onChange={handleAnswerChange}></input>
        </div>
    )

}

export default FillableField