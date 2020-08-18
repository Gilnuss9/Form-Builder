import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
//import Select from 'react-select'

function QuestionForm({ addquestion }) {
    const [question, setquestion] = useState({
        id: '',
        fieldLable: '',
        inputName: '',
        inputType: 'text',
    });

    function handleTaskFieldChange(e) {
        setquestion({ ...question, fieldLable: e.target.value });
        console.log(question)
    }

    function handleTaskInputNameChange(e) {
        setquestion({ ...question, inputName: e.target.value });
    }

    function handleTaskInputTypeChange(e) {
        setquestion({ ...question, inputType: e.target.value });
        console.log(e.target.value)
    }

    function handleSubmit(e) {
        console.log(question)
        e.preventDefault();
        if (question.fieldLable.trim()) {
            addquestion({ ...question, id: uuid() });
            console.log(question)
            /// reset task input
            setquestion({ ...question, fieldLable: '', inputName: '', inputType: '' });
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <div ><strong><u>field lable:</u>{' '}</strong>
                <input
                    value={question.fieldLable}
                    onChange={handleTaskFieldChange} />
            </div>
            <div>
                <strong><u>input name:</u>{' '}</strong>
                <input
                    value={question.inputName}
                    onChange={handleTaskInputNameChange} />
            </div>
            
            <div>
            <strong><u>Choose Type</u>{' '}</strong>
                <select onChange={handleTaskInputTypeChange}>
                    Choose Type
                    <option selected value = {'text'} >text</option>
                    <option value = {'color'} >color</option>
                    <option value = {'date'} >date</option>
                    <option value = {'email'} >email</option>
                    <option value = {'tel'} >tel</option>
                    <option value = {'number'} >number</option>
                </select>
            </div>

            <button type="submit"> add field </button>
        </form>
    );
}

export default QuestionForm;