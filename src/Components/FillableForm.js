import React, { useState, useEffect } from 'react';
import axios from 'axios'
import FillableField from './FillableField'
import { useParams } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function FillableForm() {
    const [surveyData, setSurveyData] = useState([])
    const [surveyName, setSurveyName] = useState([])
    const [surveyId, setSurveyId] = useState([])
    const [submissionSheet, setSubmissionSheet] = useState([])
    const [answersList, setAnswersList] = useState([])
    let subSheet = []

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
                setSurveyData(response)
                console.log(response)

            })
            .catch(() => { console.log('failes') })
    }, [urlQ])

    function addAnswer(answer) {
        console.log(answer)
        setAnswersList([answer, ...answersList]);
    }


    const uploadAnswerForm = async () => {
        let res = await api.post('', { formId: surveyId, name: surveyName, data: answersList })
        console.log(res)
        console.log(answersList)
    }
    if (submissionSheet) {
        submissionSheet.map(submission => (
            subSheet.push(submission)
        ))
    }

    return (
        <ul>

            <div>{surveyName}</div>
            {submissionSheet.map(quesion => (
                <FillableField key={quesion.id} todo={quesion} addAnswer={addAnswer} />
            ))}
            <button onClick={uploadAnswerForm}>
                <Link to={'/'}>
                    Submit Answers
                    </Link>
            </button>
        </ul>
    );
}

export default FillableForm;