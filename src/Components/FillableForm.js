import React, { useState, useEffect } from 'react';
import axios from 'axios'
import FillableField from './FillableField'
import { useParams } from 'react-router';
import {Link} from "react-router-dom";
import Header from './Header';


function FillableForm() {
    const [surveyName, setSurveyName] = useState([])
    const [surveyId, setSurveyId] = useState([])
    const [submissionSheet, setSubmissionSheet] = useState([])
    let answers =[]

    const { id } = useParams()
    console.log(id)

    let urlQ = `http://127.0.0.1:5000/api/v1/resources/forms/${id}`
    const api = axios.create({
        baseURL: `http://127.0.0.1:5000/api/v1/resources/submissions/1`
    })



    useEffect(() => {
        axios.get(urlQ)
            .then(response => {
                setSubmissionSheet(response.data.fields)
                setSurveyName(response.data.formName)
                setSurveyId(response.data._id)
                console.log(response)

            })
            .catch(() => { console.log('failes') })
    }, [urlQ])

    function setAnswers(){
        submissionSheet.map(question =>{
            answers.push({id: question.id, content:''})
        })
    }

    function updateAnswer(id, content){
        answers.map(anAnswer =>{
            if(anAnswer.id === id){
                anAnswer.content = content
            }
        })
    }


    const uploadAnswerForm = async () => {
        let res = await api.post('', { formId: surveyId, name: surveyName, data: answers })
        console.log(res)
    }
 
    console.log(answers)
    return (
        <ul>
            {setAnswers()}
            <div className='text-center'>
                <Header theTitle={surveyName} />
                </div>
            {submissionSheet.map(question => (
                <FillableField key={question.id} question={question} updateAnswer={updateAnswer} answers={answers} />
            ))}
            <div className='pt-5'>
            <button onClick={uploadAnswerForm}>
                <Link to={'/'}>
                    Submit Answers
                    </Link>
            </button>
            </div>
            <div className='text-center fixed-bottom'>
            <button>
                <Link to={'/'}>
                    Home Page
                    </Link>
            </button>
            </div>
        </ul>
    );
}

export default FillableForm;