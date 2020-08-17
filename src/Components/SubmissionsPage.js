import React, {useState, useEffect} from 'react'
import ShowAnswers from './ShowAnswers'
import axios from 'axios'
import { useParams } from 'react-router'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function SubmissionsPage() {
    const [formName, setformName] = useState([])
    const [theQuestions, setThequestions] = useState([])
    const [theAnswers, setTheAnswers] = useState([])

    let {id} = useParams()

    let urlQ = `http://127.0.0.1:5000/api/v1/resources/forms/${id}`


    useEffect(() => {
        axios.get(urlQ)
            .then(response => {
                setformName(response.data.formName)
                setThequestions(response.data.fields)

            })
            .catch(() => { console.log('fails') })
    }, [urlQ])


    return (
        <div>
            {formName}
            <ul>
                {theQuestions.map(aQuestion => (
                    <div>
                        {aQuestion.fieldLable}
                        <ShowAnswers key={aQuestion.id} aQuestion={aQuestion} />
                    </div>

                ))}

            </ul>

            <Link to={'/'}>Return To Main Page</Link>
        </div>
    )
}




export default SubmissionsPage