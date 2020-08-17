import React from 'react'
import Question from    './Question'

function QuestionList({questions, removeTodo}){


    return(
        <ul>
            {questions.map(question =>(
                <Question key={question.id} question={question} removeTodo={removeTodo} />
            ))}
        </ul>
    )

}

export default QuestionList