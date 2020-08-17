import React, { useState,useEffect } from 'react'
import axios from 'axios'



function ShowAnswers({aQuestion }) {
    const [theAnswers, setTheAnswers] = useState([])
    let answersToShow = [] 

    let urlA = 'http://127.0.0.1:5000/api/v1/resources/submissions/5f39b1934f288e17846ec513'
    useEffect(() => {
        axios.get(urlA)
            .then(response => {
                setTheAnswers(response.data[0].data)
                
            })
            .catch(() =>{console.log('fails')})
    }, [urlA])

    function fillAnswersToShow() {
        theAnswers.map(anAnswer =>{
            if(anAnswer.id === aQuestion.id){
                answersToShow.push(anAnswer.content)
            }
        })
    }
    return (
        <div>
            {fillAnswersToShow()}
            {answersToShow.map(answerToShow => (answerToShow))}
        </div>
    )

}


//<ShowAnswer anAnswer={anAnswer} />
export default ShowAnswers