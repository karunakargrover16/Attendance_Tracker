import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";
function App() {
  return ( 
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExerciseList} />
      <Route path="/create" exact component={CreateExercise} />
      <Route path="/user" exact component={CreateUser} />
      <Route path="/users/login" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
