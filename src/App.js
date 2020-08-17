import React, { useState, useEffect } from 'react';
import axios from 'axios'
import FormList from './Components/FormList'
import CreateSubmitForm from './Components/CreateSubmitForm'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
