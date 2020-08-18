import React, { useState, useEffect } from 'react'
import ShowAnswers from './ShowAnswers'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from "react-router-dom";
import Header from './Header';
import { Table } from 'react-bootstrap'


function SubmissionsPage() {
    const [formName, setformName] = useState([])
    const [theQuestions, setThequestions] = useState([])

    let { id } = useParams()

    let urlQ = `http://127.0.0.1:5000/api/v1/resources/forms/${id}`


    useEffect(() => {
        axios.get(urlQ)
            .then(response => {
                setformName(response.data.formName)
                setThequestions(response.data.fields)

            })
            .catch(() => { console.log('fails') })
    }, [urlQ])

    console.log(theQuestions)
    return (
        <div>
            <div className='text-center'>
                <Header theTitle={formName} />
            </div>
            <Table striped bordered hover>
            <ul>
                {theQuestions.map(aQuestion => (
                    <div>
                        <thead>
                        <tr>
                            <th>Field: {aQuestion.fieldLable}</th>
                        </tr>
                    </thead>
                    <tbody>
                            
                            <ShowAnswers key={aQuestion.id} aQuestion={aQuestion} />

                        </tbody>
                        </div>
                ))}
                    
            </ul>
            </Table>
            <div className='text-center fixed-bottom'>
                <button>
                    <Link to={'/'}>
                        Return to Home Page
                    </Link>
                </button>
            </div>
        </div>
    )
}


/*
                        <strong><u>
                            Field name:{' '}
                        </u></strong>
                        {aQuestion.fieldLable}
                        <div>
                            <strong><u>
                                submissions: {' '}
                            </u></strong>
                            <ShowAnswers key={aQuestion.id} aQuestion={aQuestion} />
                        </div>
                    </div>

                ))}*/

export default SubmissionsPage