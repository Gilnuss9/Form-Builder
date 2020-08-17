import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ShowForms from './ShowForms'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function FormList() {
    const [formList , setFormList] = useState('')

    let url = 'http://127.0.0.1:5000/api/v1/resources/formlist'

    useEffect(() => {
        axios.get(url)
            .then(response => {
              setFormList(response.data)
                

            })
            .catch(() => { console.log('fails') })
    }, [url])
    return (
      <ul>
        <Link to={'/CreateForm/'}>Create Survey</Link>
        <ShowForms formList={formList} />
      </ul>
    );
  }
  
  export default FormList;