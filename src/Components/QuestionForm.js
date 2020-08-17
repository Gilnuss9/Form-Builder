import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
//import Select from 'react-select'

function QuestionForm({ addquestion }) {
    const [question, setquestion] = useState({
        id: '',
        fieldLable: '',
        inputName: '',
        inputType: '',
        completed: false
    });

    function handleTaskFieldChange(e) {
        setquestion({ ...question, fieldLable: e.target.value });
    }

    function handleTaskInputNameChange(e) {
        setquestion({ ...question, inputName: e.target.value });
    }

    function handleTaskInputTypeChange(e) {
        setquestion({ ...question, inputType: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (question.fieldLable.trim()) {
            addquestion({ ...question, id: uuid() });
            /// reset task input
            setquestion({ ...question, fieldLable: '', inputName:'',inputType: '' });
        }
    }

    

    return (
        <form onSubmit={handleSubmit}>
            <div><h4>field lable</h4>
            <input
                value={question.fieldLable}
                onChange={handleTaskFieldChange} />
            </div>
            <div>
                <h4>input name</h4>
                <input
                    value={question.inputName}
                    onChange={handleTaskInputNameChange} />
            </div>
            <div>
                <input
                 type="checkbox"
                 value={'text'}
                 onChange={handleTaskInputTypeChange} 
                 />
                <h6>
                    text
                </h6>
                <input
                 type="checkbox"
                 value={'color'}
                 onChange={handleTaskInputTypeChange} 
                 />
                <h6>
                color
                </h6>
                <input
                 type="checkbox"
                 value={'date'}
                 onChange={handleTaskInputTypeChange} 
                 />
                <h6>
                date
                </h6>
                <input
                 type="checkbox"
                 value={'email'}
                 onChange={handleTaskInputTypeChange} 
                 />
                <h6>
                email
                </h6>
                <input
                 type="checkbox"
                 value={'tel'}
                 onChange={handleTaskInputTypeChange} 
                 />
                <h6>
                tel
                </h6>
                <input
                 type="checkbox"
                 value={'number '}
                 onChange={handleTaskInputTypeChange} 
                 />
                <h6>
                number 
                </h6>
            </div>
            <button type="submit"> add field </button>
        </form>
    );
}

export default QuestionForm;