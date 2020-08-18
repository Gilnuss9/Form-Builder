import React from 'react';
import FormList from './Components/FormList'
import CreateSubmitForm from './Components/CreateSubmitForm'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import FillableForm from './Components/FillableForm'
import SubmissionsPage from './Components/SubmissionsPage';


function App() {

  return (
    <div>
      <Router>
      <Route exact path="/">
              <FormList />
            </Route>
            <Route path="/CreateForm/">
          <CreateSubmitForm />
        </Route>  
        <Route path="/forms/:id">
          <FillableForm />
        </Route>
        <Route path="/submissions/:id">
          <SubmissionsPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
