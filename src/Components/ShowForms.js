import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function ShowForms(formList) {
    let listOfForms = []
    if(formList.formList){
        formList.formList.map(aForm =>(
            listOfForms.push(aForm)
        ))
    }
    return (
      <div>
        {listOfForms.map(aForm =>(
            <div>
            {aForm.name} {aForm.count} <Link to={`/forms/${aForm.formId}`}>Link To Fill Form</Link>  <Link to={`/submissions/${aForm.formId}`}>Link To See Submissions</Link>
            </div>
            ))}
            
      </div>
    );
  }

  //`/api/v1/resources/forms/${aForm.formId}`
  
  export default ShowForms;