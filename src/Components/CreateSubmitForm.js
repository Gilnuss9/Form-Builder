import React, { useState, useEffect } from 'react';
import axios from 'axios'
import QuestionForm from './QuestionForm'
import Question from './Question'
import QuestionList from './QuestionList'
import NameSubmit from './NameSubmit'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const LOCAL_STORAGE_KEY = 'react-todo-list-questions';
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
        let res = await api.post('', { formName: fullForm[0], fields: fullForm[1] })
        console.log(res)
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
        setquestions([question, ...questions]);
    }

    function removeTodo(id) {
        setquestions(questions.filter(todo => todo.id !== id));
    }

    return (
        <div className="App">
            <header className="App-header">
                <p></p>
                <QuestionForm addquestion={addquestion} />
                <QuestionList questions={questions} removeTodo={removeTodo} />
                <NameSubmit changeName={changeName} />
                <button onClick={uploadForm}>
                    <Link to={'/'}>
                    Upload form
                    </Link>
                    </button>
            </header>

        </div>
    );
}

export default CreateSubmitForm;
