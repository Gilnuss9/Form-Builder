import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import { Table } from 'react-bootstrap'




function ShowForms(formList) {


    let listOfForms = []
    if (formList.formList) {
        formList.formList.map(aForm => (
            listOfForms.push(aForm)
        ))
    }



    console.log(listOfForms)
    return (
        <div>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Form Id</th>
                            <th>Form Name</th>
                            <th># Submissions</th>
                            <th>Submit Page</th>
                            <th>Submission Page</th>
                        </tr>
                    </thead>
                    <tbody>

                        {listOfForms.map(aForm => (
                            <tr>
                                <td>
                                    {aForm.formId}
                                </td>
                                <td>
                                    {aForm.name}
                                </td>
                                <td>
                                    {aForm.count}
                                </td>
                                <td>
                                    <Link to={`/forms/${aForm.formId}`}>Fill Form</Link>
                                </td>
                                <td>
                                    <Link to={`/submissions/${aForm.formId}`}>Check Answers</Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        </div>
    );
}



export default ShowForms;