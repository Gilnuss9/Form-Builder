import React, { useState, useEffect } from 'react';
import axios from 'axios'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'
import NameSubmit from './NameSubmit'
import {Link} from "react-router-dom";
import Header from './Header';

const LOCAL_STORAGE_KEY = 'react-question-list-questions';
const LOCAL_STORAGE_KEY2 = 'react-formName';
const LOCAL_STORAGE_KEY3 = 'react-fullForm';
const LOCAL_STORAGE_KEY4 = 'react-fullFormId'

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/v1/resources/forms/3'
})

function CreateSubmitForm() {
    const [questions, setquestions] = useState([])
    const [formName, setFormName] = useState('')
    const [fullForm, setFullForm] = useState([formName, questions])
    const [formId, setFormId] = useState(0)


    useEffect(() => {
        // fires when app component mounts to the DOM
        const storagequestions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        const storageformName = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2));
        const storagefullForm = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY3));
        const storagefullFormId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY4));
        if (storagequestions) {
            setquestions(storagequestions);
        }
        if (storageformName) {
            setFormName(storageformName)
        }
        if (storagefullForm) {
            setFullForm(storagefullForm)
        }
        if (storagefullFormId) {
            setFormId(storagefullFormId)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY3, JSON.stringify(fullForm));
    }, [fullForm]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(formName));
    }, [formName]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY4, JSON.stringify(formId));
    }, [formId]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
    }, [questions]);

    const uploadForm = async () => {
        createFullForm(fullForm[0])
        let res = await api.post('', { formName: fullForm[0], fields: questions })
        cleanUpStorate()
        console.log(res)
    }

    function cleanUpStorate() {
        localStorage.clear(LOCAL_STORAGE_KEY)
        localStorage.clear(LOCAL_STORAGE_KEY2)
        localStorage.clear(LOCAL_STORAGE_KEY3)
        localStorage.clear(LOCAL_STORAGE_KEY4)
    }
    
    function createFullForm(name) {
        let i = formId
        setFormId(formId + 1)
        setFullForm([name, questions, i])
    }


    function changeName(name) {
        setFormName(name);
        createFullForm(name)
    }

    function addquestion(question) {
        console.log(question)
        setquestions([question, ...questions]);
    }

    function removeQuestion(id) {
        setquestions(questions.filter(question => question.id !== id));
    }

    function returnToMain(){
        cleanUpStorate()
    }

    return (
        <div className='col px-md-1'>
            <div className='text-center'>
            <Header theTitle={'Create Survey Form'} />   
            </div>
        <div className='col px-md-1'>
            Choose The Form Name:   
                <NameSubmit changeName={changeName} />
                </div >
                <div className='col px-md-1'>
                <QuestionForm addquestion={addquestion} />
                </div>
                <div>
                <QuestionList questions={questions} removeQuestion={removeQuestion} />
                </div>
                <p>
                {formName}
                </p>
                
                <button onClick={uploadForm}>
                    <Link to={'/'}>
                    Upload form
                    </Link>
                    </button>
                    <div>
                    <button onClick={returnToMain}>
                    <Link to={'/'}>
                    Return To Main
                    </Link>
                    </button>
                    </div>

        </div>
    );
}

export default CreateSubmitForm;
