import React, {useState, useEffect} from 'react'
import ShowAnswers from './ShowAnswers'
import axios from 'axios'

function SubmissionsPage() {
    const [formName, setformName] = useState([])
    const [theQuestions, setThequestions] = useState([])
    const [theAnswers, setTheAnswers] = useState([])

    let urlQ = 'http://127.0.0.1:5000/api/v1/resources/forms/5f39af2fc715388d31e508b2'


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
        </div>
    )
}




export default SubmissionsPage