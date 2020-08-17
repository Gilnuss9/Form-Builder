import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'



function ShowAnswers({aQuestion }) {
    const [theAnswers, setTheAnswers] = useState([])
    let answersToShow = [] 
    const {id} = useParams()
    let urlA = `http://127.0.0.1:5000/api/v1/resources/submissions/${id}`

    useEffect(() => {
        axios.get(urlA)
            .then(response => {
                console.log(response)
                setTheAnswers(response.data)
                
                
            })
            .catch(() =>{console.log('fails')})
    }, [urlA])

    function fillAnswersToShow() {
        theAnswers.map(anAnswerForm =>{
            console.log(anAnswerForm)
            anAnswerForm.data.map(answer =>{
                if(answer.id === aQuestion.id){
                    answersToShow.push(answer.content)
                }
            })
            }
        )}
    console.log(answersToShow)
    return (
        <div>
            {fillAnswersToShow()}
            {answersToShow.map(answerToShow => (
                <div>
                {answerToShow}
                </div>
                ))}
        </div>
    )

}


//<ShowAnswer anAnswer={anAnswer} />
export default ShowAnswers