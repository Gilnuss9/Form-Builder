import React from 'react'
import Question from    './Question'

function QuestionList({questions, removeQuestion}){


    return(
        <ul>
            {questions.map(question =>(
                <Question key={question.id} question={question} removeQuestion={removeQuestion} />
            ))}
        </ul>
    )

}

export default QuestionList