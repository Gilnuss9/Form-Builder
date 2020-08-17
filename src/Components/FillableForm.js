import React, { useState, useEffect } from 'react';
import axios from 'axios'
import FillableField from './FillableField'
import { useParams } from 'react-router';


function FillableForm() {
    const [surveyData, setSurveyData] = useState([])
    const [surveyName, setSurveyName] = useState([])
    const [surveyId, setSurveyId] = useState([])
    const [submissionSheet, setSubmissionSheet] = useState([])
    const [answersList, setAnswersList] = useState([])
    const id = useParams
    let subSheet= []

    let urlQ = `http://127.0.0.1:5000/api/v1/resources/forms/5f39af2fc715388d31e508b2`
    const api = axios.create({
        baseURL: 'http://127.0.0.1:5000/api/v1/resources/submissions/5f39af2fc715388d31e508b2'
      })



    useEffect(() => {
        axios.get(urlQ)
            .then(response => {
                setSubmissionSheet(response.data.fields)
                setSurveyName(response.data.formName)
                setSurveyId(response.data._id)
                setSurveyData(response)
                console.log(response)

            })
            .catch(() => { console.log('failes') })
    }, [urlQ])

    function addAnswer(answer) {
        setAnswersList([answer, ...answersList]);
    }

      const uploadAnswerForm = async() => {
        let res = await api.post('',{formId: surveyId, name:surveyName, data:answersList})
      }
    if(submissionSheet){
        submissionSheet.map(submission =>(
            subSheet.push(submission)
        ))
    }
    
    return (
        <ul>

            <div>{surveyName}</div>
            {submissionSheet.map(quesion => (
                <FillableField key={quesion.id} todo={quesion} addAnswer={addAnswer} />
            ))}
            <button onClick={uploadAnswerForm}>Submit Answers</button>
        </ul>
    );
}

export default FillableForm;