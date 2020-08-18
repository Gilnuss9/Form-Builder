import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ShowForms from './ShowForms'
import {Link} from "react-router-dom";
import Header from './Header';



function FormList() {
    const [formList , setFormList] = useState('')

    let url = 'http://127.0.0.1:5000/api/v1/resources/formlist'

    useEffect(() => {
        axios.get(url)
            .then(response => {
              setFormList(response.data)
              console.log(response)
                

            })
            .catch(() => { console.log('fails') })
    }, [url])
    console.log(formList)
    return (
      <ul>
          <div className='text-center'><Header theTitle={'Form Builder'} /></div>
          <div className='text-center'><Link to={'/CreateForm/'}>Create Survey</Link></div>
        <ShowForms formList={formList} />
      </ul>
    );
  }
  
  export default FormList;